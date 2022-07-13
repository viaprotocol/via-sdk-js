# VIA SDK typescript

A small blazing fast wrapper over the VIA Router API for on-chain and cross-chain swaps.
Our API allows you to find the best route for moving funds between chains!

### Feature List

|feature|remark|method|
|--|--|--|
|get routes|Swaps/bridges cheapest routes|getRoutes|
|check allowance|Allowance to check whether it's needed or not to approve|getAllowanceStatus|
|build approval transaction|The transaction that approves the VIA contract to spend your token|buildApprovalTx|
|build transaction|The transaction that will perform a swap/bridge according to the route|buildTx|
|check transaction|Check the status of the transaction|checkTx|


### Installing
```
npm i @viaprotocol/router-sdk
```


### Usage

First you need to initialize a VIA Client instance:

``` js
import {Via} from '@viaprotocol/router-sdk';

const DEFAULT_API_KEY = 'e3db93a3-ae1c-41e5-8229-b8c1ecef5583';
const cli = new Via({apiKey: DEFAULT_API_KEY, url: 'https://router-api.via.exchange', timeout: 30000});
```

Get the best routes.

``` js
const pagesNum = await cli.routesPages(); // cache me!
const baseParams = {
    fromChainId: 1,
    fromTokenAddress: '0x0000000000000000000000000000000000000000',
    fromAmount: Math.pow(10, 18),
    toChainId: 56,
    toTokenAddress: '0x0000000000000000000000000000000000000000',
    fromAddress: '0x856cc59aaE47997a1C8D5472Fc8dfef27821235d', // might be null
    multiTx: false, // whether to return routes with multiple user transactions
    limit: 1,
};
const params = [...Array(pagesNum)].map(
    (_, i) => ({
        ...baseParams,
        offset: i+1
    })
);

const routes = await Promise.allSettled(
    params.map(i => cli.getRoutes(i))
);
```
Request parameters description
|Parameter|Description|
|--|--|
|fromChainId|Source chain id|
|fromTokenAddress|Source token address|
|fromAmount|Amount|
|toChainId|Target chain id|
|toTokenAddress|Target token address|
|fromAddress|Sender address|
|multiTx|whether to return routes with multiple user transactions|
|offset|Pagination offset|
|limit|Pagination limit|

Pagination is needed because the request time for a specific page is faster than for all pages at once

Get allowance status

You must approve the contract to spend your token.
You can get route_id from the route you like received above in the code snippet.

``` js
const firstNonEmptyPage = routes.find(i => i.value.routes.length > 0).value;
const route = firstNonEmptyPage.routes[0];
const routeId = route.routeId;
const chainId = fromChainId;
const owner = "YOUR_WALLET_ADDRESS";
const tokenAddress = fromTokenAddress;
const numAction = 0;  // number of action in routes

const allowanceStatus = await cli.getAllowanceStatus(
    {owner, routeId, numAction}
);
```

Build approval transaction.
Returns the transaction that approves the VIA API to spend your token.

``` js
const amount = fromAmount;

tx = await cli.buildApprovalTx(
    {routeId, owner, numAction}
)
```

Now you can build the transaction that will perform a crosschain swap according to the route.

``` js
# amount out minimal, you can get it from get_routes as to_token_amount
output = firstNonEmptyPage.routes[0].toTokenAmount

tx = await cli.buildTx(
    {
        routeId,
        fromAddress,
        receiveAddress,
        numAction
    }
)
```

If you want to know the status of the transaction, then you need to tell us that you started it

``` js
await cli.startRoute(
    {
        fromAddress: fromAddress,
        toAddress: receiveAddress,
        routeId: route.routeId,
        txHash: txHash
    }
)
```

And start action (you can start from the second action because startRoute also handles first action)

``` js
await cli.startAction(
    {
        actionUuid: route.actions[numAction].uuid,
        initialTxHash: actionTxHash
    }
)
```

You can see the status of the transaction.
``` js
const txStatus = await cli.checkTx(
    {
        actionUuid: route.actions[numAction].uuid
    }
)
```

You can use websocket
``` js
const v = new Via({apiKey: DEFAULT_API_KEY});
const wsProvider = v.getRoutesViaWs({
    fromAddress: '0xD75183E452d6915356814454D2D64Df149853D38',
    fromAmount: 148875000000000000,
    fromChainId: 56,
    toChainId: 56,
    fromTokenAddress: '0x0000000000000000000000000000000000000000',
    toTokenAddress: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
    multiTx: true
});

wsProvider.onopen = function open() {
    console.log('connected');
};

wsProvider.onclose = function close() {
    console.log('disconnected');
};

wsProvider.onmessage = function incoming(data) {
    const res = JSON.parse(data.data as string);
    let route: IRoute[];
    let status: IRouteFetchStatus;
    if (Array.isArray(res)) {
        route = res;
        console.log(route);
    } else {
        status = res.status;
        console.log(status);

        if (status.finished === status.all){
            wsProvider.close()
        }
    }
};
```

Response parameters description
|Parameter|Description|
|--|--|
|retry|Time to retry in ms|
|event|Status of the transaction|
|data.started|Started time of the transaction on source chain|
|data.finished|Finished time of the transaction on source chain|
|data.txHash|Hash of the destination transaction|
|data.actualAmount|Received amount|

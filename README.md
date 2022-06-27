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
const fromChainId = 1;
const fromTokenAddress = '0x0000000000000000000000000000000000000000';
const fromAmount = Math.pow(10, 18);
const toChainId = 56;
const toTokenAddress = '0x0000000000000000000000000000000000000000';
const fromAddress = '0x856cc59aaE47997a1C8D5472Fc8dfef27821235d';  // might be null
const multiTx = false;  // whether to return routes with multiple user transactions

const routes = await cli.getRoutes(
    {
        fromChainId,
        fromTokenAddress,
        fromAmount,
        toChainId,
        toTokenAddress,
        fromAddress,
        multiTx
    }
);
```

Get allowance status
You must approve the contract to spend your token.
You can get route_id from the route you like received above in the code snippet.

``` js
const routeId = routes.routes[0];
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
output = routes.routes[0].toTokenAmount

tx = await cli.buildTx(
    {
        routeId,
        fromAddress,
        receiveAddress,
        numAction
    }
)
```

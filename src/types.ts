export interface ViaConfig {
  apiKey: string;
  url?: string;
  timeout?: number;
}

export interface INetwork {
  chainId: number;
  key: string;
  logoURI: string;
  name: string;
  color?: string;
}

export interface IToken {
  chainId: number;
  address: string;
  decimals: number;
  logoURI: string;
  name: string;
  symbol: string;
  color: string;
}

export interface ITokenState extends IToken {
  amount: string;
  price?: number;
  network?: INetwork;
}

export interface IGetRoutesRequestParams {
  fromChainId: number;
  toChainId: number;
  fromTokenAddress: string;
  toTokenAddress: string;
  fromAmount: number;
  fromAddress?: string;
  toAddress?: string;
}

export interface IGetAllowanceStatus {
  owner: string;
  routeId: string;
  numAction: number;
}

export interface IBuildApprovalTx {
  routeId: string;
  owner: string;
  numAction: number;
}

export interface IBuildTx {
  routeId: string;
  fromAddress: string;
  receiveAddress: string;
  numAction: number;
}

export interface IGetRoutesResponse {
  fromToken: IToken;
  toToken: IToken;
  fromTokenAmount: number;
  routes: IRoute[];
}

export interface IRouteStep {
  type: string;
  tool: IRouteStepTool;
  fromToken: IToken;
  toToken: IToken;
  fee: IFee;
  fromTokenAmount: number;
  toTokenAmount: number;
}

export interface IRouteAction {
  provider: number;
  fromToken: IToken;
  fromTokenAmount: number;
  toToken: IToken;
  toTokenAmount: number;
  steps: IRouteStep[];
  fee: IFee;
  contractAddress: string;
  txHash: string;
  gasLimit: string;
  gasUsed: string;
  gasUsd: number;
}


export interface IRouteStepTool {
  name: string;
  logoURI: string;
  estimatedTime: number;
}

export interface IFee {
  feeUsd: null | number;
  gasFeeUsd: null | number;
  slippagePerc: null | number;
  time: null | string;
}

export interface IRoute {
  toTokenAmount: number;
  fee: IFee;
  actions: IRouteAction[];
  extra: {
    routePath: string | null;
  };
  active: boolean;
  routeId: string;
  slippage: number;
}

export interface IAllowance {
  value: string
  tokenAddress: string
}

export interface IApprovalTx {
  from: string
  data: string
  to: string
}

export interface IBuildTxResponse {
  to: string
  data: string
  value: number
  gas: number
}

export interface ISendBridgeInfo {
  route: IRoute;
  fromAddress: string;
  fromAmount: string;
  toAddress: string;
  tx: string;
}

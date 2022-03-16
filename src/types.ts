export interface ViaConfig {
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
  fromAmount: string;
  fromAddress?: string;
  toAddress?: string;
}

export interface IGetAllowanceStatus {
  fromAddress: string;
  fromToken: IToken;
  routeId: string;
}

export interface IBuildApprovalTx {
  routeId: string;
  chainId: number;
  owner: string;
  tokenAddress: string;
  amount: number;
}

export interface IBuildTx extends IRoute {
  routeId: string;
  fromChainId: number;
  fromTokenAddress: string;
  toChainId: number;
  toTokenAddress: string;
  fromAddress: string;
  receiveAddress: string;
  output: string;
  amount: number;
  middleware?: string;
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
  active: boolean;
  fee: IFee;
  steps: IRouteStep[];
  toTokenAmount: number;
  routeId: string;
  extra: {
    routePath: string | null;
  };
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

export interface IBuildTx {
  to: string
  data: string
  value: string
}

export interface ISendBridgeInfo {
  route: IRoute;
  fromAddress: string;
  fromAmount: string;
  toAddress: string;
  tx: string;
}

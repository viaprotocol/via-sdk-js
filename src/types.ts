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

export interface IGetRoutesRequestParams {
  fromChainId: number;
  fromTokenAddress: string;
  fromAmount: number;
  toChainId: number;
  toTokenAddress: string;
  fromAddress?: string;  // sender user address
  toAddress?: string;  // recipient user address
  limit?: number;
  offset?: number;
  multiTx: boolean;
}

export interface ICheckTxStatusRequest {
  actionUuid: string;
}

enum ITxStatus {
  success = 'success',
  user_tx_failed = 'user_tx_failed',
  pending = 'pending',
  to_be_started = 'to_be_started',
  recieve_tx_not_found = 'recieve_tx_not_found',
  null = 'null'
}

export interface ITxStatusData {
  started: string;
  finished: null | string;
  txHash: null | string; // txHash received
  actualAmount: null | string; // amount received
}

export interface IStartAction {
  actionUuid: string;
  initialTxHash: string;
}

export interface IStartRoute {
  fromAddress: string;
  toAddress: string;
  routeId: string;
  txHash: string
}

export interface IStartRouteResponse {
  routeUuid: string;
  actionUuids: string[];
}

export interface ITxStatusResponse {
  event: ITxStatus;
  data: null | ITxStatusData;
  retry: null | number; // retry after in ms
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

export interface IFee {
  feeUsd: null | number;
  gas: null | number;
  gasFeeUsd: null | number;
  slippagePerc: null | number;
  time: null | string;
  totalLossUsd: null | string;
}

export interface IActionFeeInfo {
  gasActionUnits: bigint;
  gasActionApproveUnits: bigint;
}

export interface IAdditionalProviderFee {
  amount: bigint;
  token: IToken;
}

export interface IActionStepTool {
  name: string;
  logoURI: string;
  estimatedTime: number;
}

export interface IActionStep {
  type: string;
  tool: IActionStepTool;
  fromToken: IToken;
  toToken: IToken;
  fee: IFee;
  fromTokenAmount: number;
  toTokenAmount: number;
}

export interface IRouteAction {
  uuid: string;
  provider: number;
  fromToken: IToken;
  fromTokenAmount: number;
  toToken: IToken;
  toTokenAmount: number;
  steps: IActionStep[];
  fee: IActionFeeInfo;
  additionalProviderFee?: IAdditionalProviderFee;
  allowanceValue?: string;
}

export interface IRoute {
  routeId: string;
  toTokenAmount: number;
  fee: IFee;
  actions: IRouteAction[];
  active: boolean;
  slippage?: number;
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

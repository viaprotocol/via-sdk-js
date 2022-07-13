import axios, { AxiosInstance } from 'axios';
import IsoWebSocket from 'isomorphic-ws';

import { ViaError } from './errors';
import {
  ViaConfig,
  IGetRoutesRequestParams,
  IGetAllowanceStatus,
  IBuildApprovalTx,
  IBuildTx,
  IAllowance,
  IApprovalTx,
  IBuildTxResponse,
  IGetRoutesResponse,
  ICheckTxStatusRequest,
  ITxStatusResponse,
  IStartRoute,
  IStartRouteResponse,
  IStartAction,
} from './types';

class Via {
  httpCli: AxiosInstance;
  apiKey: string;
  baseURL: string;

  constructor(config: ViaConfig) {
    this.baseURL = config.url || 'https://router-api.via.exchange';
    this.httpCli = axios.create({
      baseURL: this.baseURL,
      timeout: config.timeout || 30 * 1000,
    });
    this.apiKey = config.apiKey;
  }

  getRoutesViaWs(params: IGetRoutesRequestParams) {
    const buildURLQuery = (obj: IGetRoutesRequestParams) =>
      Object.entries(obj)
        .map((pair) => pair.map(encodeURIComponent).join('='))
        .join('&');
    const urlParams = buildURLQuery(params);
    const urlInfo = new URL(this.baseURL);
    const wsProtocol = urlInfo.protocol === 'https:' ? 'wss:' : 'ws:';
    const ws = new IsoWebSocket(
      `${wsProtocol}//${urlInfo.host}/api/v1/routes/ws?${urlParams}`
    );
    return ws;
  }

  async getRoutes(
    params: IGetRoutesRequestParams
  ): Promise<IGetRoutesResponse> {
    try {
      const res = await this.httpCli.get('/api/v1/routes', {
        params: { apiKey: this.apiKey, ...params },
      });
      return res.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new ViaError(e.response?.status, e.response?.data?.message);
      } else {
        throw e;
      }
    }
  }

  async getAllowanceStatus(params: IGetAllowanceStatus): Promise<IAllowance> {
    try {
      const res = await this.httpCli.get('/api/v2/approval/check-allowance', {
        params: { apiKey: this.apiKey, ...params },
      });
      return res.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new ViaError(e.response?.status, e.response?.data?.message);
      } else {
        throw e;
      }
    }
  }

  async buildApprovalTx(params: IBuildApprovalTx): Promise<IApprovalTx> {
    try {
      const res = await this.httpCli.get('/api/v2/approval/build-tx', {
        params: { apiKey: this.apiKey, ...params },
      });
      return res.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new ViaError(e.response?.status, e.response?.data?.message);
      } else {
        throw e;
      }
    }
  }

  async buildTx(params: IBuildTx): Promise<IBuildTxResponse> {
    try {
      const res = await this.httpCli.get('/api/v2/send/build-tx', {
        params: { apiKey: this.apiKey, ...params },
      });
      return res.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new ViaError(e.response?.status, e.response?.data?.message);
      } else {
        throw e;
      }
    }
  }

  async startRoute(params: IStartRoute): Promise<IStartRouteResponse> {
    try {
      const res = await this.httpCli.post('/api/v1/start-route', {apiKey: this.apiKey, ...params});
      return res.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new ViaError(e.response?.status, e.response?.data?.message);
      } else {
        throw e;
      }
    }
  }

  async startAction(params: IStartAction): Promise<void> {
    try {
      const res = await this.httpCli.post('/api/v1/start-action', {apiKey: this.apiKey, ...params} );
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new ViaError(e.response?.status, e.response?.data?.message);
      } else {
        throw e;
      }
    }
  }

  async routesPages(): Promise<number> {
    try {
      const res = await this.httpCli.get('/api/v1/routes/pages');
      return res.data.pages;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new ViaError(e.response?.status, e.response?.data?.message);
      } else {
        throw e;
      }
    }
  }

  async checkTx(params: ICheckTxStatusRequest): Promise<ITxStatusResponse> {
    try {
      const res = await this.httpCli.get('/api/v2/tx-status', {
        params: { apiKey: this.apiKey, ...params },
      });
      return res.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new ViaError(e.response?.status, e.response?.data?.message);
      } else {
        throw e;
      }
    }
  }
}

export default Via;

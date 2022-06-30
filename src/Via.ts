import axios, { AxiosInstance } from 'axios';

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
} from './types';

class Via {
  httpCli: AxiosInstance;
  apiKey: string;

  constructor(config: ViaConfig) {
    this.httpCli = axios.create({
      baseURL: config.url || 'https://router-api.via.exchange',
      timeout: config.timeout || 30 * 1000,
    });
    this.apiKey = config.apiKey;
  }

  async getRoutes(params: IGetRoutesRequestParams): Promise<IGetRoutesResponse> {
    try {
      const res = await this.httpCli.get('/api/v1/routes', { params: {apiKey: this.apiKey, ...params} });
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
      const res = await this.httpCli.get(
        '/api/v2/approval/check-allowance',
        { params: {apiKey: this.apiKey, ...params} }
      );
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
      const res = await this.httpCli.get('/api/v2/approval/build-tx', { params: {apiKey: this.apiKey, ...params} });
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
      const res = await this.httpCli.get('/api/v2/send/build-tx', { params: {apiKey: this.apiKey, ...params} });
      return res.data;
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
      const res = await this.httpCli.get('/api/v2/tx-status', { params: {apiKey: this.apiKey, ...params} });
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

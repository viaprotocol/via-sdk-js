import axios, { AxiosInstance } from "axios";

import { ViaError } from "./errors";
import {
  IRoute,
  ViaConfig,
  IGetRoutesRequestParams,
  IGetAllowanceStatus,
  IBuildApprovalTx,
  IBuildTx,
} from "./types";

class Via {
  httpCli: AxiosInstance;

  constructor(config?: ViaConfig) {
    this.httpCli = axios.create({
      baseURL: config?.url || "https://router-api.via.exchange",
      timeout: config?.timeout || 30 * 1000,
    });
  }

  async getRoutes(params: IGetRoutesRequestParams): Promise<IRoute> {
    try {
      const res = await this.httpCli.get("/api/v1/routes", { params });
      return res.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new ViaError(e.response?.status, e.response?.data?.message);
      } else {
        throw e;
      }
    }
  }

  async getAllowanceStatus(params: IGetAllowanceStatus): Promise<IRoute> {
    try {
      const res = await this.httpCli.get("/api/v1/approval/check-allowance", {
        params,
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

  async buildApprovalTx(params: IBuildApprovalTx): Promise<IRoute> {
    try {
      const res = await this.httpCli.get("/api/v1/approval/build-tx", {
        params,
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

  async buildTx(params: IBuildTx): Promise<IRoute> {
    try {
      const res = await this.httpCli.get("/api/v1/send/build-tx", { params });
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

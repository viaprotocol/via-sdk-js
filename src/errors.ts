export class ViaError extends Error {
  code?: number;
  msg?: string;

  constructor(code?: number, msg?: string) {
    super(msg);
    this.code = code;
    this.msg = msg;
  }
}

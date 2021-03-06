export default class HttpException extends Error {
  statusCode: number;
  message: string;
  error: string | null;

  constructor(statusCode: number = 500, message: string, error?: string) {
    super(message);

    this.statusCode = statusCode;
    this.message = message;
    this.error = error || null;
  }
}

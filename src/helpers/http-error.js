class HttpError {
  constructor({ status, message, data }) {
    this.isError = true;
    this.status = status || 500;
    this.message = message || null;
    this.data = data || null;
  }
}

module.exports = { HttpError };

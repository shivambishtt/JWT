class apiError extends Error {
  constructor(errMessage = "Something went wrong", errStatus, data) {
    super(errMessage);
    (this.errMessage = errMessage),
      (this.errStatus = errStatus),
      (this.data = data);
  }
}
export default apiError;

const asyncHandler = (handlerFunction) => {
  return (req, res, next) => {
    Promise.resolve(handlerFunction(req, res, next)).catch((error) =>
      next(error)
    );
  };
};
export default asyncHandler;

// a function which takes a handlerfunction as a parameter and returns a new function is called as high order function

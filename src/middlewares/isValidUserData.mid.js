function isValidUserData(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    const error = Error("Enter email & password");
    error.statusCode = 400;
    throw error;
  }
  return next();
}

export default isValidUserData;

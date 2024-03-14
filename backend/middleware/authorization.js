export const adminAndUserAuth = async (req, res, next) => {
  console.log(req.user);
  if (req.user.role === "ADMIN") {
    next();
  } else {
    return res.status(400).json({
      status: false,
      message: "Not authorized",
    });
  }
};

const ownerMiddleware = (req, res, next) => {
  if (!req.user || req.user.email.toLowerCase() !== process.env.OWNER_EMAIL.toLowerCase()) {
    return res.status(403).json({
      success: false,
      message: "Owner access only"
    });
  }
  next();
};

export default ownerMiddleware;

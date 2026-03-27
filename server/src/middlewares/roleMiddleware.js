export const adminOnly = (req, res, next) => {
  if (req.user && ["ADMIN", "SUPER_ADMIN"].includes(req.user.role)) {
    next();
  } else {
    res.status(403).json({ message: "Admin access only" });
  }
};

export const superAdminOnly = (req, res, next) => {
  if (req.user && req.user.role === "SUPER_ADMIN") {
    next();
  } else {
    res.status(403).json({ message: "Super Admin only" });
  }
};

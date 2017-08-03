/**
 * 需要登录
 */
exports.userRequired = function (req, res, next) {
  if (req.path.indexOf('home')>=0&&(!req.cookies || !req.cookies._site_)) {
    return res.status(403).redirect('/');
  }
  next();
};


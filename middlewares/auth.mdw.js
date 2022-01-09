export default function auth(req, res, next) {
    if (req.session.auth === false) {
        req.session.returnTo = req.originalUrl;
        return res.redirect('/account/sign-in');
    }
    next();
}
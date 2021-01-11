function redirectSsl() {
    return (req, res, next) => {
        if (req.headers["x-forwarded-proto"] !== "https") {
            const location = `https://${req.hostname}${req.originalUrl}`;
            res.redirect(302, location);
        } else {
            next();
        }
    };
}

exports.redirectSsl = redirectSsl;

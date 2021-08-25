function GetToken(req, res, next) {
    if (req.session.token) {
        res.send({ token: req.session.token });
    } else {
        next({ message: 'Token not set' });
    }
}

export { GetToken };
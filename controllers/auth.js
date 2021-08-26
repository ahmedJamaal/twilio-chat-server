function GetToken(req, res, next) {
    if (req.session.token) {
        res.send({ token: req.session.token, username: req.session.username });
    } else {
        next({ message: 'Token not set' });
    }
}

function DeleteToken(req, res, next) {
    delete req.session.token;
    delete req.session.username;

    res.send({ message: 'Session destroyed' });
}

export { DeleteToken, GetToken };
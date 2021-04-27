module.exports = (req, res, next) => {
    switch (req.decoded.role) {
        case 'User':
            next()
            break
        default:
            res.status(403).json({message: 'Access denied', status: false})
            break
    }
}
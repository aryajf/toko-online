module.exports.role = (req,...role) => {
    role : ()=>{console.log(1);}
    console.log(role);
    console.log(req);
    return (req, res, next) => {
        console.log(req);
        next()
    }
    // switch (req.decoded.role) {
    //     case 'Admin':
    //         console.log('hai admin');
    //         next()
    //         break
    //     case 'User':
    //         console.log('hai user');
    //         next()
    //         break
    //     default:
    //         res.status(403).json({message: 'Access denied', status: false})
    //         break
    // }
}
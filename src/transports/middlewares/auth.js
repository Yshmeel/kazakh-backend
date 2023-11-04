const authMiddleware = (userService) => async (req, res, next) => {
    const authorization = req.headers['authorization'] ?? '';

    const splitedAuthorization = authorization.split(' ');


    if(splitedAuthorization.length !== 2 || splitedAuthorization[0] !== 'Bearer') {
        return res.status(401).json({
            type: 'authorization/invalid-header',
            message: 'You provided invalid header',
        })
    }

    try {
        const user = await userService.getUserByToken(splitedAuthorization[1]);

        req.user = user[0];
        next();
    } catch(e) {
        console.error(e);
        return res.status(401).json({
            type: 'authorization/invalid-token',
            message: 'You provided invalid token'
        })
    }
};

export default authMiddleware;

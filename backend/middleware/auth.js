import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {

        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                message: 'No token provided, access denied'
            });
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);

        req.user = verified;

        next();

    } catch (error) {

        return res.status(401).json({
            message: 'Invalid token'
        });

    }
}

export default auth;
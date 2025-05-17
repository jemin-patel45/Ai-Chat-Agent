/* import jwt from 'jsonwebtoken';
import redisClient from '../services/redis.service.js';


export const authUser = (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(401).send({ error: 'Unauthorized User' });
        }

        const isBlacklisted = await redisClient.get(token); 

        if(isBlacklisted){
            res.cookie('token', '');
            return res.status(401).send({ error: 'Unauthorized User' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);

        res.status(401).send({ error: 'Unauthorized User' });
    }
}

 */

// import jwt from "jsonwebtoken";
// import redisClient from "../services/redis.service.js";


// export const authUser = async (req, res, next) => {
//     try {
//         const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];
//         // const token = req.cookies.token || (authHeader && authHeader.split(' ')[1]);

//         if (!token) {
//             return res.status(401).send({ error: 'Unauthorized User' });
//         }

//         const isBlackListed = await redisClient.get(token);

//         if (isBlackListed) {

//             res.cookie('token', '');

//             return res.status(401).send({ error: 'Unauthorized User' });
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//         next();
//     } catch (error) {

//         console.log(error);

//         res.status(401).send({ error: 'Unauthorized User' });
//     }
// }




// import jwt from "jsonwebtoken";
// import redisClient from "../services/redis.service.js";

// export const authUser = async (req, res, next) => {
//     try {
//         const authHeader = req.headers.authorization;
//         const token = req.cookies.token || (authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null);

//         if (!token) {
//             return res.status(401).send({ error: 'Unauthorized User - No token provided' });
//         }

//         const isBlackListed = await redisClient.get(token);
//         if (isBlackListed) {
//             res.cookie('token', '', { expires: new Date(0) }); // Clear cookie properly
//             return res.status(401).send({ error: 'Unauthorized User - Token blacklisted' });
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//         next();
//     } catch (error) {
//         console.log('Auth Error:', error.name, error.message);
//         res.status(401).send({ error: 'Unauthorized User' });
//     }
// };

import jwt from "jsonwebtoken";
import redisClient from "../services/redis.service.js";

export const authUser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = req.cookies.token || (authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null);

        if (!token) {
            return res.status(401).send({ error: 'Unauthorized User - No token provided' });
        }

        const isBlackListed = await redisClient.get(token);
        if (isBlackListed) {
            res.clearCookie('token'); // Use clearCookie instead of setting to empty string.
            return res.status(401).send({ error: 'Unauthorized User - Token blacklisted' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Auth Error:', error.name, error.message);
        res.status(401).send({ error: 'Unauthorized User' });
    }
};


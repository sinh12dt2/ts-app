
import express, { NextFunction, Response, Request } from 'express';
import { sign, verify } from 'jsonwebtoken';
const router = express.Router();

// const verifyToken = (req: Request, res: Response, next: NextFunction) => {
//     const bearerHeader: string | undefined = req.headers['authorization'];
//     console.log(bearerHeader);
//     if (bearerHeader) {
//         const bearerToken = bearerHeader.split(' ');
//         const [bear, token] = bearerToken;
//         next();
//     } else {
//         res.status(401).json({ message: 'Unauthorized user!' });
//     }
// }

function generateAccessToken(payload: string | object | Buffer) {
  return sign(payload, 'secretKey', { expiresIn: '1800s' });
}

function getToken(req: Request) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  return token;
}

function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = getToken(req)
  if (token == null) return res.sendStatus(401)
  verify(token, 'secretKey', (err, payload) => {
    console.log(err)
    console.log('payload')
    console.log(payload)
    if (err) return res.sendStatus(403)
    // req.user = user
    next()
  })
}

router.get('/check', verifyToken, (req, res, next) => {
  const user = {
      id: 1,
      userName: 'Join',
      email: 'Join@gmail.com'
  }
  res.json({ status: 'OK' })
});

router.post('/login', (req, res, next) => {
    const user = {
        id: 1,
        userName: 'Join',
        email: 'Join@gmail.com'
    }
    const token = generateAccessToken(user)
    res.json({ token })
});

router.post('/logout', verifyToken, (req, res, next) => {
  const token = getToken(req)
  res.json({ token })
});

export default router;

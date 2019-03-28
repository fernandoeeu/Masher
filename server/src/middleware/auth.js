// const jwt = require('jsonwebtoken')

// function auth(req, res, next) {
//   const token = req.header('x-auth-token')

//   // check for token
//   if (!token) {
//     res.status(401).send({ msg: "Sem token de autorização" })
//   }
//   try {
//     // verificar token
//     const decoded = jwt.verify(token, 'secret')
//     // add user from payload
//     req.user = decoded
//     next()
//   } catch (e) {
//     res.status(400).send({ msg: 'Token inválido' })
//   }
// }

// module.exports = auth

const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhh';
const auth = function (req, res, next) {
  const token =
    req.header('x-auth-token') ||
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token']
  if (!token) {
    res.status(401).send({ msg: 'Unauthorized: No token provided' });
  } else {
    jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        res.status(401).send({ msg: 'Unauthorized: No token provided' });
      } else {
        req.email = decoded.email;
        next();
      }
    });
  }
}
module.exports = auth;
const jwt = require('jsonwebtoken')

function auth(req, res, next) {
  const token = req.header('x-auth-token')

  // check for token
  if (!token) {
    res.status(401).send({ msg: "Sem token de autorização" })
  }
  try {
    // verificar token
    const decoded = jwt.verify(token, 'secret')
    // add user from payload
    req.user = decoded
    next()
  } catch (e) {
    res.status(400).send({ msg: 'Token inválido' })
  }
}

module.exports = auth


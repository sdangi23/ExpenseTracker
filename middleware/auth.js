const jwt = require('jsonwebtoken');
const User = require('../Models/users');

const authenticate = (req, res, next) => {

    try {
        const token = req.header('authorization');

        const userid = Number(jwt.verify(token, "secretkey"));

        User.findByPk(userid).then(user => {

            req.user = user;

            next();
        })
        .catch(err => { throw new Error(err)})

      } catch(err) {

        return res.status(401).json({success: false})
      }

}

module.exports = {
    authenticate
}
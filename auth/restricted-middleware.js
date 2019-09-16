const bcrypt = require('bcrypt');
const Users = require('../users/users-model')



module.exports =  (req, res, next) => {
    const { username, password } = req.body

    Users.findBy({username})
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)
      ) {
        next()
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
  }
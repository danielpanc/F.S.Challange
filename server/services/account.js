import * as bcrypt from 'bcryptjs'
import getDbInstance from '../database'
import * as Session from './session'

const db = getDbInstance()

const USERS_TABLE = 'users'

export {
  registerAccount,
  getUserByEmail,
  getLoggedUser
}

function registerAccount(email, password) {
  return new Promise((resolve, reject) => {
    try {
      const salt = bcrypt.genSaltSync(10);
      const user = {
        email,
        password: bcrypt.hashSync(password, salt),
      }

      db.insert(user)
        .into(USERS_TABLE)
        .returning('id')
        .then(resolve)
    } catch (error) {
      reject(error)
    }
  })
}

function getUserByEmail(email) {
  return new Promise((resolve) => {
    db.select()
      .table(USERS_TABLE)
      .where('email', email)
      .then((user) => {
        resolve(user[0])
      })
  })
}

function getLoggedUser(email, password) {
  return new Promise((resolve, reject) => {
    getUserByEmail(email)
      .then((loggedUser) => {
        if(loggedUser) {
          const correctPassword = bcrypt.compareSync(password, logedInUser.password)
          if(correctPassword) {
            Session.generateSessionToken(logedInUser.id, logedInUser.email)
              .then((sessionToken) => {
                resolve({userData: loggedUser, token: sessionToken})
              })
          }
        }
        reject()

      })
  })
}
import * as AccountService from '../services/account'
const USER_ALREADY_EXISTS = "User already registered"

export {
  createAccount,
  login
}

function createAccount(req, res) {
  const { email, password } = req.body
  AccountService.getUserByEmail(email)
    .then((userEmailAreadyRegistered) => {
      if(!!userEmailAreadyRegistered) {
        return res.status(400).json({ok: false, ...USER_ALREADY_EXISTS})
      }
    })

  try {
    AccountService.registerAccount(email, password)
      .then((userId) => {
        res.status(200).json({ success: true, userId })
      })
  } catch (error) {
    res.status(500).json({ success: false })
  }
}

function login(req, res) {
  const { email, password } = req.body

  AccountService.getLoggedUser(email, password)
    .then(({userData, token}) => {
      return res.status(200).json({ ok: true, userData: userData, token: token })
    })
}
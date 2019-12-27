import * as uuid from 'node-uuid'
import getDbInstance from '../database'

const SESSION_DURATION = 1*60*60
const db = getDbInstance()

const SESSIONS_TABLE = "sessions"


async function generateSessionToken(userId, userEmail) {
  return new Promise((resolve, reject) => {
  const sessionToken = uuid.v4()
  const expireData = getSessionExpireDate()
  db.table(SESSIONS_TABLE)
    .insert({
      id: sessionToken,
      client_id: userId,
      expires: expireData
    })
    .then(() => {
      resolve(sessionToken)
    })
  })
}

function getSessionExpireDate() {
  const now = new Date()
  now.setSeconds(now.getSeconds() + SESSION_DURATION)
  return now
}
import express from 'express'
import session from 'cookie-session'
import { auth } from './auth.js'

export const app = express()
app.use(
  '/api',
  session({ secret: process.env['SESSION_SECRET'] || 'my secret' })
)
app.use(auth)

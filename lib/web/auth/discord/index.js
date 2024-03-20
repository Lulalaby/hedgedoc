'use strict'

const Router = require('express').Router
const passport = require('passport')
const DiscordStrategy = require('passport-discord').Strategy
const config = require('../../../config')
const response = require('../../../response')
const { passportGeneralCallback } = require('../utils')

const discordAuth = module.exports = Router()

var scopes = ['identify','guilds','rpc.voice.read','email','connections','guilds.members.read','rpc.activities.write'];

passport.use(new DiscordStrategy({
  clientID: config.discord.clientID,
  clientSecret: config.discord.clientSecret,
  callbackURL: config.serverURL + '/auth/discord/callback',
  scope: scopes
}, passportGeneralCallback))

discordAuth.get('/auth/discord', function (req, res, next) {
  passport.authenticate('discord')(req, res, next)
})

discordAuth.get('/auth/discord/callback', passport.authenticate('discord', {
  failureRedirect: config.serverURL + '/'
}), function (req, res) {
  res.redirect(config.serverURL + '/')
});

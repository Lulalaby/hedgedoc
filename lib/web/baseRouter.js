'use strict'

import {DiscordSDK} from '@discord/embedded-app-sdk';

const Router = require('express').Router

const response = require('../response')

const baseRouter = module.exports = Router()

const errors = require('../errors')

const config = require('../config')

const discordSdk = new DiscordSDK(config.discord.clientID);

async function setup() {
    await discordSdk.ready();

    const {code} = await discordSdk.commands.authorize({
        client_id: config.discord.clientID,
        response_type: 'code',
        state: '',
        prompt: '',
        scope: ['identify','guilds','rpc.voice.read','email','connections','guilds.members.read','rpc.activities.write'],
    });
    const response = await fetch(`https://discord.com/api/oauth2/token`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_id: config.discord.clientID,
            client_secret: config.discord.clientSecret,
            grant_type: 'authorization_code',
            code: code,
        }),
    });

    const {access_token} = await response.json()

    const auth = await discordSdk.commands.authenticate({
        access_token,
    });

    window.discordAuth = auth;
    await discordSdk.commands.encourageHardwareAcceleration();
/*        await discordSdk.commands.setActivity({
        activity: {
            type: 0,
            details: 'Exploring the world',
            state: 'Playing Traveler',
            assets: {
                large_image: "embedded_cover",
                large_text: "Traveler",
                small_image: "world00-lostisland",
                small_text: "Playing Traveler"
            }
        },
    });*/
}

setup();


// get index
baseRouter.get('/', response.showIndex)
// get 403 forbidden
baseRouter.get('/403', function (req, res) {
  errors.errorForbidden(res)
})
// get 404 not found
baseRouter.get('/404', function (req, res) {
  errors.errorNotFound(res)
})
// get 500 internal error
baseRouter.get('/500', function (req, res) {
  errors.errorInternalError(res)
})

const tmi = require('tmi.js')
require('dotenv').config()

const twitchQueue = new Array()
const usernameQueue = new Array()

const client = new tmi.Client({
    identity: {
        username: process.env.TWITCH_BOT_USERNAME,
        password: process.env.TWITCH_BOT_TOKEN
    },
    connection: {
        reconnect: true
    },
    channels: [
        process.env.TWITCH_STREAMER
    ],
})

client.connect().catch()
console.log("Client conncted successfully")

client.on('message', async (channel, context, message, self) => {
    if (self) return

    if (message.toLowerCase().includes("!joinq")) {
        if (!(message.toLowerCase().length >= 10 && message.toLowerCase().length <= 27)) {
            client.say(channel, `@${context.username} please include you IGN with this command.`)
        } else {
            if (joinQueue(context.username, message.slice(7, message.length)) !== -1) {
                client.say(channel, `@${context.username} you have been added to the queue. You are at position ${twitchQueue.length}.`)
            } else {
                client.say(channel, `@${context.username} you are already in the queue.`)
            }
        }
    }

    if (message.toLowerCase() === "!leaveq" || message.toLowerCase() === "!lq") {
        if (leaveQueue(context.username) !== -1) {
            client.say(channel, `@${context.username} you have successfully been removed from the queue.`)
        } else {
            client.say(channel, `@${context.username} you were not found in the queue.`)
        }
    }

    if (message.toLowerCase() === "!queue" || message.toLowerCase() === "!q") {
        if (getQueue(context.username) === -1) {
            client.say(channel, `@${context.username} you are not currently in the queue. Type !joinq to join.`)
        } else {
            client.say(channel, `@${context.username} your current position is: ${getQueue(context.username) + 1}.`)
        }
    }

    if (message.toLowerCase() === "!pick") {
        if (parseInt(context.badges.broadcaster) === 1 || parseInt(context.badges.moderator) === 1) {
            if (twitchQueue.length !== 0) {
                client.say(channel, `@${context.username}, please add ${usernameQueue.toString().slice(0, usernameQueue[0].length)} to the party.`)
                client.say(channel, `@${twitchQueue.toString().slice(0, twitchQueue[0].length)}, you were picked please prepare to start shortly.`)
                pick()
            } else {
                client.say(channel, `@${context.username} nobody is currently in the queue.`)
            }
        }
    }
})

function joinQueue(username, ign) {
    if (twitchQueue.indexOf(username) === -1) {
        twitchQueue.push(username)
        usernameQueue.push(ign)
        return 0
    } else {
        return -1
    }
}

function leaveQueue(username) {
    if (twitchQueue.indexOf(username) !== -1) {
        twitchQueue.splice(twitchQueue.indexOf(username))
        usernameQueue.splice(twitchQueue.indexOf(username))
        return 0
    } else {
        return -1
    }
}

function getQueue(username) {
    return twitchQueue.indexOf(username)
}

function pick() {
    leaveQueue(twitchQueue[0])
    return
}
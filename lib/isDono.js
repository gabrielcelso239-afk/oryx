const {
    getSenderInfo,
    lidToJid
} = require('@systemzero/baileys')

const { NumeroDono } = require('../config')

function isDono(msg) {

    try {

        const info = getSenderInfo(msg)

        const jidReal =
            info?.jid ||
            lidToJid(info?.lid) ||
            msg.key.participant ||
            msg.key.remoteJid

        if (!jidReal) return false

        const numero = jidReal
            .replace('@s.whatsapp.net', '')
            .replace(/:\d+(?=@)/, '')

        return numero === NumeroDono

    } catch {

        return false

    }

}

module.exports = isDono
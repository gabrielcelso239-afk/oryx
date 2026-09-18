const { NomeDoBot } = require('../config')
const {
    getSenderInfo,
    lidToJid
} = require('@systemzero/baileys')

module.exports = {
    command: ['perfil'],

    async run({ sandro, m }) {

        const info = getSenderInfo(m.raw)

        const jidReal =
            info?.jid ||
            lidToJid(m.sender) ||
            m.sender

        const numero = jidReal
            .replace('@s.whatsapp.net', '')
            .replace(/:\d+(?=@)/, '')

        let foto

        try {
            foto = await sandro.profilePictureUrl(jidReal, 'image')
        } catch {
            foto = 'https://i.imgur.com/6CQqHZb.jpeg'
        }

        const raiva = Math.floor(Math.random() * 101)
        const sorte = Math.floor(Math.random() * 101)
        const beleza = Math.floor(Math.random() * 101)

        sandro.sendMessage(
            m.from,
            {
                image: { url: foto },
                caption: `> PERFIL

> Nome: ${m.pushName}
> Número: ${numero}

> Nível de puto: ${raiva}%
> Sorte: ${sorte}%
> Beleza: ${beleza}%

> ${NomeDoBot}`
            },
            {
                quoted: m.raw
            }
        )

    }
}
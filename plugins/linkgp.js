module.exports = {
    command: ['linkgp', 'linkgroup'],

    async run({ sandro, m }) {

        try {

            const codigo =
                await sandro.groupInviteCode(m.from)

            m.reply(
                `> Link do grupo:\nhttps://chat.whatsapp.com/${codigo}`
            )

        } catch (err) {

            console.log(err)

            m.reply(
                '❌ Não foi possível obter o link do grupo.'
            )

        }

    }
}
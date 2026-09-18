module.exports = {
    command: ['teste'],

    async run({ m }) {

        if (!m.isDono) {
            return m.reply('❌ Apenas o dono pode usar.')
        }

        await m.reply('✅ Você é o dono.')
    }
}
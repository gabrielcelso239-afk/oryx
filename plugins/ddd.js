const axios = require('axios')
const { NomeDoBot, PREFIX, VERSAO, NickDono } = require('../config')
module.exports = {
    command: ['ddd'],

    async run({ sandro, m, args, command }) {

        if (!args[0]) {
            return m.reply(
                `❌ Uso correto:\n.${command} <DDD>\n\nExemplo:\n.ddd 31`
            )
        }

        const ddd = args[0]

        try {

            const { data } = await axios.get(
                `https://brasilapi.com.br/api/ddd/v1/${ddd}`
            )

            if (!data || !data.cities) {
                return m.reply(
                    `❌ Não encontrei informações para o DDD ${ddd}.`
                )
            }

            let texto =
`> DDD ${ddd}
> Estado: ${data.state}
> Bot: ${NomeDoBot}

Cidades:`

            data.cities.forEach((cidade, index) => {
                texto += `${index + 1} ➜ ${cidade}\n`
            })

            await sandro.sendMessage(
                m.from,
                {
                    text: texto
                },
                {
                    quoted: m.raw
                }
            )

        } catch (err) {

            console.log(err)

            m.reply(
                '❌ Erro ao buscar informações do DDD.'
            )

        }

    }
}
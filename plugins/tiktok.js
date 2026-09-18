const axios = require('axios')
const { NomeDoBot } = require('../config')

module.exports = {
    command: ['tiktok', 'tt', 'ttk'],

    async run({ sandro, m, args }) {

        try {

            const q = args.join(' ')

            if (!q) {
                return m.reply(
`❌ Envie o link do TikTok.

Exemplo:
.tiktok https://vm.tiktok.com/xxxxxxxx/`
                )
            }

            await m.reply(`Buscando Por ${q} Aguarde...`)

            const { data } = await axios.get(
                `https://www.tikwm.com/api/?url=${encodeURIComponent(q)}`
            )

            if (!data || data.code !== 0) {
                return m.reply(
                    '❌ Não foi possível baixar esse vídeo.'
                )
            }

            await sandro.sendMessage(
                m.from,
                {
                    video: {
                        url: data.data.play
                    },
                    caption:
`> TIKTOK DOWNLOAD

> Título: ${data.data.title || 'Sem título'}
> Autor: ${data.data.author?.nickname || 'Desconhecido'}
> Curtidas: ${data.data.digg_count}
> Comentários: ${data.data.comment_count}
> Compartilhamentos: ${data.data.share_count}

> ${NomeDoBot}`
                },
                {
                    quoted: m.raw
                }
            )

        } catch (err) {

            console.log(err)

            m.reply(
                '❌ Erro ao baixar o vídeo do TikTok.'
            )

        }

    }
}
const fs = require('fs')
const path = require('path')
const { getFileBuffer, mediaToWebp } = require('../lib/sticker')

module.exports = {
    command: ['s', 'sticker', 'fig'],

    async run({ sandro, m }) {

        try {

            const RSM =
                m.raw.message?.extendedTextMessage
                ?.contextInfo?.quotedMessage

            const imagem =
                RSM?.imageMessage ||
                m.raw.message?.imageMessage

            const video =
                RSM?.videoMessage ||
                m.raw.message?.videoMessage

            const isImage = !!imagem
            const isVideo = !!video && video.seconds < 11

            if (!isImage && !isVideo) {
                return m.reply(
                    '❌ Marque uma imagem ou vídeo de até 10 segundos.'
                )
            }

            const buffer = await getFileBuffer(
                isImage ? imagem : video,
                isImage ? 'image' : 'video'
            )

            const pastaTmp = path.join(__dirname, '../tmp')

            if (!fs.existsSync(pastaTmp)) {
                fs.mkdirSync(pastaTmp, { recursive: true })
            }

            const input = path.join(
                pastaTmp,
                `input.${isImage ? 'jpg' : 'mp4'}`
            )

            const output = path.join(
                pastaTmp,
                'output.webp'
            )

            fs.writeFileSync(input, buffer)

            await mediaToWebp(
                input,
                output,
                isVideo
            )

            const webpBuffer =
                fs.readFileSync(output)

            await sandro.sendMessage(
                m.from,
                {
                    sticker: webpBuffer
                },
                {
                    quoted: m.raw
                }
            )

            if (fs.existsSync(input))
                fs.unlinkSync(input)

            if (fs.existsSync(output))
                fs.unlinkSync(output)

        } catch (e) {

            console.log(e)

            m.reply(
                '❌ Erro ao criar figurinha.'
            )

        }

    }
}
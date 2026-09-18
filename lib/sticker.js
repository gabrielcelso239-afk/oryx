const {
    downloadContentFromMessage
} = require('@systemzero/baileys')

const {
    exec
} = require('child_process')

async function getFileBuffer(
    media,
    mediaType
) {

    const stream =
        await downloadContentFromMessage(
            media,
            mediaType
        )

    let buffer = Buffer.from([])

    for await (const chunk of stream) {
        buffer = Buffer.concat([
            buffer,
            chunk
        ])
    }

    return buffer
}

function mediaToWebp(
    input,
    output,
    isVideo = false
) {

    return new Promise(
        (resolve, reject) => {

            const cmd = isVideo

                ? `ffmpeg -i "${input}" -vcodec libwebp -vf "scale=512:512:force_original_aspect_ratio=decrease,fps=15" -loop 0 -ss 00:00:00 -t 00:00:10 -preset default -an -vsync 0 "${output}" -y`

                : `ffmpeg -i "${input}" -vf "scale=512:512:force_original_aspect_ratio=decrease" "${output}" -y`

            exec(cmd, (err) => {

                if (err)
                    return reject(err)

                resolve(output)

            })

        }
    )
}

module.exports = {
    getFileBuffer,
    mediaToWebp
}
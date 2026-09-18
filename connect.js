//DEIXA OS CREDITOS DA BASE.

//CRIADOR DA BASE: SANDRO BOT
//CHANEL: https://whatsapp.com/channel/0029VarBveB6hENqZSkAM71p
//GRUPO: https://chat.whatsapp.com/FuZxWjizmtR8MAIgxHXM3j

//OBRIGADO MEU NOBRE!!
const path = require('path')
const pino = require('pino')
const readline = require('readline')
const { Boom } = require('@hapi/boom')

const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    Browsers
} = require('@systemzero/baileys')

let reconectando = false

function perguntar(texto) {

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    return new Promise(resolve => {
        rl.question(texto, resposta => {
            rl.close()
            resolve(resposta.trim())
        })
    })

}

async function connect(onReady) {

    if (reconectando) return

    reconectando = true

    try {

        const sessionPath = path.join(__dirname, 'qr-code')

        const { state, saveCreds } =
            await useMultiFileAuthState(sessionPath)

        const { version } =
            await fetchLatestBaileysVersion()

        const sandro = makeWASocket({

            version,

            logger: pino({
                level: 'silent'
            }),

            browser: Browsers.ubuntu('Chrome'),

            auth: {
                creds: state.creds,
                keys: state.keys
            },

            printQRInTerminal: false,

            syncFullHistory: false,

            markOnlineOnConnect: true,

            generateHighQualityLinkPreview: false,

            keepAliveIntervalMs: 15000,

            connectTimeoutMs: 30000,

            defaultQueryTimeoutMs: 30000,

            emitOwnEvents: false

        })

        sandro.ev.on(
            'creds.update',
            saveCreds
        )

        sandro.ev.on(
            'connection.update',
            async ({
                connection,
                lastDisconnect
            }) => {

                if (connection === 'open') {

                    console.log('✅ BOT CONECTADO')

                    reconectando = false

                    if (typeof onReady === 'function') {
                        onReady(sandro)
                    }

                    return
                }

                if (connection !== 'close') return

                let code = 0

                try {

                    code =
                        new Boom(lastDisconnect?.error)
                            ?.output?.statusCode || 0

                } catch {}

                console.log(
                    `❌ Conexão fechada (${code})`
                )

                reconectando = false

                if (
                    code === DisconnectReason.loggedOut
                ) {

                    console.log(
                        '❌ Sessão desconectada.'
                    )

                    return
                }

                console.log(
                    '🔄 Reconectando...'
                )

                setTimeout(() => {
                    connect(onReady)
                }, 3000)

            }
        )

        if (!state.creds.registered) {

            let numero = await perguntar(
                '\nDigite o número com DDI:\nEx: 553190972868\n\nNúmero: '
            )

            numero = numero.replace(/\D/g, '')

            const codigo =
                await sandro.requestPairingCode(numero)

            console.log(`
╔══════════════════════╗
║ CÓDIGO DE PAREAMENTO
║ ${codigo}
╚══════════════════════╝
`)

        }

        return sandro

    } catch (err) {

        console.log(err)

        reconectando = false

        console.log('🔄 Reconectando...')

        setTimeout(() => {
            connect(onReady)
        }, 5000)

    }

}

module.exports = {
    connect
}
//DEIXA OS CREDITOS DA BASE.

//CRIADOR DA BASE: SANDRO BOT
//CHANEL: https://whatsapp.com/channel/0029VarBveB6hENqZSkAM71p
//GRUPO: https://chat.whatsapp.com/FuZxWjizmtR8MAIgxHXM3j

//OBRIGADO MEU NOBRE!!
const fs = require('fs')
const path = require('path')
const { connect } = require('./connect')
const { PREFIX } = require('./config')
const isDono = require('./lib/isDono')

const plugins = new Map()

function carregarPlugins() {

    plugins.clear()

    const pasta = path.join(__dirname, 'plugins')

    if (!fs.existsSync(pasta)) {
        fs.mkdirSync(pasta, { recursive: true })
        return
    }

    const arquivos = fs.readdirSync(pasta)

    for (const arquivo of arquivos) {

        if (!arquivo.endsWith('.js')) continue

        try {

            const local = path.join(pasta, arquivo)

            delete require.cache[require.resolve(local)]

            const plugin = require(local)

            if (!plugin.command) continue

            const comandos = Array.isArray(plugin.command)
                ? plugin.command
                : [plugin.command]

            for (const cmd of comandos) {
                plugins.set(cmd.toLowerCase(), plugin)
            }

        } catch (err) {

            console.log(`❌ Erro em ${arquivo}`)
            console.log(err)

        }
    }
}

carregarPlugins()

let socketAtual = null

connect((sandro) => {

    socketAtual = sandro

    console.log('🤖 Sistema iniciado.')

    sandro.ev.removeAllListeners('messages.upsert')

    sandro.ev.on('messages.upsert', async ({ messages }) => {

        try {

            const msg = messages?.[0]

            if (!msg?.message) return
            if (msg.key.fromMe) return

            const from = msg.key.remoteJid

            if (
                !from ||
                from === 'status@broadcast'
            ) return

            const body =
                msg.message?.conversation ||
                msg.message?.extendedTextMessage?.text ||
                msg.message?.imageMessage?.caption ||
                msg.message?.videoMessage?.caption ||
                ''

            if (!body.startsWith(PREFIX)) return

            const partes = body
                .slice(PREFIX.length)
                .trim()
                .split(/\s+/)

            const command = partes.shift()?.toLowerCase()

            if (!command) return

            const plugin = plugins.get(command)

            if (!plugin) {

                return sandro.sendMessage(
                    from,
                    {
                        text:
`❌ Olá ${msg.pushName || 'Usuário'}, o comando *${command}* não existe.
📌 Use *${PREFIX}menu* para ver os comandos disponíveis.`
                    },
                    {
                        quoted: msg
                    }
                )

            }

            const agora = new Date()

            const data =
                agora.toLocaleDateString('pt-BR')

            const hora =
                agora.toLocaleTimeString('pt-BR')

            if (from.endsWith('@g.us')) {

                console.log(`
╔══════════════════════════════╗
║COMANDO EM GRUPO
╠══════════════════════════════╣
║ Usuário: ${msg.pushName || 'Sem Nome'}
║ Comando: ${PREFIX}${command}
║ Data: ${data}
║ Hora: ${hora}
╚══════════════════════════════╝`)

            } else {

                console.log(`
╔══════════════════════════════╗
║COMANDO NO PRIVADO
╠══════════════════════════════╣
║ Usuário: ${msg.pushName || 'Sem Nome'}
║ Comando: ${PREFIX}${command}
║ Data: ${data}
║ Hora: ${hora}
╚══════════════════════════════╝`)

            }
            
const sender =
    msg.key.participant ||
    msg.key.remoteJid

const m = {
    from,
    sender,
    pushName: msg.pushName || 'Usuário',
    body,
    args: partes,
    raw: msg,
    isDono: isDono(msg),

    reply(text) {
        return sandro.sendMessage(
            from,
            { text },
            { quoted: msg }
        )
    }
}

            await plugin.run({
                sandro,
                m,
                args: partes,
                command
            })

        } catch (err) {

            console.log('❌ ERRO:')
            console.log(err)

        }

    })

})
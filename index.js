<<<<<<< HEAD
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
=======
//*Opa man fiz essa base para os iniciantes ela e meio basica mais muito util, estou postando ela totalmente descriptografada porem quero meus creditos//*

const {
default: AnyWASocket,
MessageType,
Presence,
GroupSettingChange,
WA_MESSAGE_STUB_TYPES,
Mimetype,
relayWAMessage,
makeInMemoryStore,
useSingleFileAuthState,
useMultiFileAuthState,
BufferJSON, 
jidDecode, 
DisconnectReason, 
fetchLatestBaileysVersion,
downloadContentFromMessage,
delay,
WA_DEFAULT_EPHEMERAL ,
generateWAMessageFromContent ,
proto ,
generateWAMessageContent ,
generateWAMessage ,
prepareWAMessageMedia ,
areJidsSameUser ,
getContentType
} = require("@adiwajshing/baileys")
const fs = require("fs")
const chalk = require("chalk")
const P = require("pino")
const p = require("pino")
const Pino = require("pino")
const axios = require('axios')
const clui = require("clui")
const util = require("util")
const fetch = require("node-fetch")
const yts = require("yt-search")
const Crypto = require("crypto")
const ff = require('fluent-ffmpeg')
const webp = require("node-webpmux")
const path = require("path")
const cheerio = require("cheerio")
const cfonts = require("cfonts")
const BodyForm = require("form-data")
const mimetype = require("mime-types")
const speed = require("performance-now")
const { exec, spawn, execSync } = require("child_process")
const { color } = require("./megumax/lib/color")
const { fetchJson } = require("./megumax/lib/fetcher")
const { fromBuffer } = require("file-type")
const { tmpdir } = require("os")
const premium = JSON.parse(fs.readFileSync('./megumax/json/premium.json'));
const setting = require('./megumax/json/config.js')
const  antilink = JSON.parse(fs.readFileSync('./megumax/json/antilink.json'))
const moment = require("moment-timezone")
const hora = moment.tz("America/Sao_Paulo").format("HH:mm:ss")
const data = moment.tz("America/Sao_Paulo").format("DD/MM/YY")
const { banner, banner2, getGroupAdmins, getBuffer, getExtension, getRandom, upload, log } = require("./megumax/lib/funções.js")
const isi = JSON.parse(fs.readFileSync("./megumax/json/data.json"))
const dono = isi.numeroDono
prefix = isi.prefix
prefixo = isi.prefix
nomeBot = isi.nomeBot
NomeBot = isi.nomeBot
numeroBot = isi.numeroBot
nomeDono = isi.nomeDono
NomeDono = isi.nomeDono
dark = isi.dark
numeroDono = isi.numeroDono
const min = JSON.parse(fs.readFileSync('./megumax/edite/fotos.json'))
megu = min.megumax
ping1 = min.ping1
antil = min.anti
gay = min.gays
boi = min.bovi
gatito = min.gato
const { menu } = require('./megumax/edite/menu.js');
async function startmegumax () {
const store = makeInMemoryStore({ logger: P().child({ level: "debug", stream: "store" }) })
const { state, saveCreds } = await useMultiFileAuthState('./megumax/qr')
console.log(banner.string)
console.log(banner2.string)
const megumin = AnyWASocket({
logger: P({ level: "silent" }),
printQRInTerminal: true,
auth: state
})
megumin.ev.on('creds.update', saveCreds);
store.bind(megumin.ev)
megumin.ev.on("chats.set", () => {
console.log("Tem conversas", store.chats.all())
})
megumin.ev.on("contacts.set", () => {
console.log("Tem contatos", Object.values(store.contacts))
})
megumin.ev.on("connection.update", (update) => {
const { connection, lastDisconnect } = update
if(connection === "close") {
const shouldReconnect = (lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut
console.log("Conexão fechada devido a", lastDisconnect.error, "Tentando reconectar...", shouldReconnect);
if(shouldReconnect) {
startmegumax()
}
} else if(connection === "open") {
console.log(`${color(`Bot conectado com sucesso✓`,'green')}`)
}
})
console.log(`${color(`Meu proprietário: ${nomeDono}`,'magenta')}`)
console.log(`${color(`MeguminBot.inc`,'magenta')}`)
megumin.ev.on("messages.upsert", async m => {
try {
const info = m.messages[0]
if (!info.message) return 
await megumin.readMessages([info.key]);
if (info.key && info.key.remoteJid == "status@broadcast") return
const altpdf = Object.keys(info.message)
const type = altpdf[0] == "senderKeyDistributionMessage" ? altpdf[1] == "messageContextinfo" ? altpdf[2] : altpdf[1] : altpdf[0]
global.prefixo
const msg = m.messages[0]
if (!msg.message) return 
const getBuffer = (url, options) => new Promise(async (resolve, reject) => { 
options ? options : {}
await axios({method: "get", url, headers: {"DNT": 1, "Upgrade-Insecure-Request": 1}, ...options, responseType: "arraybuffer"}).then((res) => {
resolve(res.data)
}).catch(reject)
})
const getRandom = (ext) => {
return `${Math.floor(Math.random() * 10000)}${ext}`
}
const getExtension = async (type) => {
return await mimetype.extension(type)
}
const content = JSON.stringify(info.message)
const from = info.key.remoteJid
var body = (type === 'conversation') ? msg.message.conversation : (type == 'imageMessage') ? msg.message.imageMessage.caption : (type == 'videoMessage') ? msg.message.videoMessage.caption : (type == 'extendedTextMessage') ? msg.message.extendedTextMessage.text : (type == 'buttonsResponseMessage') ? msg.message.buttonsResponseMessage.selectedButtonId : (type == 'listResponseMessage') ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : (type == 'templateButtonReplyMessage') ? msg.message.templateButtonReplyMessage.selectedId : (type === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId || msg.text) : ''                                                                           
budy = (type === 'conversation') ? info.message.conversation : (type === 'extendedTextMessage') ? info.message.extendedTextMessage.text : ''
const args = body.trim().split(/ +/).slice(1)
const isCmd = body.startsWith(prefixo)
const megumax = isCmd ? body.slice(1).trim().split(/ +/).shift().toLocaleLowerCase() : null
const comando = isCmd ? body.slice(1).trim().split(/ +/).shift().toLocaleLowerCase() : null
budy = (type === "conversation") ? info.message.conversation : (type === "extendedTextMessage") ? info.message.extendedTextMessage.text : ""
button = (type == "buttonsResponseMessage") ? info.message.buttonsResponseMessage.selectedDisplayText : ""
button = (type == "buttonsResponseMessage") ? info.message.buttonsResponseMessage.selectedButtonId : ""
listMessage = (type == "listResponseMessage") ? info.message.listResponseMessage.title : ""
var pes = (type === "conversation" && info.message.conversation) ? info.message.conversation : (type == "imageMessage") && info.message.imageMessage.caption ? info.message.imageMessage.caption : (type == "videoMessage") && info.message.videoMessage.caption ? info.message.videoMessage.caption : (type == "extendedTextMessage") && info.message.extendedTextMessage.text ? info.message.extendedTextMessage.text : ""
bidy =  budy.toLowerCase()
const getFileBuffer = async (mediakey, MediaType) => { 
const stream = await downloadContentFromMessage(mediakey, MediaType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
return buffer
}
const mentions = (teks, memberr, id) => {
(id == null || id == undefined || id == false) ? megumin.sendMessage(from, {text: teks.trim(), mentions: memberr}) : megumin.sendMessage(from, {text: teks.trim(), mentions: memberr})
}
const getGroupAdmins = (participants) => {
admins = []
for (let i of participants) {
if(i.admin == "admin") admins.push(i.id)
if(i.admin == "superadmin") admins.push(i.id)
}
return admins
}
if (global.megumin) global.megumin = {
    chats: {},
    ...(global.megumin || {})
}
const messagesC = pes.slice(0).trim().split(/ +/).shift().toLowerCase()
const arg = body.substring(body.indexOf(" ") + 1)
const numeroBot = megumin.user.id.split(":")[0]+"@s.whatsapp.net"
const argss = body.split(/ +/g)
const testat = body
const ants = body
const isGroup = info.key.remoteJid.endsWith("@g.us")
const tescuk = ["0@s.whatsapp.net"]
const q = args.join(" ")
const isUrl = (url) => {
return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}
function telegraph(Path) {
return new Promise (async (resolve, reject) => {
if (!fs.existsSync(Path)) return reject(new Error("File not Found"))
try {
const form = new BodyForm();
form.append("file", fs.createReadStream(Path))
const data = await  axios({url: "https://telegra.ph/upload", method: "POST", headers: {...form.getHeaders()}, data: form})
return resolve("https://telegra.ph" + data.data[0].src)
} catch (err) {
return reject(new Error(String(err)))
}
})
}
const runtime = function (seconds) {
seconds = Number(seconds);
var d = Math.floor(seconds / (3600 * 24));
var h = Math.floor((seconds % (3600 * 24)) / 3600);
var m = Math.floor((seconds % 3600) / 60);
var s = Math.floor(seconds % 60);
var dDisplay = d > 0 ? d + (d == 1 ? " dia, " : " Dia, ") : "";
var hDisplay = h > 0 ? h + (h == 1 ? " hora, " : " Hora, ") : "";
var mDisplay = m > 0 ? m + (m == 1 ? " minuto, " : " Minuto, ") : "";
var sDisplay = s > 0 ? s + (s == 1 ? " segundo" : " Segundo") : "";
return dDisplay + hDisplay + mDisplay + sDisplay;
}
const sender = isGroup ? info.key.participant : info.key.remoteJid
const pushname = info.pushName ? info.pushName : ""
const isAntiLink = isGroup ? antilink.includes(m.chat) : false
const groupMetadata = isGroup ? await megumin.groupMetadata(from) : ""
const groupName = isGroup ? groupMetadata.subject : ""
const groupDesc = isGroup ? groupMetadata.desc : ""
const groupMembers = isGroup ? groupMetadata.participants : ""
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ""
const participants = isGroup ? await groupMetadata.participants : ''
const text = args.join(" ")
const c = args.join(' ')
const enviar = (texto) => {
mimi = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
 megumin.sendMessage(from, {
document: fs.readFileSync('./megumax/lib/arquivo.xlsx'),
mimetype: mimi,
jpegThumbnail: null,
mentions: null,
fileName: `${NomeBot}`,
fileLength: 9999999999999999999999999999,
caption: texto,
footer: `Usuario:${pushname}`, 
contextInfo:{"externalAdReply": {"title": `${nomeDono}`,"body": `Nome: ${pushname} `, "previewType": "PHOTO","thumbnailUrl": `${megu}`,"thumbnail":  Buffer,"sourceUrl": "https://youtube.com/@apenasumsacole8437"}}}, { quoted: info})}
const monkey = {key : {participant : '0@s.whatsapp.net'},message: {contactMessage:{displayName: `${pushname}`}}}
const quejo1 = {
key: { 
fromMe: false,
participant: `0@s.whatsapp.net`, ...(m.chat ? 
{ remoteJid: "17608914335-1625305606@g.us" } : {}) 
},
message: { 
"extendedTextMessage": {
"text":'SUB sacole OFC',
"title": 'Miku bot-V4',
 'jpegThumbnail': fs.readFileSync('./megumax/edite/pobre.jpg')
             }
           } 
          }
const quejo = {
key : {
fromMe: false,
participant : '0@s.whatsapp.net'
},
message: {
documentMessage: {
showAdAttribution: true,
title: NomeBot, 
jpegThumbnail: fs.readFileSync('./megumax/edite/pobre.jpg')
}
}
}
const quoted = info.quoted ? info.quoted : info
const mime = (quoted.info || quoted).mimetype || ""
const isBot = info.key.fromMe ? true : false
const isBotGroupAdmins = groupAdmins.includes(numeroBot) || false
const isGroupAdmins = groupAdmins.includes(sender) || false 
const isOwner = sender.includes(numeroDono)
const groupId = isGroup ? groupMetadata.jid : ''
banChats = true

var budy2 = budy.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
const command = isCmd ? body.slice(1).trim().split(/ +/).shift().toLocaleLowerCase() : null
const isImage = type == "imageMessage"
const isVideo = type == "videoMessage"
const isAudio = type == "audioMessage"
const isSticker = type == "stickerMessage"
const isContact = type == "contactMessage"
const isLocation = type == "locationMessage"
const isProduct = type == "productMessage"
const isMedia = (type === "imageMessage" || type === "videoMessage" || type === "audioMessage")
typeMessage = body.substr(0, 50).replace(/\n/g, "")
if (isImage) typeMessage = "Image"
else if (isVideo) typeMessage = "Video"
else if (isAudio) typeMessage = "Audio"
else if (isSticker) typeMessage = "Sticker"
else if (isContact) typeMessage = "Contact"
else if (isLocation) typeMessage = "Location"
else if (isProduct) typeMessage = "Product"
const isQuotedMsg = type === "extendedTextMessage" && content.includes("textMessage")
const isQuotedImage = type === "extendedTextMessage" && content.includes("imageMessage")
const isQuotedVideo = type === "extendedTextMessage" && content.includes("videoMessage")
const isQuotedDocument = type === "extendedTextMessage" && content.includes("documentMessage")
const isQuotedAudio = type === "extendedTextMessage" && content.includes("audioMessage")
const isQuotedSticker = type === "extendedTextMessage" && content.includes("stickerMessage")
const isQuotedContact = type === "extendedTextMessage" && content.includes("contactMessage")
const isQuotedLocation = type === "extendedTextMessage" && content.includes("locationMessage")
const isQuotedProduct = type === "extendedTextMessage" && content.includes("productMessage")



const time2 = moment().tz('America/Sao_Paulo').format('HH:mm:ss')
if(time2 > "00:00:00"){
var tempo = 'BOA MADRUGADA' 
} 
if(time2 > "05:30:00"){
var tempo = 'BOM DIA' 
}
if(time2 > "12:00:00"){
var tempo = 'BOA TARDE' 
}
if(time2 > "19:00:00"){
var tempo = 'BOA NOITE' 
}
const gpl = `https://chat.whatsapp.com/F8gQQ1bKkXvLIV63Ih8B4W`
const sticWait = (hehe) => {
			ano = fs.readFileSync('./megumax/edite/wait.webp')
			megumin.sendMessage(hehe, {sticker: fs.readFileSync('./megumax/edite/wait.webp'),contextInfo:{externalAdReply:{
title: `\nOlá ${pushname}\n`,
body: `≫ clique aqui`,
mediaType:2,
thumbnail: ano,
sourceUrl: `${gpl}`,
mediaUrl: `${gpl}`}}})
		}
const enviargif = (videoDir, caption) => {
megumin.sendMessage(from, {
video: fs.readFileSync(videoDir),
caption: caption,
gifPlayback: true
})
}

const enviarimg = (imageDir, caption) => {
megumin.sendMessage(from, {
image: fs.readFileSync(imageDir),
caption: caption
})
}

if(isGroup && isCmd) {
if (isGroup && isCmd) console.log(`
${color(`┌───< Megu >`,`magenta`)}
${color(`┊<Local>:`,`red`)} Mensagem em grupo
${color(`┊<Comando>:`,`red`)} ${comando} ${q}
${color(`┊<Grupo>:`,`red`)} ${groupName}
${color(`┊<Nome>:`,`red`)} ${pushname}
${color(`└───< Megu >`,`magenta`)}
`)
if (isGroup && !isCmd) console.log(`
${color(`┌───< Megu >`,`magenta`)}
${color(`┊<Local>:`,`red`)} Mensagem em grupo
${color(`┊<Comando>:`,`red`)} Não
${color(`┊<Nome>:`,`red`)} ${pushname}
${color(`└───< Megu >`,`magenta`)}
`)

if (!isGroup && isCmd) console.log(`
${color(`┌───< Megu >`,`magenta`)}
${color(`┊<Local>:`,`red`)} Mensagem no pv
${color(`┊<Comando>:`,`red`)} ${comando} ${q}
${color(`┊<Nome>:`,`red`)} ${pushname}
${color(`└───< Megu >`,`magenta`)}
`)

if (!isGroup && !isCmd) console.log(`
${color(`┌───< Megu >`,`magenta`)}
${color(`┊<Local>:`,`red`)} Mensagem no pv
${color(`┊<Comando>:`,`red`)} Não
${color(`┊<Grupo>:`,`red`)} Não
${color(`┊<Nome>:`,`red`)} ${pushname}
${color(`└───< Megu >`,`magenta`)}
`)

const enviarfig = async (figu, tag) => {
bla = fs.readFileSync(figu)
megumin.sendMessage(from, {sticker: bla}, {quoted: info})
}

const sendBimg = async (id, img1, text1, desc1, but = [], vr) => {
buttonMessage = {
image: {url: img1},
caption: text1,
footerText: desc1,
buttons: but,
headerType: 4
}
megumin.sendMessage(id, buttonMessage, {quoted: vr})
}

const sendBvidT = async (id, img1, text1, desc1, but = [], vr) => {
templateMessage = {
video: {url: img1},
gifPlayback: true,
caption: text1,
footer: desc1,
templateButtons: but,
}
megumin.sendMessage(id, templateMessage, {quoted: vr})
}

const sendBimgT = async (id, img1, text1, desc1, but = [], vr) => {
templateMessage = {
image: {url: img1},
caption: text1,
footer: desc1,
templateButtons: but,
}
megumin.sendMessage(id, templateMessage, {quoted: vr})
}

const enviarImgB = async (id, img1, text1, desc1, but = [], vr) => {
buttonMessage = {
image: {url: img1},
caption: text1,
footer: desc1,
buttons: but,
headerType: 4
}
megumin.sendMessage(id, buttonMessage, {quoted: vr})
}
if (!isAntiLink) {
if (budy.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi')) {
let gclink = (`https://chat.whatsapp.com/`+await megumin.groupInviteCode(m.chat))
let isLinkThisGc = new RegExp(gclink, 'i')
let isgclink = isLinkThisGc.test(m.c)
if (isgclink) return enviar('Passou raspamdo dessa vez')
if (isGroupAdmins) return enviar('Adm traindo o bando')
if (isOwner) return enviar('Sou cega')
megumin.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
        }
        }
const enviartextB = async (id, text1, desc1, but = [], vr) => {
buttonMessage = {
text: text1,
buttons: but,
footer: desc1,
headerType: 4
}
megumin.sendMessage(id, buttonMessage, {quoted: vr})
}

if (!isCmd && info.key.fromMe) return

switch (megumax) {

case 'menu':
enviar('*Calma vo pegar um cafezin☕*')
sendBimgT(from, `${megu}`, menu(pushname, sender, NomeBot, numeroDono, nomeDono, prefixo), "🐾🐾🐾🐾🐾", [
{index: 1, urlButton: {displayText: '⛧ Click ⛧', url: 'https://wa.me/556298313456'}},
{index: 4, quickReplyButton: {displayText: 'my velocity', id: `${prefixo}ping`}}], quejo)
break

case'ping':
let timestamp3 = speed()
                let latensi3 = speed() - timestamp3
                neww = performance.now()
                oldd = performance.now()
			uptime = process.uptime()
mimi = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
hora1 = moment.tz('America/Sao_Paulo').format('HH:mm:ss');
data1 = moment.tz("America/Sao_Paulo").format("DD/MM/YY")
let unicorndoc = {key: {fromMe: false,"participant":"0@s.whatsapp.net", "remoteJid": "916909137213-1604595598@g.us"}, "message": {orderMessage: {itemCount: 9999999,status: 200, thumbnail: megu, surface: 200, message: `${NomeBot}`, orderTitle: 'xeon', sellerJid: '0@s.whatsapp.net'}}, contextInfo: {"forwardingScore":999,"isForwarded":true},sendEphemeral: true}
const pingu = `┌───< ✨𝙋𝙞𝙣𝙜✨>
*┊Velocidade* ${latensi3.toFixed(4)}
*┊Tempo ativo:*
${runtime(process.uptime())} 
*┊Data :* ${data1} 
*┊User :* ${pushname}
└───< ✨${hora1}✨> `
sendBimgT(from, `${ping1}`, pingu, "como vai você?", [
{index: 1, urlButton: {displayText: '⛧ sua velocidade ⛧', url: 'https://www.fast.com'}},
{index: 4, quickReplyButton: {displayText: 'update', id: `${prefixo}ping`}}], quejo)
break

case'gay':
enviar(` *_Sera que vc e gay: @${sender.split("@")[0]}_* 😥`)
sacol = `${Math.floor(Math.random() * 110)}`
paomito = sacol
gayy = `┌───< 🏳️‍🌈% 𝗚𝗮𝘆 %🏳️‍🌈 >
*┊eai * @${sender.split("@")[0]} vc e gay??*
*┊Sua porcentagem gay e:* ${paomito}%
└───< 🏳️‍🌈% 𝗚𝗮𝘆 %🏳️‍🌈 > `
sendBimgT(from, `${gay}`, gayy, "você e gay mas nao merece uma pedra nos rins\nbeba agua..", [{index: 4, quickReplyButton: {displayText: '% corno', id: `${prefixo}corno`}}], quejo)
break

case'corno':
enviar(` *_Puts o: @${sender.split("@")[0]}_* quer saber se e bovino😏`)
sacol = `${Math.floor(Math.random() * 110)}`
paomito = sacol
gayy = `┌───< 🐂% 𝗯𝗼𝘃𝗶𝗻𝗼 %🐂 >
*┊eai  @${sender.split("@")[0]} vc e ${comando}??*
*┊Sua porcentagem ${comando} e:* ${paomito}%
└───< 🐂% 𝗯𝗼𝘃𝗶𝗻𝗼 %🐂> `
sendBimgT(from, `${boi}`, gayy, "Cuidado com o poste man", [{index: 4, quickReplyButton: {displayText: '% Nazista', id: `${prefixo}rankgay`}}], quejo)
break

case'nazista':
enviar(` *_@${sender.split("@")[0]}_Vc e muito sus😑* `)
sacol = `${Math.floor(Math.random() * 110)}`
paomito = sacol
gayy = `┌───< ❌% 𝗡𝗮𝘇𝗶𝘀𝘁𝗮 %❌ >
*┊eai  @${sender.split("@")[0]} vc e ${comando}??*
*┊Sua porcentagem ${comando} e:* ${paomito}%
└───< ❌% 𝗡𝗮𝘇𝗶𝘀𝘁𝗮 %❌> `
sendBimgT(from, `${gatito}`, gayy, "Sus....", [{index: 4, quickReplyButton: {displayText: 'Rankgays', id: `${prefixo}rankgay`}}], quejo)
break

case 'urlvid':
case 'link':
case 'tourlvid':
case 'tourl':
try {
if ((isMedia && !info.message.videoMessage || isQuotedImage) && args.length == 0) { 
boij = isQuotedImage ? JSON.parse(JSON.stringify(info).replace('quotedM','m')).message.extendedTextMessage.contextInfo.message.imageMessage : info.message.imageMessage
owgi = await getFileBuffer(boij, 'image')
res = await upload(owgi)
enviar(res) 
} else if ((isMedia && info.message.videoMessage.seconds < 30 || isQuotedVideo && info.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 30) && args.length == 0) { 
boij = isQuotedVideo ? JSON.parse(JSON.stringify(info).replace('quotedM','m')).message.extendedTextMessage.contextInfo.message.videoMessage : info.message.videoMessage
owgi = await getFileBuffer(boij, 'video')
res = await upload(owgi)
enviar(res)
} else {
enviar("Cade a imagem/video??")
}
} catch {
enviar('Tente dnv..')
}
break

case 'join': {
if (!isOwner) return enviar('Criador?!')
   if (!q) return enviar('link??')
   if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) return enviar('*Invalido*')
   let result = args[0].split('https://chat.whatsapp.com/')[1]
   await megumin.groupAcceptInvite(result).then((res) => enviar("*Prontinho 🐞*"))
 }
 break

case 'leave': {
    if (!isOwner) return enviar('Criador?!')
   await megumin.groupLeave(m.chat).then((res) => enviar("*Prontinho 🐞*"))
 }
 break

case 'repetir':
rsp = q.replace(new RegExp("[()+-/ +a/b/c/d/e/fghijklmnopqrstwuvxyz/]", "gi"), "")
enviar(rsp)
break

case 'calculadora': case 'calcular':  case 'calc':
rsp = q.replace("x", "*").replace('"', ":").replace(new RegExp("[()abcdefghijklmnopqrstwuvxyz]", "gi"), "").replace("÷", "/")
console.log('[', color('EVAL', 'silver'),']', color(moment(info.messageTimestamp * 1000).format('DD/MM HH:mm:ss'), 'yellow'), color(rsp))
return enviar(JSON.stringify(eval(`${rsp}`,null,'\t')))
break 

case 'nomegp':
blat = args.join(" ")
megumin.groupUpdateSubject(from, `${blat}`)
megumin.sendMessage(from, {text: 'Sucesso, alterou o nome do grupo'}, {quoted: info})
break

case 'descgp': case 'descriçãogp':  
blabla = args.join(" ")
megumin.groupUpdateDescription(from, `${blabla}`)
megumin.sendMessage(from, {text: 'Sucesso, alterou a descrição do grupo'}, {quoted: info})
break

case 'setfotogp': case 'fotogp':  
if (!isGroup) return enviar('Só pode ser utilizado em Grupo')
if (!isGroupAdmins) return enviar('mamaco sem adm 🤠')
if (!isBotGroupAdmins) return enviar('O bot Precisa ser ADM')
if (!isQuotedImage) return enviar(`Use: ${prefix + command} <Marque uma foto>`)
ftgp = isQuotedImage ? info.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage : info.message.imageMessage
rane = getRandom('.'+await getExtension(ftgp.mimetype))
buffimg = await getFileBuffer(ftgp, 'image')
fs.writeFileSync(rane, buffimg)
medipp = rane 
await megumin.updateProfilePicture(from, {url: medipp})
enviar(`Foto do grupo alterada com sucesso`) 
break

case 'linkgp': case 'linkgroup':
if(!isGroup) return enviar('Este comando só deve ser utilizado em Grupo.')
linkgc = await megumin.groupInviteCode(from)
enviar('https://chat.whatsapp.com/'+linkgc)
break

case 'ass':
enviar('*Estou enviando no seu privado✨*')
const bufferImg = await getBuffer("https://api.brizaloka-api.tk/random/hentai/ass?apikey=brizaloka");
megumin.sendMessage(sender, {image: bufferImg}, {quoted: quejo});
break;

case 'creampie':
enviar('*Estou enviando no seu privado✨*')
const bufferImg2 = await getBuffer("https://api.brizaloka-api.tk/random/hentai/creampie?apikey=brizaloka");
megumin.sendMessage(sender, {image: bufferImg2}, {quoted: quejo});
break;

case 'bdsm':
enviar('*Estou enviando no seu privado✨*')
const bufferImg3 = await getBuffer("https://api.brizaloka-api.tk/random/hentai/bdsm?apikey=brizaloka");
megumin.sendMessage(sender, {image: bufferImg3}, {quoted: quejo});
break;

case 'incest':
enviar('*Estou enviando no seu privado✨*')
const bufferImg4 = await getBuffer("https://api.brizaloka-api.tk/random/hentai/incest?apikey=brizaloka");
megumin.sendMessage(sender, {image: bufferImg4}, {quoted: quejo});
break;

case 'manga':
enviar('*Estou enviando no seu privado✨*')
const bufferImg5 = await getBuffer("https://api.brizaloka-api.tk/random/hentai/manga?apikey=brizaloka");
megumin.sendMessage(sender, {image: bufferImg5}, {quoted: quejo});
break;

case 'tentacles':
enviar('*Estou enviando no seu privado✨*')
const bufferImg6 = await getBuffer("https://api.brizaloka-api.tk/random/hentai/tentacles?apikey=brizaloka");
megumin.sendMessage(sender, {image: bufferImg6}, {quoted: quejo});
break;

case 'gangbang':
enviar('*Estou enviando no seu privado✨*')
const bufferImg7 = await getBuffer("https://api.brizaloka-api.tk/random/hentai/gangbang?apikey=brizaloka");
megumin.sendMessage(sender, {image: bufferImg7}, {quoted: quejo});
break;

case 'uniform':
enviar('*Estou enviando no seu privado✨*')
const bufferImg8 = await getBuffer("https://api.brizaloka-api.tk/random/hentai/uniform?apikey=brizaloka");
megumin.sendMessage(sender, {image: bufferImg8}, {quoted: quejo});
break;

case 'ahegao':
enviar('*Estou enviando no seu privado✨*')
const bufferImg9 = await getBuffer("https://api.brizaloka-api.tk/random/hentai/ahegao?apikey=brizaloka");
megumin.sendMessage(sender, {image: bufferImg9}, {quoted: quejo});
break;

case 'femdom':
enviar('*Estou enviando no seu privado✨*')
const bufferImg10 = await getBuffer("https://api.brizaloka-api.tk/random/hentai/femdom?apikey=brizaloka");
megumin.sendMessage(sender, {image: bufferImg10}, {quoted: quejo});
break;

case 'boobs':
enviar('*Estou enviando no seu privado✨*')
const bufferImg11 = await getBuffer("https://api.brizaloka-api.tk/random/hentai/boobs?apikey=brizaloka");
megumin.sendMessage(sender, {image: bufferImg11}, {quoted: quejo});
break;

case 'silk':  
case '3dnature': 
case 'bevel': 
case 'birthdaycake': 
case 'burnpaper':  
case 'coffee': 
case 'coffee-heartcup': 
case 'embroiderytext': 
case 'flaming': 
case 'flowertypo': 
case 'funnycup': 
case 'fur': 
case 'gerbang': 
case 'glowrainbow': 
case 'gradientavatar': 
case 'graffititext': 
case 'harrypotter': 
case 'lovemessage': 
case 'luxuryroyal': 
case 'neonlight': 
case 'sweetcandy': 
case 'summertext': 
case 'woodheart': 
case 'woodblock': 
case 'yellowroses': 
case 'wolfmetal': 
case 'underwaterocean': {
enviar('*Isso pode demorar um pouco*')
if (!q) return enviar('Use assim ${prefix && comando}')
anu = await getBuffer(`https://violetics.pw/api/photooxy/${comando}?apikey=beta&text=${q}`)
megumin.sendMessage(from, {image: anu}, {quoted: quejo});
}
break;

case 'totag': case 'cita': case 'hidetag':
if(!isGroup) return enviar('*Este comando só deve ser utilizado em Grupo.*🕸️')
if (!isGroupAdmins) return enviar('*Você precisa ser adm🗿*')
membros = (groupId, membros1) => {
array = []
for (let i = 0; i < membros1.length; i++) {
array.push(membros1[i].id)
}
return array
}
var yd = membros(from, groupMembers)
if((isMedia && !info.message.videoMessage || isQuotedSticker) && args.length == 0) {
media = isQuotedSticker ? info.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage : info.message.stickerMessage
rane = getRandom('.'+await getExtension(media.mimetype))
img = await getFileBuffer(media, 'sticker')
fs.writeFileSync(rane,img)
fig = fs.readFileSync(rane)
var options = {
sticker: fig,  
mentions: yd
}
megumin.sendMessage(from, options)
} else if ((isMedia && !info.message.videoMessage || isQuotedImage) && args.length == 0) {
media = isQuotedImage ? info.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage : info.message.imageMessage
rane = getRandom('.'+await getExtension(media.mimetype))
img = await getFileBuffer(media, 'image')
fs.writeFileSync(rane,img)
buff = fs.readFileSync(rane)
megumin.sendMessage(from, {image: buff, mentions: yd}, {quoted: info})
} else if ((isMedia && !info.message.videoMessage || isQuotedVideo) && args.length == 0) {
media = isQuotedVideo ? info.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage : info.message.videoMessage
rane = getRandom('.'+await getExtension(media.mimetype))
vid = await getFileBuffer(media, 'video')
fs.writeFileSync(rane,vid)
buff = fs.readFileSync(rane)
megumin.sendMessage(from, {video: buff, mimetype: 'video/mp4',mentions: yd}, {quoted: info})
} else if ((isMedia && !info.message.videoMessage || isQuotedAudio) && args.length == 0) {
media = isQuotedAudio ? info.message.extendedTextMessage.contextInfo.quotedMessage.audioMessage : info.message.audioMessage
rane = getRandom('.'+await getExtension(media.mimetype))
aud = await getFileBuffer(media, 'audio')
fs.writeFileSync(rane,aud)
buff = fs.readFileSync(rane)
megumin.sendMessage(from, {audio: buff, mimetype: 'audio/mp4', ptt:true,mentions: yd}, {quoted: info})
} else if ((isMedia && !info.message.videoMessage || isQuotedDocument) && args.length == 0) {
media = isQuotedDocument ? info.message.extendedTextMessage.contextInfo.quotedMessage.documentMessage : info.message.documentMessage
rane = getRandom('.'+await getExtension(media.mimetype))
doc = await getFileBuffer(media, 'document')
fs.writeFileSync(rane,doc)
buff = fs.readFileSync(rane)
megumin.sendMessage(from, {document: buff, mimetype : 'text/plain',mentions: yd},{quoted: info})
} else if(budy){
if(q.length < 1) return enviar('Citar oq?')
megumin.sendMessage(from, {text: body.slice(command.length + 2), mentions: yd})
} else {
enviar(`Responder imagem/documento/gif/adesivo/áudio/vídeo com legenda ${prefix + command}`)
}
break

case 'marcarwa':
try {
if (!isGroup) return enviar('Este comando só deve ser utilizado em Grupo.')
if (!isGroupAdmins) return enviar('Você precisa ser ADM pra utilizar este comando')  
members_id = []
teks = (args.length > 1) ? body.slice(10).trim() : ''
teks += '\n\n'
for (let mem of groupMembers) {
teks += `╼⊳⊰ @${mem.id.split('@')[0]}\n`
members_id.push(mem.id)
}
megumin.sendMessage(from, {text: teks}, {quoted: info})
} catch {
enviar('ERROR!!')
}
break

case 'rebaixar': case 'demote':
if (!isGroup) return enviar('*Isso parece um grupo animal?*')
if (!isGroupAdmins) return enviar('mamaco sem adm 🤠')
if (info.message.extendedTextMessage === undefined || info.message.extendedTextMessage === null) return enviar('Marque ou responda a mensagem de quem você quer tirar de admin')
mentioned = info.message.extendedTextMessage.contextInfo.mentionedJid[0] ? info.message.extendedTextMessage.contextInfo.mentionedJid[0] : info.message.extendedTextMessage.contextInfo.participant
let responsepm = await megumin.groupParticipantsUpdate(from, [mentioned], 'demote')
if (responsepm[0].status === "406") return enviar('Como vc quer que eu remova o adm supremacy????')
else if (responsepm[0].status === "200") return enviar('Vacilou perdeu o adm kkkkk')
else if (responsepm[0].status === "404") return enviar('Esse cara nem ta no grupo')
else return enviar('tente dnv')
break

case 'antilink': case 'antilinks': case 'semlinks':
const ant = `*🕸️Selecione sua escolha abaixo🕸️* `
if (!isGroupAdmins) return enviar('mamaco sem adm 🤠')
if (!isGroup) return enviar('masqueicu isso e um grupo??')
if (c === 'on'){
if (isAntiLink) return m.reply('📍 *Já esta ativado*')
antilink.push(from)
fs.writeFileSync('./megumax/antilink.json', JSON.stringify(antilink))
enviar('*Antilink ativo no grupo,')
} else if (c === 'off'){
antilink.splice(m.chat, 1)
fs.writeFileSync('./megumax/antilink.json', JSON.stringify(antilink))
enviar('✅ Antilink foi desativado')
               } else if (!c) {
sendBimgT(from, `${antil}`, ant, "Tudo bem?", [
{index: 1, quickReplyButton: {displayText: 'off', id: `${prefixo}antilink on`}},
{index: 4, quickReplyButton: {displayText: 'on', id: `${prefixo}antilink on`}}], quejo)}
break

case 'rankgay':
if (!isGroup) return enviar('*Isso parece um grupo animal?*')
try{
d = []
ret = '🏳️‍🌈 Rank dos mais gays\n'
for(i = 0; i < 5; i++) {
r = Math.floor(Math.random() * groupMetadata.participants.length + 0)
ret += `🏳️‍🌈❧ @${groupMembers[r].id.split('@')[0]}\n`
d.push(groupMembers[r].id)
}
mentions(ret, d, true)
} catch (e) {
console.log(e)
enviar('Deu erro, tente novamente :/')
}
break

case 'rankgado': case 'rankgados':
if (!isGroup) return enviar('*Isso parece um grupo animal?*')
try{
d = []
ret = '🐂🐂 Rank dos mais gados do grupo \n'
for(i = 0; i < 5; i++) {
r = Math.floor(Math.random() * groupMetadata.participants.length + 0)
ret += `🐂❧ @${groupMembers[r].id.split('@')[0]}\n`
d.push(groupMembers[r].id)
}
mentions(ret, d, true)
} catch (e) {
console.log(e)
enviar('Deu erro, tente novamente :/')
}
break

case 'rankcorno': case 'rankcornos':
if (!isGroup) return enviar('*Isso parece um grupo animal?*')
membr = []
const corno1 = groupMembers
const corno2 = groupMembers
const corno3 = groupMembers
const corno4 = groupMembers
const corno5 = groupMembers
const cornos1 = corno1[Math.floor(Math.random() * corno1.length)]
const cornos2 = corno2[Math.floor(Math.random() * corno2.length)]
const cornos3 = corno3[Math.floor(Math.random() * corno3.length)]
const cornos4 = corno4[Math.floor(Math.random() * corno4.length)]
const cornos5 = corno5[Math.floor(Math.random() * corno5.length)]
var porcentagemcorno = ["1%", `2%`, `3%`, `4%`, `5%`, `6%`, `7`, `%`, `9%`, `10`, `11%`, `12%`,`13%`, `14%`, `15%`, `16%`, `17%`, `1%`, `19%`, `20%`, `21%`, `22`, `23%`, `24%`, `25%`, `26%`, `27%`, `2%`, `27%`, `2%`, `29%`, `30%`, `31%`, `32%`, `33%`, `34%`, `35%`, `36%`, `37%`, `3%`, `39%`, `40%`, `41%`, `42%`, `43%`, `44%`, `45%`, `46%`, `47%`, `4%`, `49%`, `50%`, `51%`, `52%`, `53%`, `54%`, `55%`, `56%`, `57%`, `5%`, `59%`, `60%`, `61%`, `62%`, `63%`, `64%`, `65%`, `66%`, `67%`, `6%`, `69%`, `70%`, `71%`, `72%`, `73%`, `74%`, `75%`, `76%`, `77%`, `7%`, `79%`, `0%`, `1%`, `2%`, `5%`, `4%`, `5%`, `6%`, `7%`, `%`, `9%`, `90%`, `91%`, `92%`, `93%`, `94%`, `95%`, `96%`, `97%`, `9%`, `99%`, `O chifre desse ai bate na lua ksksksk`]
const porcentagemc = porcentagemcorno[Math.floor(Math.random() * porcentagemcorno.length)]
const porcentag = porcentagemcorno[Math.floor(Math.random() * porcentagemcorno.length)]
const porcent = porcentagemcorno[Math.floor(Math.random() * porcentagemcorno.length)]
const porcl = porcentagemcorno[Math.floor(Math.random() * porcentagemcorno.length)]
const porg = porcentagemcorno[Math.floor(Math.random() * porcentagemcorno.length)]
const prg = porcentagemcorno[Math.floor(Math.random() * porcentagemcorno.length)]
ytb = `
Esses são os cornos do grupo ${groupName}\n@${cornos1.id.split('@')[0]}\nCom uma porcentagem de ${porcent}\n@${cornos2.id.split('@')[0]}\nCom uma porcentagem de ${porcentag}\n@${cornos3.id.split('@')[0]}\nCom uma porcentagem de ${porcl}\n@${cornos4.id.split('@')[0]}\nCom uma porcentagem de ${porg}\n@${cornos5.id.split('@')[0]}\nCom uma porcentagem de ${prg}\n\n⚡ ${setting.NomeBot} ⚡`
membr.push(cornos1.id)
membr.push(cornos2.id)
membr.push(cornos3.id)
membr.push(cornos4.id)
membr.push(cornos5.id)
mentions(ytb, membr, true)
break

case 'rankgostosos': case 'rankgostoso':
if (!isGroup) return enviar('*Isso parece um grupo animal?*')
member = []
const p01 = groupMembers
const p02 = groupMembers
const p03 = groupMembers
const p04 = groupMembers
const p05 = groupMembers
const o01 = p01[Math.floor(Math.random() * p01.length)]
const o02 = p02[Math.floor(Math.random() * p02.length)]
const o03 = p03[Math.floor(Math.random() * p03.length)]
const o04 = p04[Math.floor(Math.random() * p04.length)]
const o05 = p05[Math.floor(Math.random() * p05.length)]
luy = `
Parados!🤚🤚\n\n1=🤚🤭@${o01.id.split('@')[0]}🤚🤭\n\n\n2=🤚🤭@${o02.id.split('@')[0]}🤚🤭\n\n\n3=🤚🤭@${o03.id.split('@')[0]}🤚🤭\n\n\n4=🤚🤭@${o04.id.split('@')[0]}🤚🤭\n\n\n5=🤚🤭@${o05.id.split('@')[0]}🤚🤭\n\n\nMulta por serem gostosos dms😳 pague pena trabalhando em nossa agência de modelos 😊 by: ${NomeDoBot}`
member.push(o01.id)
member.push(o02.id)
member.push(o03.id)
member.push(o04.id)
member.push(o05.id)
mentions(luy, member, true)
break

case 'rankgostosas': case 'rankgostosa':
if (!isGroup) return enviar('*Isso parece um grupo animal?*')
member = []
const p1 = groupMembers
const p2 = groupMembers
const p3 = groupMembers
const p4 = groupMembers
const p5 = groupMembers
const o1 = p1[Math.floor(Math.random() * p1.length)]
const o2 = p2[Math.floor(Math.random() * p2.length)]
const o3 = p3[Math.floor(Math.random() * p3.length)]
const o4 = p4[Math.floor(Math.random() * p4.length)]
const o5 = p5[Math.floor(Math.random() * p5.length)]
luy = `
Paradas!🤚🤚\n\n1=🤚🤭@${o1.id.split('@')[0]}🤚🤭\n\n\n2=🤚🤭@${o2.id.split('@')[0]}🤚🤭\n\n\n3=🤚🤭@${o3.id.split('@')[0]}🤚🤭\n\n\n4=🤚🤭@${o4.id.split('@')[0]}🤚🤭\n\n\n5=🤚🤭@${o5.id.split('@')[0]}🤚🤭\n\n\nMultas por serem gostosas dms😳 pague pena enviando nud no PV do dono😊 by Bot`
member.push(o1.id)
member.push(o2.id)
member.push(o3.id)
member.push(o4.id)
member.push(o5.id)
mentions(luy, member, true)
break

case 'ranknazista':
if (!isGroup) return enviar('*Isso parece um grupo animal?*')
try{
d = []
teks = '💂‍♂️Rank dos mais nazistas do gp\n'
for(i = 0; i < 5; i++) {
r = Math.floor(Math.random() * groupMetadata.participants.length + 0)
teks += `💂‍♂️❧ @${groupMembers[r].id.split('@')[0]}\n`
d.push(groupMembers[r].id)
}
mentions(teks, d, true)
} catch (e) {
console.log(e)
enviar('Deu erro, tente novamente :/')
}
break

case 'rankotakus':
if (!isGroup) return enviar('*Isso parece um grupo animal?*')
membr = []
const otaku1 = groupMembers
const otaku2 = groupMembers
const otaku3 = groupMembers
const otaku4 = groupMembers
const otaku5 = groupMembers
const otaku6 = groupMembers
const otaku7 = groupMembers
const otaku = groupMembers
const otaku9 = groupMembers
const otaku10 = groupMembers
const otakus1 = otaku1[Math.floor(Math.random() * otaku1.length)]
const otakus2 = otaku2[Math.floor(Math.random() * otaku2.length)]
const otakus3 = otaku3[Math.floor(Math.random() * otaku3.length)]
const otakus4 = otaku4[Math.floor(Math.random() * otaku4.length)]
const otakus5 = otaku5[Math.floor(Math.random() * otaku5.length)]
const otakus6 = otaku6[Math.floor(Math.random() * otaku6.length)]
const otakus7 = otaku7[Math.floor(Math.random() * otaku7.length)]
const otakus = otaku[Math.floor(Math.random() * otaku.length)]
const otakus9 = otaku9[Math.floor(Math.random() * otaku9.length)]
const otakus10 = otaku10[Math.floor(Math.random() * otaku10.length)]
ytb = `esses são os otakus fedidos do grupo\n@${otakus1.id.split('@')[0]}\n@${otakus2.id.split('@')[0]}\n@${otakus3.id.split('@')[0]}\n@${otakus4.id.split('@')[0]}\n@${otakus5.id.split('@')[0]}\n@${otakus6.id.split('@')[0]}\n@${otakus7.id.split('@')[0]}\n@${otakus.id.split('@')[0]}\n@${otakus9.id.split('@')[0]}\n@${otakus10.id.split('@')[0]}\n\n⚡ ${setting.NomeDoBot} ⚡`
membr.push(otakus1.id)
membr.push(otakus2.id)
membr.push(otakus3.id)
membr.push(otakus4.id)
membr.push(otakus5.id)
membr.push(otakus6.id)
membr.push(otakus7.id)
membr.push(otakus.id)
membr.push(otakus9.id)
membr.push(otakus10.id)
mentions(ytb, membr, true)
break

case 'rankpau':
if (!isGroup) return enviar('*Isso parece um grupo animal?*')
membr = []
const pauz1 = groupMembers
const pauz2 = groupMembers
const pauz3 = groupMembers
const pauz4 = groupMembers
const pauz5 = groupMembers
const paus1 = pauz1[Math.floor(Math.random() * pauz1.length)]
const paus2 = pauz2[Math.floor(Math.random() * pauz2.length)]
const paus3 = pauz3[Math.floor(Math.random() * pauz3.length)]
const paus4 = pauz4[Math.floor(Math.random() * pauz4.length)]
const paus5 = pauz5[Math.floor(Math.random() * pauz5.length)]
var pcpau1 = ["Minuscúlo", `Pequenino`, `Pequeno`, `Médio`, `Grandinho`, `Grande`, `Grandão`, `Gigante`, `Gigantesco`, `Enorme`, `BATENDO NA LUA`, `QUEIMADO, TÃO GRANDE QUE BATEU NO SOL E QUEIMOU ksksksk`]
var pcpau2 = ["Minuscúlo", `Pequenino`, `Pequeno`, `Médio`, `Grandinho`, `Grande`, `Grandão`, `Gigante`, `Gigantesco`, `Enorme`, `BATENDO NA LUA`, `QUEIMADO, TÃO GRANDE QUE BATEU NO SOL E QUEIMOU ksksksk`]
var pcpau3 = ["Minuscúlo", `Pequenino`, `Pequeno`, `Médio`, `Grandinho`, `Grande`, `Grandão`, `Gigante`, `Gigantesco`, `Enorme`, `BATENDO NA LUA`, `QUEIMADO, TÃO GRANDE QUE BATEU NO SOL E QUEIMOU ksksksk`]
var pcpau4 = ["Minuscúlo", `Pequenino`, `Pequeno`, `Médio`, `Grandinho`, `Grande`, `Grandão`, `Gigante`, `Gigantesco`, `Enorme`, `BATENDO NA LUA`, `QUEIMADO, TÃO GRANDE QUE BATEU NO SOL E QUEIMOU ksksksk`]
var pcpau5 = ["Minuscúlo", `Pequenino`, `Pequeno`, `Médio`, `Grandinho`, `Grande`, `Grandão`, `Gigante`, `Gigantesco`, `Enorme`, `BATENDO NA LUA`, `QUEIMADO, TÃO GRANDE QUE BATEU NO SOL E QUEIMOU ksksksk`]
const pc1 = pcpau1[Math.floor(Math.random() * pcpau1.length)]
const pc2 = pcpau2[Math.floor(Math.random() * pcpau2.length)]
const pc3 = pcpau3[Math.floor(Math.random() * pcpau3.length)]
const pc4 = pcpau4[Math.floor(Math.random() * pcpau4.length)]
const pc5 = pcpau5[Math.floor(Math.random() * pcpau5.length)]
pdr = `Esses são os caras com o menor e maior pau do Grupo\n${groupName}\n\n@${paus1.id.split('@')[0]}\n${pc1}\n@${paus2.id.split('@')[0]}\n${pc2}\n@${paus3.id.split('@')[0]}\n${pc3}\n@${paus4.id.split('@')[0]}\n${pc4}\n@${paus5.id.split('@')[0]}\n${pc5}\n\n ${setting.NomeDoBot}`
membr.push(paus1.id)
membr.push(paus2.id)
membr.push(paus3.id)
membr.push(paus4.id)
membr.push(paus5.id)
mentions(pdr, membr, true)
break 

case 'promover': case 'promote':
if (!isGroup) return enviar('*Isso por acaso e um grupo animal? '-'*')
if (!isGroupAdmins) return enviar('mamaco sem adm 🤠')
if (info.message.extendedTextMessage === undefined || info.message.extendedTextMessage === null) return enviar('Vai colocar o vento como adm???')
mentioned = info.message.extendedTextMessage.contextInfo.mentionedJid[0] ? info.message.extendedTextMessage.contextInfo.mentionedJid[0] : info.message.extendedTextMessage.contextInfo.participant
let responsedm = await megumin.groupParticipantsUpdate(from, [mentioned], 'promote')
if (responsedm[0].status === "200") return enviar('Temos um novo ditador 😏🏳️‍🌈')
else if (responsedm[0].status === "404") return enviar('Esse maluco nem ta no grupo 🤔')
else return enviar('Tenta dnv '-'')
break

case 'ban': case 'kick':
if (!isGroup) return enviar('Isso parece um grupo animal?')
if (!isGroupAdmins) return enviar('mamaco sem adm 🤠')
{
if (info.message.extendedTextMessage === undefined || info.message.extendedTextMessage === null) return enviar('Vai tirar o adm do vento???')
if(info.message.extendedTextMessage.contextInfo.participant !== null && info.message.extendedTextMessage.contextInfo.participant != undefined && info.message.extendedTextMessage.contextInfo.participant !== "") {
mentioned = info.message.extendedTextMessage.contextInfo.mentionedJid[0] ? info.message.extendedTextMessage.contextInfo.mentionedJid[0] : info.message.extendedTextMessage.contextInfo.participant
let responseb = await megumin.groupParticipantsUpdate(from, [mentioned], 'remove')
if (responseb[0].status === "200") return enviar('Tomou ban pq e troxa😏🏳️‍🌈')
else if (responseb[0].status === "406") return enviar('Como vc quer que eu remova o adm supremacy????')
else if (responseb[0].status === "404") return enviar('*Esse maluco nem ta aqui '-'*')
else return enviar('tenta dnv')
} else if (info.message.extendedTextMessage.contextInfo.mentionedJid != null && info.message.extendedTextMessage.contextInfo.mentionedJid != undefined) {
mentioned = info.message.extendedTextMessage.contextInfo.mentionedJid
if(mentioned.length > 1) {
if(mentioned.length > groupMembers.length || mentioned.length === groupMembers.length || mentioned.length > groupMembers.length - 3) return enviar(`Vai arquivar msm??`)
sexocomrato = 0
for (let banned of mentioned) {
await sleep(100)
let responseb2 = await megumin.groupParticipantsUpdate(from, [banned], 'remove')
if (responseb2[0].status === "200") sexocomrato = sexocomrato + 1
}
return enviar('Se ele mandou ta mandado')
} else {
let responseb3 = await megumin.groupParticipantsUpdate(from, [mentioned[0]], 'remove')
if (responseb3[0].status === "200") return enviar('tchau troxa kkkk')
else if (responseb3[0].status === "406") return enviar('Como vc quer que eu remova o adm supremacy????')
else if (responseb3[0].status === "404") return enviar('Cara nem desse grupo e')
else return enviar('Tenta dnv')
}
}
}
break

case 'add': case 'unkick': case 'reviver':
if (!isGroup) return enviar('Um grupo feito de nois 2 que legal')
if (!isGroupAdmins) return enviar('mamaco sem adm 🤠')
if(!q && info.message.extendedTextMessage === null) return enviar('Marque a mensagem do usuario ou o numero dele')
try {
useradd = `${args.join(" ").replace(/\D/g,'')}` ? `${args.join(" ").replace(/\D/g,'')}` : info.message.extendedTextMessage.contextInfo.participant
let id = `${useradd.replace(/\D/g,'')}`
if(!id) return enviar(`Esse numero nao existe`)
let [result] = await megumin.onWhatsApp(id)
if(!result) return enviar(`Esse número não está registrado no WhatsApp`)
let response = await megumin.groupParticipantsUpdate(from, [result.jid], "add")
if(response[0].status == "409") {
return enviar('Esse macaco ja ta aqui')
} else if(response[0].status == "403") {
return enviar('A conta do mamaco e privada')
} else if(response[0].status == "408") {
return enviar('se o cara saiu pq q tu quer add ele???')
} else if(response[0].status == "401") {
return enviar('Bixo me deu block')
} else if(response[0].status == "200") {
return enviar('se tu pediu ta pedido ne')
} else {
enviar("tenta dnv")
}
} catch {
}
break

case 'play':
if (!c) return enviar('texto?');
bla = await fetchJson(`https://api.brizaloka-api.tk/sociais/v2/ytplaymp3?apikey=brizaloka&query=${q}`) 
thumbi = bla.thumb
titulo = bla.titulo
dura = bla.duration
templateButtons = [
{index: 1, quickReplyButton: {displayText: 'Mp3', id: `${prefix}audio ${titulo}`}}, {index: 2, quickReplyButton: {displayText: 'Vid', id: `${prefix}video ${titulo}`}},
]
templateMessage = {
    image: {url: thumbi},
    caption: `*Nome:* ${titulo}\n*Duração:* ${dura}`,
    footer: `Escolha o formato`,
    templateButtons: templateButtons
}

megumin.sendMessage(from, templateMessage)
break

case 'audio': case 'ytaudio':
enviar('*Espere um pouco ja estou mandando seu audio*')
bla = await fetchJson(`https://api.brizaloka-api.tk/sociais/v2/ytplaymp3?apikey=brizaloka&query=${q}`) 
audbla = bla.link_src
megumin.sendMessage(from, { audio: { url: audbla }, mimetype: 'audio/mp4'}, {quoted: quejo})
break

case 'xvideos':
if (!c) return enviar('*Quer pesquisar oq??*');
enviar('*Isso pode demorar um pouco*')
dlk = await fetchJson(`https://api.brizaloka-api.tk/porn/xvideos?apikey=brizaloka&query=${q}`);
Op = dlk.dl_link
megumin.sendMessage(sender, { video: { url: Op }}, {quoted: quejo});   
break

case 'attp':
if (!c) return enviar('*Cade o texto??*');
const bkl = await getBuffer(`https://api.brizaloka-api.tk/ttp/attp1?apikey=brizaloka&text=${q}`);
megumin.sendMessage(from, {sticker: bkl}, {quoted: quejo});
break;

case 'tiktok':
bla = await fetchJson(`https://api.brizaloka-api.tk/sociais/tiktok?apikey=brizaloka&url=${q}`) 
thumbi = bla.imgUrl
titulo = bla.title
templateButtons = [
{index: 1, quickReplyButton: {displayText: 'Vid', id: `${prefix}ttvid ${q}`}}, {index: 2, quickReplyButton: {displayText: 'Mp3', id: `${prefix}ttaudio ${q}`}},
]
templateMessage = {
image: {url: thumbi},
caption: `*Nome:* ${titulo}`,
footer: `Escolha o formato`,
templateButtons: templateButtons
}
megumin.sendMessage(from, templateMessage)
break

case 'ttvid':
enviar('*Isso pode demorar um pouco*')
dlk = await fetchJson(`https://saipulanuar.ga/api/download/tiktok2?url=https://vt.tiktok.com/ZSRG695C8`)
Op = dlk.video.link2
megumin.sendMessage(from, { video: { url: Op }}, {quoted: quejo});   
break

case 'video': case 'ytvideo':
if (!c) return enviar('*Quer pesquisar oq??*');
enviar('*Isso pode demorar um pouco*')
dlk = await fetchJson(`https://api.brizaloka-api.tk/sociais/ytplaymp4?apikey=brizaloka&query=${q}`);
Op = dlk.video
megumin.sendMessage(from, { video: { url: Op }}, {quoted: quejo});   
break

case 'gimage': case 'google': case 'pesquisar':
if (!c) return enviar('texto?');
enviar('*Ja estou enviando seu pedido*')
dlk = await fetchJson(`https://api.brizaloka-api.tk/search/googleimg?apikey=brizaloka&query=${q}`);
Op = dlk.resultados
 bah = Op[Math.floor(Math.random() * Op.length)]
templateButtons = [
{index: 2, quickReplyButton: {displayText: 'Next', id: `${prefix}gimage ${q}`}},
]
templateMessage = {
    image: {url: bah.url},
    caption: `*Resultados Sobre:* ${q}`,
    footer: `Ja bebeu agua hoje?`,
    templateButtons: templateButtons
}
megumin.sendMessage(from, templateMessage)
break

case 'dono': case 'criador':
templateButtons = [
    {index: 1, urlButton: {displayText: 'Donito', url: 'wa.me/556298313456'}},
    {index: 2, quickReplyButton: {displayText: 'Channel', id: `${prefix}channel`}},
]

templateMessage = {
    image:fs.readFileSync('./megumax/edite/pobre.jpg'),
    caption: `
*╭─❒ OWNER*
│◦➛ɴɪᴄᴋ : ${nomeDono}
│◦➛ɴᴜᴍᴇʀᴏ: ${numeroDono}
└────── `,
    footer: `Ele e uma pessoa legal >-<`,
    templateButtons: templateButtons
}

megumin.sendMessage(from, templateMessage)
break

case 'channel': {
enviar(`https://youtube.com/channel/UCa1OCYteddFk7QH0bqlizgw`)
}
break

case 'figurinha': case 's': case 'stickergifp': case 'figura': case 'f': case 'figu': case 'st': case 'stk': case 'fgif':
enviar('*So vou tomar um cafe antes☕*')
{
(async function () {
var meg = q ? q?.split("/")[0] : `${nomeDono}`
var autor = q ? q?.split("/")[1] : q?.split("/")[0] ? '' : `${NomeBot}`	
if (isMedia && !info.message.videoMessage || isQuotedImage) {
var encmedia = isQuotedImage ? info.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage : info.message.imageMessage
rane = getRandom('.'+await getExtension(encmedia.mimetype))
buffimg = await getFileBuffer(encmedia, 'image')
fs.writeFileSync(rane, buffimg)
rano = getRandom('.webp')
exec(`ffmpeg -i ${rane} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 800:800 ${rano}`, (err) => {
fs.unlinkSync(rane)
// "android-app-store-link": "https://play.google.com/store/search?q=%2B55%2094%209147-2796%20%F0%9F%94%A5%F0%9F%94%A5%F0%9F%94%A5%F0%9F%94%A5%F0%9F%94%A5&c=apps",
var json = {
"sticker-pack-name": meg,
"sticker-pack-publisher": NomeBot
}
var exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00])
var jsonBuff = Buffer.from(JSON.stringify(json), "utf-8")
var exif = Buffer.concat([exifAttr, jsonBuff])
exif.writeUIntLE(jsonBuff.length, 14, 4)
let nomemeta = Math.floor(Math.random() * (99999 - 11111 + 1) + 11111)+".temp.exif"
fs.writeFileSync(`./${nomemeta}`, exif) 
exec(`webpmux -set exif ${nomemeta} ${rano} -o ${rano}`, () => {
megumin.sendMessage(from, {sticker: fs.readFileSync(rano)}, {quoted: info})
fs.unlinkSync(nomemeta)
fs.unlinkSync(rano)
})
})
} else if (isMedia && info.message.videoMessage.seconds < 11 || isQuotedVideo && info.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 35) {
var encmedia = isQuotedVideo ? info.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage : info.message.videoMessage
rane = getRandom('.'+await getExtension(encmedia.mimetype))
buffimg = await getFileBuffer(encmedia, 'video')
fs.writeFileSync(rane, buffimg)
rano = getRandom('.webp')
await ffmpeg(`./${rane}`)
.inputFormat(rane.split('.')[1])
exec(`ffmpeg -i ${rane} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 200:200 ${rano}`, (err) => {
fs.unlinkSync(rane)
let json = {
"sticker-pack-name": legenda,
"sticker-pack-publisher": autor
}
let exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00])
let jsonBuff = Buffer.from(JSON.stringify(json), "utf-8")
let exif = Buffer.concat([exifAttr, jsonBuff])
exif.writeUIntLE(jsonBuff.length, 14, 4)
let nomemeta = "temp.exif"
fs.writeFileSync(`./${nomemeta}`, exif) 
exec(`webpmux -set exif ${nomemeta} ${rano} -o ${rano}`, () => {
megumin.sendMessage(from, {sticker: fs.readFileSync(rano)}, {quoted: info})
fs.unlinkSync(nomemeta)
fs.unlinkSync(rano)
})
})
} else {
enviar(`Você precisa enviar ou marcar uma imagem ou vídeo com no máximo 10 segundos`)
}
})().catch(e => {
console.log(e)
enviar("Hmm deu erro")
try {
if (fs.existsSync("temp.exif")) fs.unlinkSync("temp.exif");
if (fs.existsSync(rano)) fs.unlinkSync(rano);
if (fs.existsSync(media)) fs.unlinkSync(media);
} catch {}
})
}
break

default:
if (isCmd){
	const dha = `┌───< ❌ 𝙀𝙧𝙧𝙤 ❌>
*┊User :* ${pushname}
*┊o comando: ${prefix && comando} nao existe man*
*┊Use ${prefix}menu ou clique no botão*
└───< ❌ 𝙀𝙧𝙧𝙤 ❌> `
sendBimgT(from, `${megu}`, dha, "Ja bebeu agua hj?", [
{index: 1, urlButton: {displayText: '⛧ Youtube ⛧', url: 'https://youtube.com/@apenasumsacole8437'}},
{index: 4, quickReplyButton: {displayText: 'menu', id: `${prefixo}menu`}}], quejo)}
return
}
switch(ants){
} 
}
} catch (e) {
console.log(e)
}
})
}
startmegumax()
>>>>>>> 7a56aca635aa0f1105fefca0bc257c46e03b24b3

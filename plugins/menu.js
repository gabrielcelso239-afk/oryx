const fs = require('fs')
const { NomeDoBot, PREFIX, VERSAO, NickDono } = require('../config')
module.exports = {
  name: 'Menu Principal',
  description: 'Mostra todos os comandos do bot',
  command: ['menu', 'help', 'ajuda'],

  async run({ sandro, m }) {

    sandro.sendMessage(
      m.from,
      {
        image: fs.readFileSync('./imagens/menu.jpg'),
caption: `╭───────────
│BOT: ${NomeDoBot}
│PREFIXO: [${PREFIX}]
│Dono: ${NickDono}
│VERSAO: ${VERSAO}
╰───────────
「BASICO」
╭───────────
│${PREFIX}ping
│${PREFIX}perfil
│${PREFIX}s (marcar-img)
│${PREFIX}ddd (31)
│${PREFIX}linkgp
╰───────────
「DOWNLOAD」
╭───────────
│${PREFIX}tiktok (link)
╰───────────
> ${NomeDoBot}`
      },
      {
        quoted: m.raw
      }
    )

  }
}
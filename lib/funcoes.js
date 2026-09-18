function apenasGrupo(m) {

    if (!m.isGroup) {
        m.reply('❌ Este comando só pode ser usado em grupos.')
        return false
    }

    return true
}

function apenasAdm(m) {

    if (!m.isGroupAdmins) {
        m.reply('❌ Apenas administradores podem usar este comando.')
        return false
    }

    return true
}

module.exports = {
    apenasGrupo,
    apenasAdm
}
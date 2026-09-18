module.exports = {
    command: ['ping'],

    async run({ m }) {

        const ram = (
            process.memoryUsage().rss /
            1024 /
            1024
        ).toFixed(2)

        await m.reply(
`> Velocidade: Excelente
> RAM: ${ram} MB
> Status: Online`
        )

    }
}
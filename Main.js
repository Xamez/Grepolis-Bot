
const { Client } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require("fs");

const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES", "GUILD_BANS", "GUILD_MEMBERS"] });

const CHANNELS = {};
let TROUPES = {};
const NAME = ['CE', 'AR', 'HOP', 'CHAR', 'CAV', 'FROND', 'CATA', 'BT', 'BTR', 'BFS', 'BIBI', 'BRULO', 'TRITRI'];
for (let i = 0; i < NAME.length; i++) {
    TROUPES[NAME[i]] = 0;
}

if (fs.existsSync('./troupes.json')) {
    TROUPES = JSON.parse(fs.readFileSync('./troupes.json', 'utf8'));
} else {
    fs.writeFileSync('./troupes.json', JSON.stringify(TROUPES));
}

client.on('ready', () => {
    console.log(`Logged as ${client.user.tag}`);
    client.user.setActivity('Grepolis', { type: 'PLAYING' });
    const guildId = "943232441127153725";
    //const guildId = "743392630079225937";
    const guild = client.guilds.cache.get(guildId);

    let commands;
    if (guild) {
        commands = guild.commands;
    } else {
        commands = client.application?.commands;
    }

    const updateSlashCommand = new SlashCommandBuilder()
        .setName('update')
        .setDescription('Update les troupes')
        .addStringOption(option =>
            option.setName('troupes')
                .setDescription('Type de troupes')
                .setRequired(true)
                .addChoice('CE', 'CE')
                .addChoice('AR', 'AR')
                .addChoice('HOP', 'HOP')
                .addChoice('CHAR', 'CHAR')
                .addChoice('CAV', 'CAV')
                .addChoice('FROND', 'FROND')
                .addChoice('CATA', 'CATA')
                .addChoice('BT', 'BT')
                .addChoice('BTR', 'BTR')
                .addChoice('BFS', 'BFS')
                .addChoice('BIBI', 'BIBI')
                .addChoice('BRULO', 'BRULO')
                .addChoice('TRITRI', 'TRITRI'))
        .addIntegerOption(option =>
            option.setName('nombre')
                .setDescription('Nombre de troupes')
                .setRequired(true));

    commands.create(updateSlashCommand);

    if (!guild.channels.cache.find(channel => channel.name === 'Ressencement')) {
        guild.channels.create('Ressencement', { type: 'GUILD_CATEGORY', position: 1 }).then(category => {
            if (Object.keys(CHANNELS).length === 0) {
                for (let i = 0; i < NAME.length; i++) {
                    guild.channels.create(`${NAME[i]}-0`, {type: 'text', parent: category.id}).then(channel => {
                        CHANNELS[NAME[i]] = channel;
                    });
                }
            }
        });
    }

    guild.channels.cache.forEach(channel => {
        if (channel.type === 'GUILD_TEXT') {
            let channelName = channel.name;
            let parts = channelName.split('-');
            if (parts.length === 2) {
                if (TROUPES[parts[0].toUpperCase()] !== undefined) {
                    CHANNELS[parts[0]] = channel;
                }
            }
        }
    });

});

function updateTroupes(troupe, nombre) {
    TROUPES[troupe] += nombre;
    fs.writeFileSync('./troupes.json', JSON.stringify(TROUPES));
    CHANNELS[troupe.toLowerCase()].setName(`${troupe}-${TROUPES[troupe]}`);
}

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;
    const { commandName, options } = interaction;
    if (commandName === "update") {
        const troupes = options._hoistedOptions[0].value;
        const nombre = options._hoistedOptions[1].value;
        if (TROUPES[troupes] === undefined) {
            interaction.reply({
                content: "Type de troupes invalide",
                ephemeral: true
            });
        } else if (TROUPES[troupes] + nombre < 0) {
            interaction.reply({
                content: "Il ne peut pas y avoir un total de troupes inférieur à 0",
                ephemeral: true
            });
        } else {
            updateTroupes(troupes, nombre);
            interaction.reply({
                content: "Troupes mises à jour !",
                ephemeral: true
            });
        }
    }
});

client.login(process.env.selfToken).catch(() => {
    client.login(process.env.token).catch(() => {
        console.error("Token invalid !");
        process.exit(-1)
    });
});
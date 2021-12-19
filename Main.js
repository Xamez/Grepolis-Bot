const { Client } = require('discord.js');
const request = require('request');
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES", "GUILD_BANS", "GUILD_MEMBERS"] });

client.on('ready', () => {
    console.log(`Logged as ${client.user.tag}`);
    client.user.setActivity('Voter monsieur Zemmour');
});

const prefix = '.';

const phrases = [
    "Ben voyons",
    "Vous êtes un con\nhttps://cdn.discordapp.com/attachments/881963585096523837/921505831911063582/unknown.png",
    "Quand on veut faire plaisir aux médias on fait climats, droit des femmes, une petite pincé de lgbt.",
    "Chapeau bas ! Remarquable coup, remarquable coup, et ces imbéciles tombent dans le panneau",
    "Quel hasard... incroyable hasard !\nhttps://cdn.discordapp.com/attachments/881963585096523837/921505691309572176/unknown.png",
    "Excusez moi d'avoir lu des livres.\nhttps://cdn.discordapp.com/attachments/881963585096523837/921505831911063582/unknown.png",
    "Zemmour: Je les connais un peu mieux que vous les politiques.\nFemme: Je crois pas non\nZemmour: Non mais moi je ne couche pas avec",
    "L'histoire est tragique\nhttps://discord.com/channels/743392630079225937/881963585096523837/921505832095600661",
    "C'est FAUX\nhttps://image.noelshack.com/minis/2017/06/1486939407-111224548787845.png",
    "Mais vous dites vraiment n'importe quoi\nhttps://image.noelshack.com/minis/2016/30/1469539438-zperplexe.png",
    "Vous devriez vous appeler Corinne\nhttps://image.noelshack.com/minis/2016/35/1472827781-1471849431-1465843407-img2.png",
    "Zemmour: Yassine Bellatar n'est pas un humoriste, il fait rire personne.\nYassine: On avait dit pas les mamans\nZemmour: Ah mais votre mère elle a tout mon respect, justement elle rit à vos blagues ! ce qui prouve un sens du sacrifice extraordinaire !"
]

client.on('messageCreate', (message) => {
    if (message.author.id === "558710888304082954") {
        message.delete();
        return;
    }
    if (message.author.bot) return;
    const content = message.content.toLowerCase();
    if (content.includes("ben voyons")) {
        message.channel.send("http://image.noelshack.com/fichiers/2020/42/1/1602493314-84177803-554601158473086-7625756352928808960-n.jpg");
    } else if (content.includes("vegan")) {
        message.guild.members.cache.get(message.author.id).kick("On aime pas les vegans ici.").then(() => {
            message.channel.send("Vegan = :put_litter_in_its_place: (tchao + " + message.author.username + ")");
        }).catch(() => {});
    } else if (content === prefix + "vote") {
        message.channel.send("https://www.zemmour2022.fr/jagis");
    } else if (content === prefix + "generation-z") {
        message.channel.send("https://www.generation-zemmour.fr/");
    } else if (content === prefix + "yt") {
        message.channel.send("https://www.youtube.com/channel/UCjTbZBXEw-gplUAnMXLYHpg")
    } else if (content === prefix + "twitter") {
        message.channel.send("https://twitter.com/zemmoureric")
    } else if (content === prefix + "drole" || content === prefix + "droie") {
        let i = Math.floor(Math.random() * phrases.length);
        message.channel.send(phrases[i]);
    } else if (content === prefix + "nmi" && message.author.id === "272720796391047168") {
        message.channel.send("https://tenor.com/view/salem-no-me-interesa-gato-sabrina-aburrido-gif-10352834");
    } else if (content.includes(prefix + "purge") && message.author.id === "272720796391047168") {
        msgToClear = Number(message.content.split(" ")[1]); // Number of messages to delete
        message.channel.bulkDelete(msgToClear + 1);
    } else if (content === prefix + "covid") {
        message.channel.send("https://tenor.com/view/it-doesnt-actually-exist-derek-muller-veritasium-its-not-real-theres-no-such-thing-gif-19714320");
    } else if (content === prefix + "gotilla") {
        message.channel.send("https://www.twitch.tv/spinigotilla");
    } else if (content === prefix + "amouranth") {
        message.channel.send("https://www.twitch.tv/amouranth");
    } else if (content === prefix + "alexafo") {
        message.channel.send("https://www.twitch.tv/alexafo");
    } else if (content === prefix + "pixel1v9") {
        message.channel.send("https://www.twitch.tv/marexlol");
    } else if (content === prefix + "nft") {
        message.channel.send("Les nft c'est de la merde.");
    } else if (content === prefix + "metaverse") {
        message.channel.send("Va creuver.");
    } else if (content == ".cat") {
        getCat().then(url => { message.channel.send(url) });
    } else if (content === prefix + "nucleaire" || content === prefix + "nucléaire") {
        message.channel.send("Le nucléaire (comme Zemmour) nous sauveras tous !");
    } else if (content === prefix + "éolien" || content === prefix + "eolien" || content === prefix + "eolienne") {
        message.channel.send("Fin frérot, retourne sucez tes callous à l'âge de pierre sale merde, les éoliennes ne produisent pas d'électricité !");
    } else if (content === prefix + "robebou") {
        message.channel.send("https://www.twitch.tv/rhobalas_lol");
    } else if (content.includes(prefix + "gp")) {
        if (message.mentions.users.first()) {
            message.delete();
        }
    } else if (content.includes(prefix + "invite")) {
        message.channel.createInvite({ maxAge: 0 }).then(invite => { message.author.send(invite.url) });
    } else if (content === prefix + "tl-race") {
        message.channel.send("**Tier liste des races**");
        message.channel.send("```" +
            "Top 1 - La race blanches\n" +
            "Top 2 - La race grise\n" +
            "Top 3 - La race noirs\n" +
            "Top 4 - La race chinoise\n" +
            "Top 5 - La race aryenne\n" +
            "```")
    } else if (content === prefix + "about") {
        message.channel.send("Stanislas Rigault est à l'heure actuel la personnage la plus intelligente du monde avec un QI de, tenez-vous bien, 143 ! Ses idées politique sont sans doutes les meilleures (nulle doute possible).");
    } else if (content === prefix + "help") {
        message.channel.send("```" +
            "Ben voyons\n" +
            "Je suis vegan\n" +
            prefix + "vote\n" +
            prefix + "generation-Z\n" +
            prefix + "yt\n" +
            prefix + "twitter\n" +
            prefix + "cat\n" +
            prefix + "drole\n" +
            prefix + "covid\n" +
            prefix + "gotilla\n" +
            prefix + "amouranth\n" +
            prefix + "pixel1v9\n" +
            prefix + "alexafo\n" +
            prefix + "robebou\n" +
            prefix + "nft\n" +
            prefix + "eolien\n" +
            prefix + "nucléaire\n" +
            prefix + "metaverse\n" +
            prefix + "tl-race\n" +
            prefix + "about\n" +
            prefix + "nmi (que pour le magnifique Zemmourien)\n" +
            prefix + "purge <nombre> (que pour le magnifique Zemmourien)```"
        );
    }
});

function getCat() {
    return new Promise((resolve, reject) => {
        request('https://aws.random.cat/meow', (error, response, body) => {
            if (error) {
                reject(error);
            } else {
                resolve(JSON.parse(body).file);
            }
        });
    });
}

client.login(process.env.selfToken).catch(() => {
    //client.login(selfToken).catch(() => {
    console.error("Token invalid !");
    process.exit(-1)
})
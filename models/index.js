const dbConfig = require("../db.config.js");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.users = require("./user.model.js")(mongoose);
db.avis = require("./avis.model.js")(mongoose);
db.anime = require("./anime.model.js")(mongoose);

// Création d'animé lors du lancement du projet
db.anime.create({
    type: "anime",
    title: "Cowboy Bebop",
    synopsis: "In the year 2071, humanity has colonized several of the planets and moons of the solar system leaving the now uninhabitable surface of planet Earth behind. The Inter Solar System Police attempts to keep peace in the galaxy, aided in part by outlaw bounty hunters, referred to as \"Cowboys\". The ragtag team aboard the spaceship Bebop are two such individuals.\nMellow and carefree Spike Spiegel is balanced by his boisterous, pragmatic partner Jet Black as the pair makes a living chasing bounties and collecting rewards. Thrown off course by the addition of new members that they meet in their travels—Ein, a genetically engineered, highly intelligent Welsh Corgi; femme fatale Faye Valentine, an enigmatic trickster with memory loss; and the strange computer whiz kid Edward Wong—the crew embarks on thrilling adventures that unravel each member's dark and mysterious past little by little. \nWell-balanced with high density action and light-hearted comedy, Cowboy Bebop is a space Western classic and an homage to the smooth and improvised music it is named after.\n\n(Source: MAL Rewrite)",
    description: "In the year 2071, humanity has colonized several of the planets and moons of the solar system leaving the now uninhabitable surface of planet Earth behind. The Inter Solar System Police attempts to keep peace in the galaxy, aided in part by outlaw bounty hunters, referred to as \"Cowboys\". The ragtag team aboard the spaceship Bebop are two such individuals.\nMellow and carefree Spike Spiegel is balanced by his boisterous, pragmatic partner Jet Black as the pair makes a living chasing bounties and collecting rewards. Thrown off course by the addition of new members that they meet in their travels—Ein, a genetically engineered, highly intelligent Welsh Corgi; femme fatale Faye Valentine, an enigmatic trickster with memory loss; and the strange computer whiz kid Edward Wong—the crew embarks on thrilling adventures that unravel each member's dark and mysterious past little by little. \nWell-balanced with high density action and light-hearted comedy, Cowboy Bebop is a space Western classic and an homage to the smooth and improvised music it is named after.\n\n(Source: MAL Rewrite)",
    status: "fini",
    imgTiny: "https://media.kitsu.io/anime/poster_images/1/tiny.jpg",
    imgSmall: "https://media.kitsu.io/anime/poster_images/1/small.jpg",
    imgMedium: "https://media.kitsu.io/anime/poster_images/1/medium.jpg",
    widthImgTiny: 110,
    heightImgTiny: 156,
    widthImgSmall: 284,
    heightImgSmall: 402,
    widthImgMedium: 390,
    heightImgMedium: 554,
    episodeCount: 26,
});

db.anime.create({
    type: "anime",
    title: "Cowboy Bebop: The Movie",
    synopsis: "Another day, another bounty—such is the life of the often unlucky crew of the Bebop. However, this routine is interrupted when Faye, who is chasing a fairly worthless target on Mars, witnesses an oil tanker suddenly explode, causing mass hysteria. As casualties mount due to a strange disease spreading through the smoke from the blast, a whopping three hundred million woolong price is placed on the head of the supposed perpetrator.\nWith lives at stake and a solution to their money problems in sight, the Bebop crew springs into action. Spike, Jet, Faye, and Edward, followed closely by Ein, split up to pursue different leads across Alba City. Through their individual investigations, they discover a cover-up scheme involving a pharmaceutical company, revealing a plot that reaches much further than the ragtag team of bounty hunters could have realized.\n[Written by MAL Rewrite]",
    description: "Another day, another bounty—such is the life of the often unlucky crew of the Bebop. However, this routine is interrupted when Faye, who is chasing a fairly worthless target on Mars, witnesses an oil tanker suddenly explode, causing mass hysteria. As casualties mount due to a strange disease spreading through the smoke from the blast, a whopping three hundred million woolong price is placed on the head of the supposed perpetrator.\nWith lives at stake and a solution to their money problems in sight, the Bebop crew springs into action. Spike, Jet, Faye, and Edward, followed closely by Ein, split up to pursue different leads across Alba City. Through their individual investigations, they discover a cover-up scheme involving a pharmaceutical company, revealing a plot that reaches much further than the ragtag team of bounty hunters could have realized.\n[Written by MAL Rewrite]",
    status: "fini",
    imgTiny: "https://media.kitsu.io/anime/poster_images/2/tiny.jpg",
    imgSmall: "https://media.kitsu.io/anime/poster_images/2/small.jpg",
    imgMedium: "https://media.kitsu.io/anime/poster_images/2/medium.jpg",
    widthImgTiny: 110,
    heightImgTiny: 156,
    widthImgSmall: 284,
    heightImgSmall: 402,
    widthImgMedium: 390,
    heightImgMedium: 554,
    episodeCount: 1,
});

db.anime.create({
    type: "anime",
    title: "Trigun",
    synopsis: "Vash the Stampede is the man with a $$60,000,000 bounty on his head. The reason: he's a merciless villain who lays waste to all those that oppose him and flattens entire cities for fun, garnering him the title \"The Humanoid Typhoon.\" He leaves a trail of death and destruction wherever he goes, and anyone can count themselves dead if they so much as make eye contact—or so the rumors say. In actuality, Vash is a huge softie who claims to have never taken a life and avoids violence at all costs.\nWith his crazy doughnut obsession and buffoonish attitude in tow, Vash traverses the wasteland of the planet Gunsmoke, all the while followed by two insurance agents, Meryl Stryfe and Milly Thompson, who attempt to minimize his impact on the public. But soon, their misadventures evolve into life-or-death situations as a group of legendary assassins are summoned to bring about suffering to the trio. Vash's agonizing past will be unraveled and his morality and principles pushed to the breaking point.\n[Written by MAL Rewrite]",
    description: "Vash the Stampede is the man with a $$60,000,000 bounty on his head. The reason: he's a merciless villain who lays waste to all those that oppose him and flattens entire cities for fun, garnering him the title \"The Humanoid Typhoon.\" He leaves a trail of death and destruction wherever he goes, and anyone can count themselves dead if they so much as make eye contact—or so the rumors say. In actuality, Vash is a huge softie who claims to have never taken a life and avoids violence at all costs.\nWith his crazy doughnut obsession and buffoonish attitude in tow, Vash traverses the wasteland of the planet Gunsmoke, all the while followed by two insurance agents, Meryl Stryfe and Milly Thompson, who attempt to minimize his impact on the public. But soon, their misadventures evolve into life-or-death situations as a group of legendary assassins are summoned to bring about suffering to the trio. Vash's agonizing past will be unraveled and his morality and principles pushed to the breaking point.\n[Written by MAL Rewrite]",
    status: "finis",
    imgTiny: "https://media.kitsu.io/anime/poster_images/3/tiny.jpg",
    imgSmall: "https://media.kitsu.io/anime/poster_images/3/small.jpg",
    imgMedium: "https://media.kitsu.io/anime/poster_images/3/medium.jpg",
    widthImgTiny: 110,
    heightImgTiny: 156,
    widthImgSmall: 284,
    heightImgSmall: 402,
    widthImgMedium: 390,
    heightImgMedium: 554,
    episodeCount: 26,
});



// db.anime.create({
//     type: "",
//     title: "",
//     synopsis: "",
//     description: "",
//     status: "",
//     imgTiny: "",
//     imgSmall: "",
//     imgMedium: "",
//     widthImgTiny: 110,
//     heightImgTiny: 156,
//     widthImgSmall: 284,
//     heightImgSmall: 402,
//     widthImgMedium: 390,
//     heightImgMedium: 554,
//     episodeCount: 0,
// });


module.exports = db;
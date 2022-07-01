require("dotenv").config({ path: "./.env" });
const request = require("supertest");
const app = require("../app");
const db = require("../models");

const BearerToken = process.env.TOKEN_BEARER;

const animeIdGET = process.env.ANIME_ID_TEST;
const animeIdPUT = process.env.ANIME_ID_TEST_PUT;
const animeIdWrong = process.env.ANIME_ID_WRONG_TEST;
const animeIdWrongDelete = process.env.ANIME_ID_WRONG_DELETE_TEST;
const animeIdDelete = process.env.ANIME_ID_DELETE_TEST;
const BearerModo = process.env.BEARER_MODO;
const animeIdNotFind = "aaaaaaaaaaaaaaaaaaaaaaaa";

describe("avis", () => {
    //connection à mongo
    beforeEach(()=>{
        db.mongoose
        .connect(db.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    })

    afterAll(() => db.mongoose.connection.close());

    it("GET /anime", async () => {
        const res = await request(app)
            .get("/anime")
            .set('Authorization', `Bearer ${BearerToken}`)
            .expect(200)
            .expect("content-type", /json/);
    })

    it("GET /anime error", async () => {
        const res = await request(app)
            .get("/animeError")
            .set('Authorization', `Bearer ${BearerToken}`)
            .expect(404);
    })

    it("GET /anime : sans être identifié", async () => {
        const res = await request(app)
            .get("/anime")
            .expect(401);
    })
    
    it("POST /anime", async () => {
        let insertion = {
            type: "anime",
            title: "Trigun 222",
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
            episodeCount: 26
        }

        const res = await request(app)
            .post("/anime")
            .set('Authorization', `Bearer ${BearerModo}`)
            .send(insertion)
            .expect(200)
            .expect("content-type", /json/);
    })

    it.only("POST /anime Error : ne pas avoir les droits du modo", async () => {
        let insertion = {
            type: "anime",
            title: "Trigun 222",
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
            episodeCount: 26
        }

        const res = await request(app)
            .post("/anime")
            .set('Authorization', `Bearer ${BearerToken}`)
            .send(insertion)
            .expect(401)
            .expect("content-type", /json/);
    })

    it("POST /anime error: manque le type id dans body", async () => {
        let insertion = {
            title: "Trigun 222",
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
            episodeCount: 26
        }

        const res = await request(app)
            .post("/anime")
            .set('Authorization', `Bearer ${BearerModo}`)
            .send(insertion)
            .expect(400)
            .expect("content-type", /json/);
    })

    it("POST /anime Error : ne pas être connecté", async () => {
        let insertion = {
            type: "anime",
            title: "Trigun 222",
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
            episodeCount: 26
        }

        const res = await request(app)
            .post("/anime")
            .send(insertion)
            .expect(401)
            .expect("content-type", /json/);        
    })

    it("GET /anime/:id", async () => {
        const res = await request(app)
            .get("/anime/"+ animeIdGET)
            .set('Authorization', `Bearer ${BearerToken}`)
            .expect(200)
            .expect("content-type", /json/);
    })

    it("GET /anime/:id Error : Not found anime with id ...", async () => {
        const res = await request(app)
            .get("/anime/"+ animeIdNotFind)
            .set('Authorization', `Bearer ${BearerToken}`)
            .expect(404)
            .expect("content-type", /json/);
    })

    it("GET /anime/:id error: mettre un id innexistant", async () => {
        const res = await request(app)
            .get("/anime/" + animeIdWrong)
            .set('Authorization', `Bearer ${BearerToken}`)
            .expect(500)
            .expect("content-type", /json/);
    })

    it("GET /anime/:id Error : ne pas être connecté", async () => {
        const res = await request(app)
            .get("/anime/"+ animeIdGET)
            .expect(401)
            .expect("content-type", /json/);
    })

    it("PUT /anime/:id", async () => {
        let insertion = {
            type: "anime",
            title: "Trigun 2225555",
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
            episodeCount: 26
        }

        const res = await request(app)
            .put("/anime/"+ animeIdPUT)
            .set('Authorization', `Bearer ${BearerModo}`)
            .send(insertion)
            .expect(200)
            .expect("content-type", /json/);
    })

    it("PUT /anime/:id error: manque le type dans le body", async () => {
        let insertion = {
            title: "Trigun 2225555",
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
            episodeCount: 26
        }


        const res = await request(app)
            .put("/anime/"+ animeIdPUT)
            .set('Authorization', `Bearer ${BearerModo}`)
            .send(insertion)
            .expect(400)
            .expect("content-type", /json/);
        
        // expect(request(app).get('/avis/'+id)).toMatchObject(insertion);
    })

    it("PUT /anime/:id Error : ne pas être connecté", async () => {
        let insertion = {
            type: "anime",
            title: "Trigun 2225555",
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
            episodeCount: 26
        }


        const res = await request(app)
            .put("/anime/"+ animeIdPUT)
            .send(insertion)
            .expect(401)
            .expect("content-type", /json/);        
    })

    it("PUT /anime/:id Error : ne pas avoir les droits du modo", async () => {
        let insertion = {
            type: "anime",
            title: "Trigun 2225555",
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
            episodeCount: 26
        }


        const res = await request(app)
            .put("/anime/"+ animeIdPUT)
            .set('Authorization', `Bearer ${BearerToken}`)
            .send(insertion)
            .expect(401)
            .expect("content-type", /json/);        
    })

    it("DELETE /anime/:id ", async () => {
        const res = await request(app)
            .delete("/anime/"+ animeIdDelete)
            .set('Authorization', `Bearer ${BearerModo}`)
            .expect(200)
            .expect("content-type", /json/);
    })

    it("DELETE /anime/:id ", async () => {
        const res = await request(app)
            .delete("/anime/"+ animeIdNotFind)
            .set('Authorization', `Bearer ${BearerModo}`)
            .expect(404)
            .expect("content-type", /json/);
    })

    it("DELETE /anime/:id error: id avis innexistant", async () => {
        const res = await request(app)
            .delete("/avis/"+ animeIdWrongDelete)
            .set('Authorization', `Bearer ${BearerModo}`)
            .expect(500)
            .expect("content-type", /json/);
    })

    it("DELETE /anime/:id Error : ne pas être connecté", async () => {
        const res = await request(app)
            .delete("/anime/"+ animeIdDelete)
            .expect(401)
            .expect("content-type", /json/);        
    })

    it("DELETE /anime/:id Error : ne pas avoir les droits du modo", async () => {
        const res = await request(app)
            .delete("/anime/"+ animeIdDelete)
            .set('Authorization', `Bearer ${BearerToken}`)
            .expect(401)
            .expect("content-type", /json/);
    })

})
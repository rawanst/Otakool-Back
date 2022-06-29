require("dotenv").config({ path: "./.env" });
const request = require("supertest");
const app = require("../app");
const db = require("../models");

const avisId = process.env.AVIS_ID_TEST;
const avisIsWrong = 0;

describe("avis", () => {
    beforeEach(()=>{
        db.mongoose
        .connect(db.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    })

    afterAll(() => db.mongoose.connection.close());

    it("GET /avis", async () => {
        const res = await request(app)
            .get("/avis")
            .expect(200)
            .expect("content-type", /json/);
    })

    it("GET /avis error", async () => {
        const res = await request(app)
            .get("/avisError")
            .expect(404);
    })

    it("POST /avis", async () => {
        let insertion = {
            user: "62bc4d32039bbf0bc32edd45",
            anime: 2,
            note: 3,
            commentaire: "test"
        }

        const res = await request(app)
            .post("/avis")
            .send(insertion)
            .expect(200)
            .expect("content-type", /json/);
        
        // expect(request(app).get('/avis/'+id)).toMatchObject(insertion);
    })

    it("POST /avis error: manque le user id dans body", async () => {
        let insertion = {
            anime: 2,
            note: 3,
            commentaire: "test"
        }

        const res = await request(app)
            .post("/avis")
            .send(insertion)
            .expect(400)
            .expect("content-type", /json/);
        
        // expect(request(app).get('/avis/'+id)).toMatchObject(insertion);
    })
    
    it("GET /avis/:id", async () => {
        const res = await request(app)
            .get("/avis/"+ avisId)
            .expect(200)
            .expect("content-type", /json/);
    })

    it("GET /avis/:id error: mettre un id innexistant", async () => {
        const res = await request(app)
            .get("/avis/" + avisIsWrong)
            .expect(500)
            .expect("content-type", /json/);
    })

    it("PUT /avis/:id", async () => {
        let insertion = {
            "user": "62bc4d73039bbf0bc32edd47",
            "anime": 2,
            "note": 3,
            "commentaire": "test test test jest"
        }

        const res = await request(app)
            .put("/avis/"+ avisId)
            .send(insertion)
            .expect(200)
            .expect("content-type", /json/);
        
        // expect(request(app).get('/avis/'+id)).toMatchObject(insertion);
    })

    it("PUT /avis/:id error: manque la note dans le body", async () => {
        let insertion = {
            "user": "62bc4d73039bbf0bc32edd47",
            "anime": 2,
            "commentaire": "test test test jest"
        }

        const res = await request(app)
            .put("/avis/"+ avisId)
            .send(insertion)
            .expect(400)
            .expect("content-type", /json/);
        
        // expect(request(app).get('/avis/'+id)).toMatchObject(insertion);
    })

    it("DELETE /avis/:id ", async () => {
        const res = await request(app)
            .delete("/avis/"+ avisId)
            .expect(200)
            .expect("content-type", /json/);
        
        // expect(request(app).get('/avis/'+id)).toMatchObject(insertion);
    })

    it("DELETE /avis/:id error: id avis innexistant", async () => {
        const res = await request(app)
            .delete("/avis/"+ avisIsWrong)
            .expect(500)
            .expect("content-type", /json/);
    })

});
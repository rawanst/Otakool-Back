require("dotenv").config({ path: "./.env" });
const request = require("supertest");
const app = require("../app");
const db = require("../models");

const avisIdGET = process.env.AVIS_ID_GET_TEST;
const avisIdPUT = process.env.AVIS_ID_PUT_TEST;
const avisIdDELETE = process.env.AVIS_ID_DELETE_TEST;
const avisIsWrong = 0;
const BearerToken = process.env.TOKEN_BEARER;

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
            .set('Authorization', `Bearer ${BearerToken}`)
            .expect(200)
            .expect("content-type", /json/);
    })

    it("GET /avis error", async () => {
        const res = await request(app)
            .get("/avisError")
            .set('Authorization', `Bearer ${BearerToken}`)
            .expect(404);
    })

    it("GET /avis error Unauthorized", async () => {
        const res = await request(app)
            .get("/avis")
            .expect(401);
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
            .set('Authorization', `Bearer ${BearerToken}`)
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
            .set('Authorization', `Bearer ${BearerToken}`)
            .send(insertion)
            .expect(400)
            .expect("content-type", /json/);
        
        // expect(request(app).get('/avis/'+id)).toMatchObject(insertion);
    })

    it("POST /avis Error Unauthorized", async () => {
        let insertion = {
            user: "62bc4d32039bbf0bc32edd45",
            anime: 2,
            note: 3,
            commentaire: "test"
        }

        const res = await request(app)
            .post("/avis")
            .send(insertion)
            .expect(401)
            .expect("content-type", /json/);        
    })
    
    it("GET /avis/:id", async () => {
        const res = await request(app)
            .get("/avis/"+ avisIdGET)
            .set('Authorization', `Bearer ${BearerToken}`)
            .expect(200)
            .expect("content-type", /json/);
    })

    it("GET /avis/:id error: mettre un id innexistant", async () => {
        const res = await request(app)
            .get("/avis/" + avisIsWrong)
            .set('Authorization', `Bearer ${BearerToken}`)
            .expect(500)
            .expect("content-type", /json/);
    })

    it("GET /avis/:id Error Unauthorized", async () => {
        const res = await request(app)
            .get("/avis/"+ avisIdGET)
            .expect(401)
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
            .put("/avis/"+ avisIdPUT)
            .set('Authorization', `Bearer ${BearerToken}`)
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
            .put("/avis/"+ avisIdPUT)
            .set('Authorization', `Bearer ${BearerToken}`)
            .send(insertion)
            .expect(400)
            .expect("content-type", /json/);
        
        // expect(request(app).get('/avis/'+id)).toMatchObject(insertion);
    })

    it("PUT /avis/:id Error Unauthorized", async () => {
        let insertion = {
            "user": "62bc4d73039bbf0bc32edd47",
            "anime": 2,
            "note": 3,
            "commentaire": "test test test jest"
        }

        const res = await request(app)
            .put("/avis/"+ avisIdPUT)
            .send(insertion)
            .expect(401)
            .expect("content-type", /json/);        
    })

    it("DELETE /avis/:id ", async () => {
        const res = await request(app)
            .delete("/avis/"+ avisIdDELETE)
            .set('Authorization', `Bearer ${BearerToken}`)
            .expect(200)
            .expect("content-type", /json/);
        
        // expect(request(app).get('/avis/'+id)).toMatchObject(insertion);
    })

    it("DELETE /avis/:id error: id avis innexistant", async () => {
        const res = await request(app)
            .delete("/avis/"+ avisIsWrong)
            .set('Authorization', `Bearer ${BearerToken}`)
            .expect(500)
            .expect("content-type", /json/);
    })

    it("DELETE /avis/:id Error Unauthorized", async () => {
        const res = await request(app)
            .delete("/avis/"+ avisIdDELETE)
            .expect(401)
            .expect("content-type", /json/);        
    })

});
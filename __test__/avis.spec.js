require("dotenv").config({ path: "./.env" });
const request = require("supertest");
const app = require("../app");
const db = require("../models");

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
    
});
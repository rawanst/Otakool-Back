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
    
});
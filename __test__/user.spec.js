require("dotenv").config({ path: "./.env" });
const request = require("supertest");
const app = require("../app");
const db = require("../models");

describe("user", () => {
    beforeEach(()=>{
        db.mongoose
        .connect(db.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    })

    afterAll(() => db.mongoose.connection.close());

    it("Route GET /user", async () => {
        const res = await request(app)
            .get("/user")
            .expect(200)
            .expect("content-type", /json/);
    })

    it("Route GET /user error", async () => {
        const res = await request(app)
            .get("/userError")
            .expect(404);
    })

    it("Route POST /user", async () => {
        let insertion = {
            pseudo: "rawan",
            email: "rawan@gmail.com",
            password: "rawan",
            is_moderateur: true
        }

        const res = await request(app)
            .post("/user")
            .send(insertion)
            .expect(200)
            .expect("content-type", /json/);
        
        // expect(request(app).get('/avis/'+id)).toMatchObject(insertion);
    })

    it("Route POST /user error : delete password", async () => {
        let insertion = {
            pseudo: "rawan",
            email: "rawan@gmail.com",
            is_moderateur: true
        }

        const res = await request(app)
            .post("/user")
            .send(insertion)
            .expect(400)
            .expect("content-type", /json/);
        
        // expect(request(app).get('/avis/'+id)).toMatchObject(insertion);
    })


});
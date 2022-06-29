require("dotenv").config({ path: "./.env" });
const request = require("supertest");
const app = require("../app");
const db = require("../models");

const userId = process.env.USER_ID_TEST;
const userIdWrong = process.env.USER_ID_WRONG_TEST;

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

    it("Route GET /user/:id", async () => {
        const res = await request(app)
            .get("/user/"+ userId)
            .expect(200)
            .expect("content-type", /json/);
    })

    it("Route GET /user/:id error : bad id", async () => {
        const res = await request(app)
            .get("/user/"+ userIdWrong)
            .expect(500)
            .expect("content-type", /json/);
    })

    it("Route PUT /user/:id", async () => {
        let insertion = {
            pseudo: "rawan changement",
            email: "rawan@gmail.com",
            password: "rawan",
            is_moderateur: true
        }

        const res = await request(app)
            .put("/user/"+ userId)
            .send(insertion)
            .expect(200)
            .expect("content-type", /json/);
        
        // expect(request(app).get('/avis/'+id)).toMatchObject(insertion);
    })

    it("Route PUT /user/:id error : email is empty", async () => {
        let insertion = {
            pseudo: "rawan changement",
            email: "",
            password: "rawan",
            is_moderateur: true
        }

        const res = await request(app)
            .put("/user/"+ userId)
            .send(insertion)
            .expect(400)
            .expect("content-type", /json/);
        
        // expect(request(app).get('/avis/'+id)).toMatchObject(insertion);
    })


});
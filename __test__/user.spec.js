require("dotenv").config({ path: "./.env" });
const request = require("supertest");
const app = require("../app");
const db = require("../models");

const userIdGET = process.env.USER_ID_GET_TEST;
const userIdPUT = process.env.USER_ID_PUT_TEST;
const userIdWrong = process.env.USER_ID_WRONG_TEST;
const userIdWrongDelete = process.env.USER_ID_WRONG_DELETE_TEST;
const userIdDelete = process.env.USER_ID_DELETE_TEST;
const BearerToken = process.env.TOKEN_BEARER;
const userIdNotFind = "aaaaaaaaaaaaaaaaaaaaaaaa";

describe("user", () => {

    //connection mongoose
    beforeEach(()=>{
        db.mongoose
        .connect(db.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    })

    afterAll(() => db.mongoose.connection.close());

    it("Route GET /user", async () => {
        await request(app)
            .get("/user")
            .set('Authorization', `Bearer ${BearerToken}`)
            .expect(200)
            .expect("content-type", /json/);
    })

    it("Route GET /user error", async () => {
        const res = await request(app)
            .get("/userError")
            .set('Authorization', `Bearer ${BearerToken}`)
            .expect(404);
    })

    it("Route GET /user Error Unauthorized", async () => {
        const res = await request(app)
            .get("/user")
            .expect(401)
            .expect("content-type", /json/);
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
            .set('Authorization', `Bearer ${BearerToken}`)
            .send(insertion)
            .expect(200)
            .expect("content-type", /json/);        
    })

    it("Route POST /user/login", async () => {
        let insertion = {
            email: "alexandre@gmail.com",
            password: "alexandre",
        }

        const res = await request(app)
            .post("/user/login")
            .set('Authorization', `Bearer ${BearerToken}`)
            .send(insertion)
            .expect(200)
            .expect("content-type", /json/);        
    })

    it("Route POST /user/login : error password", async () => {
        let insertion = {
            email: "alexandre@gmail.com",
            password: "alexandreError",
        }

        const res = await request(app)
            .post("/user/login")
            .set('Authorization', `Bearer ${BearerToken}`)
            .send(insertion)
            .expect(401)
            .expect("content-type", /json/);        
    })

    it("Route POST /user/login : error account isn't found", async () => {
        let insertion = {
            email: "alexandre@gmail.comError",
            password: "alexandre",
        }

        const res = await request(app)
            .post("/user/login")
            .set('Authorization', `Bearer ${BearerToken}`)
            .send(insertion)
            .expect(401)
            .expect("content-type", /json/);        
    })

    it("Route POST /user error : delete password", async () => {
        let insertion = {
            pseudo: "rawan",
            email: "rawan@gmail.com",
            is_moderateur: true
        }

        const res = await request(app)
            .post("/user")
            .set('Authorization', `Bearer ${BearerToken}`)
            .send(insertion)
            .expect(400)
            .expect("content-type", /json/);        
    })

    it("Route GET /user/:id", async () => {
        const res = await request(app)
            .get("/user/"+ userIdGET)
            .set('Authorization', `Bearer ${BearerToken}`)
            .expect(200)
            .expect("content-type", /json/);
    })

    it("Route GET /user/:id error : bad id", async () => {
        const res = await request(app)
            .get("/user/"+ userIdWrong)
            .set('Authorization', `Bearer ${BearerToken}`)
            .expect(500)
            .expect("content-type", /json/);
    })

    it("Route GET /user/:id error : not found user with id", async () => {
        const res = await request(app)
            .get("/user/"+ userIdNotFind)
            .set('Authorization', `Bearer ${BearerToken}`)
            .expect(404)
            .expect("content-type", /json/);
    })

    it("Route GET /user/:id Error unauthorized", async () => {
        const res = await request(app)
            .get("/user/"+ userIdGET)
            .expect(401)
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
            .put("/user/"+ userIdPUT)
            .set('Authorization', `Bearer ${BearerToken}`)
            .send(insertion)
            .expect(200)
            .expect("content-type", /json/);        
    })

    it("Route PUT /user/:id error : Data to update can not be empty", async () => {
        let insertion = {
            pseudo: "rawan changement",
            email: "",
            password: "rawan",
            is_moderateur: true
        }

        const res = await request(app)
            .put("/user/"+ userIdPUT)
            .set('Authorization', `Bearer ${BearerToken}`)
            .send(insertion)
            .expect(400)
            .expect("content-type", /json/);
        
        // expect(request(app).get('/avis/'+id)).toMatchObject(insertion);
    })

    it("Route PUT /user/:id error : Data to update can not be empty", async () => {
        let insertion = {
            pseudo: "rawan changement",
            email: "test@email.com",
            password: "rawan",
            is_moderateur: true
        }

        const res = await request(app)
            .put("/user/"+ userIdNotFind)
            .set('Authorization', `Bearer ${BearerToken}`)
            .send(insertion)
            .expect(404)
            .expect("content-type", /json/);
        
        // expect(request(app).get('/avis/'+id)).toMatchObject(insertion);
    })

    it("Route PUT /user/:id Error Unauthorized", async () => {
        let insertion = {
            pseudo: "rawan changement",
            email: "rawan@gmail.com",
            password: "rawan",
            is_moderateur: true
        }

        const res = await request(app)
            .put("/user/"+ userIdPUT)
            .send(insertion)
            .expect(401)
            .expect("content-type", /json/);        
    })

    it("Route DELETE /user/:id", async () => {
        const res = await request(app)
            .delete("/user/" + userIdDelete)
            .set('Authorization', `Bearer ${BearerToken}`)
            .expect(200)
    })

    it("Route DELETE /user/:id error : userId is wrong", async () => {
        const res = await request(app)
            .delete("/user/" + userIdWrongDelete)
            .set('Authorization', `Bearer ${BearerToken}`)
            .expect(500)
    })

    it("Route DELETE /user/:id Error Unauthorized", async () => {
        const res = await request(app)
            .delete("/user/" + userIdDelete)
            .expect(401)
    })


});
import chai from "chai";
import { expect } from "chai";
import chaiHttp from "chai-http";
import server from "../../src/index.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

chai.use(chaiHttp);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe("Should verifies the signin flow", () => {
  let singupBody;
  beforeEach((done) => {
    singupBody = {
      name: "test name",
      email: "test12345@gmail.com",
      password: "test1234",
      preferences: {
        categories: [],
      },
    };
    done();
  });

  afterEach((done) => {
    fs.writeFileSync(
      path.join(__dirname, "..", "..", "src", "data_test.json"),
      JSON.stringify({ usersList: [] }),
      {
        encoding: "utf-8",
        flag: "w",
      }
    );
    done();
  });

  it("should be successful signin", (done) => {
    chai
      .request(server)
      .post("/register")
      .send(singupBody)
      .end((err, res) => {
        let signInBody = {
          email: "test12345@gmail.com",
          password: "test1234",
        };
        chai
          .request(server)
          .post("/login")
          .send(signInBody)
          .end((err, res) => {
            expect(res.status).equal(200);
            expect(res.body.email).equal("test12345@gmail.com");
            expect(res.body.name).equal("test name");
            expect(res.body).to.have.property("accessToken");
            done();
          });
      });
  });

  it("should validate not registered email", (done) => {
    let signInBody = {
      email: "test@gmail.com",
      password: "test1234",
    };
    chai
      .request(server)
      .post("/login")
      .send(signInBody)
      .end((err, res) => {
        expect(res.status).equal(400);
        expect(res.body.message).equal("Email is not registered");
        done();
      });
  });

  it("should validate invailed password", (done) => {
    let signInBody = {
      email: "test12345@gmail.com",
      password: "test1239",
    };
    chai
      .request(server)
      .post("/login")
      .send(signInBody)
      .end((err, res) => {
        expect(res.status).equal(400);
        expect(res.body.message).equal("Invailed Password");
        done();
      });
  });
});

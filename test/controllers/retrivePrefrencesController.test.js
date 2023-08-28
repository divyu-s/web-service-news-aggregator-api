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

describe("Should verifies retrive prefrences flow", () => {
  let singupBody;
  let fileContent;
  let accessToken;
  beforeEach((done) => {
    fileContent = JSON.parse(
      fs.readFileSync(path.join(__dirname, "..", "..", "src", "data_test.json"))
    );
    singupBody = {
      name: "test name",
      email: "test12345@gmail.com",
      password: "test1234",
      preferences: {
        categories: [1, 2],
      },
    };

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
            accessToken = res.body.accessToken;
            done();
          });
      });
  });

  afterEach((done) => {
    fs.writeFileSync(
      path.join(__dirname, "..", "..", "src", "data_test.json"),
      JSON.stringify(fileContent),
      {
        encoding: "utf-8",
        flag: "w",
      }
    );
    done();
  });

  it("should successfully retrive prefrences", (done) => {
    chai
      .request(server)
      .get("/preferences")
      .set("Authorization", "JWT " + accessToken)
      .end((err, res) => {
        expect(res.status).equal(200);
        expect(res.body).to.have.property("categories");
        done();
      });
  });

  it("should not retrive prefrences without Authorization header", (done) => {
    chai
      .request(server)
      .get("/preferences")
      .end((err, res) => {
        expect(res.status).equal(403);
        expect(res.text).equal("Authorization header not found");
        done();
      });
  });

  it("should not retrive prefrences with invailed jwt token", (done) => {
    chai
      .request(server)
      .get("/preferences")
      .set("Authorization", "JWT " + accessToken + "b")
      .end((err, res) => {
        expect(res.status).equal(403);
        expect(res.text).equal("Invailed JWT Token");
        done();
      });
  });
});

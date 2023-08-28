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

describe("Should verifies put prefrences flow", () => {
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

  it("Should successfully update prefrences", (done) => {
    let pref = {
      categories: [1, 2],
    };

    chai
      .request(server)
      .put("/preferences")
      .set("Authorization", "JWT " + accessToken)
      .send(pref)
      .end((err, res) => {
        expect(res.status).equal(200);
        expect(res.text).equal("Preferences updated successfully");
        done();
      });
  });

  it("Should not update prefrences with invailed jwt token", (done) => {
    let pref = {
      categories: [1, 2],
    };

    chai
      .request(server)
      .put("/preferences")
      .set("Authorization", "JW " + accessToken)
      .send(pref)
      .end((err, res) => {
        expect(res.status).equal(403);
        expect(res.text).equal("Authorization header not found");
        done();
      });
  });

  it("Should not update prefrences with invailed payload", (done) => {
    let pref = {
      categories: [1, 2],
      a: [1, 2],
    };

    chai
      .request(server)
      .put("/preferences")
      .set("Authorization", "JWT " + accessToken)
      .send(pref)
      .end((err, res) => {
        expect(res.status).equal(400);
        done();
      });
  });
});

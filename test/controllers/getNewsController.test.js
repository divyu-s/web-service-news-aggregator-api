import chai from "chai";
import { expect } from "chai";
import chaiHttp from "chai-http";
import server from "../../src/index.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import sinon from "sinon";
import axios from "axios";

chai.use(chaiHttp);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe("Should verifies get news flow", () => {
  let singupBody;
  let fileContent;
  let accessToken;
  beforeEach((done) => {
    sinon
      .stub(axios, "get")
      .resolves({ data: { articles: [{ test: "test" }] } });

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
    sinon.restore();
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

  it("should successfully get news if user preferences are not empty", (done) => {
    chai
      .request(server)
      .get("/news")
      .set("Authorization", "JWT " + accessToken)
      .end((err, res) => {
        expect(res.status).equal(200);
        expect(res.body).to.deep.equal([{ test: "test" }]);
        done();
      });
  });

  it("should successfully get Cached news results ", (done) => {
    chai
      .request(server)
      .get("/news")
      .set("Authorization", "JWT " + accessToken)
      .end((err, res) => {
        chai
          .request(server)
          .get("/news")
          .set("Authorization", "JWT " + accessToken)
          .end((err, res) => {
            expect(res.body).to.deep.equal([{ test: "test" }]);
            done();
          });
      });
  });

  it("should successfully get news if user preferences are empty", (done) => {
    let pref = {
      categories: [],
    };

    chai
      .request(server)
      .put("/preferences")
      .set("Authorization", "JWT " + accessToken)
      .send(pref)
      .end((err, res) => {
        chai
          .request(server)
          .get("/news")
          .set("Authorization", "JWT " + accessToken)
          .end((err, res) => {
            expect(res.status).equal(200);
            expect(res.body).to.deep.equal([{ test: "test" }]);
            done();
          });
      });
  });
});

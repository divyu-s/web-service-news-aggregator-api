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

describe("Should verifies the signup flow", () => {
  let singupBody;
  let fileContent;
  beforeEach((done) => {
    fileContent = JSON.parse(
      fs.readFileSync(path.join(__dirname, "..", "..", "src", "data_test.json"))
    );
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
      JSON.stringify(fileContent),
      {
        encoding: "utf-8",
        flag: "w",
      }
    );
    done();
  });

  it("should be successful signup", (done) => {
    chai
      .request(server)
      .post("/register")
      .send(singupBody)
      .end((err, res) => {
        expect(res.status).equal(200);
        expect(res.text).equal("User registered successfully");
        done();
      });
  });

  it("should verify already registered email", (done) => {
    chai
      .request(server)
      .post("/register")
      .send(singupBody)
      .end((err, res) => {
        chai
          .request(server)
          .post("/register")
          .send(singupBody)
          .end((err, res) => {
            expect(res.status).equal(400);
            expect(res.body.message).equal("Email is already registered");
            done();
          });
      });
  });
});

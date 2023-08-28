import sinon from "sinon";
import axios from "axios";
import { expect } from "chai";
import { getData } from "../../src/services/httpService.js";

describe("Should verifies httpService", async () => {
  afterEach(() => {
    sinon.restore(); // Restore stubs after each test
  });

  it("getData method should work", (done) => {
    const axiosGetStub = sinon.stub(axios, "get").resolves([{ test: "test" }]);
    getData("/some/path").then((result) => {
      expect(result).to.deep.equal([{ test: "test" }]);
      axiosGetStub.restore();
      done();
    });
  });
});

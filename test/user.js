import chai from "chai";
import {
  assert,
  expect,
  should
} from "chai";
import chaiHttp from "chai-http";
import { app } from "../index.js";

chai.use(chaiHttp);

describe("Users", () => {
  it("should list all users on /users GET", (done) => {
    chai.request(app)
      .get("/api/v1/users")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

import pipe from "@/pipe";
import { EventNames } from "@/@types";
import { expect } from "chai";

describe("Event Pipe", function () {
  this.slow(100);

  it("must handle the event quickly with values", function (done) {
    pipe.on(EventNames.TEST, function (value) {
      expect(value).to.be.equal(5);
      done();
    });

    pipe.emit(EventNames.TEST, 5);
  });
});

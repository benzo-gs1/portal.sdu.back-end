import pipe from "@/pipe";
import { EventNames } from "@/@types";
import { expect } from "chai";

const slow = 2;

describe("Event Pipe", function () {
  this.slow(slow);

  it("must handle the event quickly with values", function (done) {
    pipe.on(EventNames.TEST, function (value) {
      expect(value).to.be.equal(5);
      done();
    });

    pipe.emit(EventNames.TEST, 5);
  });
});

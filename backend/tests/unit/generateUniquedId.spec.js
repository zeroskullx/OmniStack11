const generateUniquedId = require("../../src/utils/generateUniquedId");

describe("Generate Unique ID", () => {
  it("should generate an unique ID", () => {
    const id = generateUniquedId();
    expect(id).toHaveLength(8);
  });
});

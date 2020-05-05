import jadenCase from "../../workshop/utils/jadenCase";

describe("jadenCase helper", () => {
  test("Properly jaden-cases a lowercase word", () => {
    expect(jadenCase("test")).toEqual("Test");
  });
  test("Properly jaden-cases an uppercase word", () => {
    expect(jadenCase(`TEST`)).toEqual(`Test`);
  });
  test("Properly jaden-cases a lowercase sentence", () => {
    expect(jadenCase("my own voice annoys me")).toEqual(
      "My Own Voice Annoys Me"
    );
  });
  test("Properly jaden-cases an uppercase sentence", () => {
    expect(jadenCase(`I DON'T HATE ANYTHING ACCEPT FOR MONSANTO`)).toEqual(
      `I Don't Hate Anything Accept For Monsanto`
    );
  });
});

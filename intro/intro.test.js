test('Jest works ok', () => {
  expect(true).toBeTruthy();
});

describe('Jest is working', () => {
  test('0 is falsy', () => {
    expect(0).toBeFalsy();
  });
  test('1 equals 1', () => {
    expect(1).toEqual(1);
  });
  test('1 + 1 is 2', () => {
    const actual = 1 + 1;
    const expected = 3;
    expect(actual).toBe(expected);
  });
});

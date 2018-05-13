import jadenCase from './jadenCase';

describe('jadenCase helper', () => {
  test('Properly jaden-cases a single word', () => {
    expect(jadenCase('test')).toEqual('Test');
  });
  test('Properly jaden-cases a lowercase sentence', () => {
    expect(jadenCase('my own voice annoys me')).toEqual(
      'My Own Voice Annoys Me'
    );
  });
});

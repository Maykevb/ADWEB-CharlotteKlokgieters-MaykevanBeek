import { Saldo } from "./saldo.model";

describe('Saldo', () => {
  it('should create an instance', () => {
    // Assert
    expect(new Saldo('', 'tag', '')).toBeTruthy();
  });
});

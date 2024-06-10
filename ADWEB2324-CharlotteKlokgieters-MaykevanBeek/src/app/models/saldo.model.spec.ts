import {Saldo} from "./saldo.model";

describe('Saldo', () => {
  it('should create an instance', () => {
    expect(new Saldo('', 'tag', 'salaris', '12.00')).toBeTruthy();
  });
});

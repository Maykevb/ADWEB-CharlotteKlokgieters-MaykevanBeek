import {Saldo} from "./saldo.model";
import {Categorie} from "./categorie.model";

describe('Saldo', () => {
  it('should create an instance', () => {
    expect(new Saldo('', 'tag', new Categorie('', 'drug money'), '12.00')).toBeTruthy();
  });
});

import { Categorie } from "./categorie.model";

describe('Categorie', () => {
  it('should create an instance', () => {
    expect(new Categorie('', 'salaris', '1')).toBeTruthy();
  });
});

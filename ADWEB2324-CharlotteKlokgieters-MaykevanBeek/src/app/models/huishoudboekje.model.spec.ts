import { Huishoudboekje } from "./huishoudboekje.model";

describe('Huishoudboekje', () => {
  it('should create an instance', () => {
    // Assert
    expect(new Huishoudboekje('', 'omschrijving', 'naam', '')).toBeTruthy();
  });
});

import {Uitgave} from "./uitgave.model";

describe('Inkomsten', () => {
  it('should create an instance', () => {
    expect(new Uitgave('', 'tag', 'boodschappen', '18.00')).toBeTruthy();
  });
});

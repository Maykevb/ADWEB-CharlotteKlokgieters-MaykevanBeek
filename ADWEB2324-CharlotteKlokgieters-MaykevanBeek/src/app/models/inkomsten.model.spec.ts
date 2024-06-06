import {Inkomsten} from "./inkomsten.model";

describe('Inkomsten', () => {
  it('should create an instance', () => {
    expect(new Inkomsten('', 'tag', 'salaris', '12.00')).toBeTruthy();
  });
});

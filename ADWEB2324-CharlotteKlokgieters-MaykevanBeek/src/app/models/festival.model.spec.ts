import { Festival } from './festival.model';

describe('Festival', () => {
  it('should create an instance', () => {
    expect(new Festival('', 'name', 'date', 'location')).toBeTruthy();
  });
});

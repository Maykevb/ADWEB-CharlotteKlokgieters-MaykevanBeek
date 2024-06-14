import { HuishoudboekjeZoekPipe } from "./huishoudboekje-zoek.pipe";

describe('HuishoudboekjeZoekPipe', () => {
  let pipe: HuishoudboekjeZoekPipe;

  beforeEach(() => {
    pipe = new HuishoudboekjeZoekPipe();
  });

  it('should create an instance', () => {
    // Assert
    expect(pipe).toBeTruthy();
  });

  it('should filter the array based on exact match of search query', () => {
    // Arrange
    const items = [
      { naam: 'Boodschappen' },
      { naam: 'Gas' },
      { naam: 'Elektriciteit' },
      { naam: 'Water' }
    ];

    // Act
    const filteredItems = pipe.transform(items, 'Gas');

    // Assert
    expect(filteredItems.length).toEqual(1);
    expect(filteredItems[0].naam).toEqual('Gas');
  });

  it('should filter the array based on partial match of search query', () => {
    // Arrange
    const items = [
      { naam: 'Boodschappen' },
      { naam: 'Gas' },
      { naam: 'Elektriciteit' },
      { naam: 'Water' }
    ];

    // Act
    const filteredItems = pipe.transform(items, 'ele');

    // Assert
    expect(filteredItems.length).toEqual(1);
    expect(filteredItems[0].naam).toEqual('Elektriciteit');
  });

  it('should return an empty array when no matches found', () => {
    // Arrange
    const items = [
      { naam: 'Boodschappen' },
      { naam: 'Gas' },
      { naam: 'Elektriciteit' },
      { naam: 'Water' }
    ];

    // Act
    const filteredItems = pipe.transform(items, 'niet bestaande zoekterm');

    // Assert
    expect(filteredItems.length).toEqual(0);
  });

  it('should handle different data structures in items', () => {
    // Arrange
    const items = [
      { naam: 'Boodschappen', prijs: 20 },
      { naam: 'Gas', type: 'energie' },
      { naam: 'Elektriciteit', categorie: 'rekeningen' },
      { naam: 'Water', kosten: { maandelijks: 30, jaarlijks: 360 } }
    ];

    // Act
    const filteredItems = pipe.transform(items, 'gas');

    // Assert
    expect(filteredItems.length).toEqual(1);
    expect(filteredItems[0].naam).toEqual('Gas');
  });
});

describe('TechAVL Dashboard', () => {
  beforeEach(() => {
    cy.visit('/dashboard'); // Ajustar URL si es necesario
  });

  it('Muestra vehículo al buscar ID válido', () => {
    cy.get('#vehicle-id-input').type('123ABC');
    cy.contains('Buscar').click();
    cy.get('[data-testid="vehicle-marker"]').should('be.visible');
  });

  it('No muestra vehículo si el ID es inválido', () => {
    cy.get('#vehicle-id-input').type('XXX999');
    cy.contains('Buscar').click();
    cy.get('[data-testid="vehicle-marker"]').should('not.exist');
  });

  it('Muestra múltiples vehículos si hay coincidencias', () => {
    const ids = ['123ABC', '456DEF'];
    ids.forEach(id => {
      cy.get('#vehicle-id-input').clear().type(id);
      cy.contains('Buscar').click();
      cy.get('[data-testid="vehicle-marker"]').should('be.visible');
    });
  });
});

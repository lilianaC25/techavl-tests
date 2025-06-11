describe('TechAVL Dashboard', () => {
  it('Muestra vehículo al buscar ID válido', () => {
    cy.visit('/dashboard');
    cy.get('#vehicle-id-input').type('123ABC');
    cy.contains('Buscar').click();
    cy.get('[data-testid="vehicle-marker"]').should('be.visible');
  });
});

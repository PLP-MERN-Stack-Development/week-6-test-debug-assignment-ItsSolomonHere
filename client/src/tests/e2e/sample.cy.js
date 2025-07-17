describe('Sample E2E Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/');
    cy.contains('Welcome').should('exist'); // Adjust text as per your landing page
  });
}); 
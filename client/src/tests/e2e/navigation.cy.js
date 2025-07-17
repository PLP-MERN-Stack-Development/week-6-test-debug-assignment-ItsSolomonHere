describe('Navigation and Routing', () => {
  it('should navigate to Home, Posts, and Profile pages', () => {
    cy.visit('/');
    cy.contains('Posts').click();
    cy.url().should('include', '/posts');
    cy.contains('Profile').click();
    cy.url().should('include', '/profile');
    cy.contains('Home').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
}); 
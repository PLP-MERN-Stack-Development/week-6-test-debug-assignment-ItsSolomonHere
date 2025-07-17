describe('Authentication Flows', () => {
  it('should register a new user', () => {
    cy.visit('/register');
    cy.get('input[name="username"]').type('testuser');
    cy.get('input[name="email"]').type('testuser@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.contains('Welcome').should('exist'); // Adjust as per your app
  });

  it('should login an existing user', () => {
    cy.visit('/login');
    cy.get('input[name="email"]').type('testuser@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.contains('Dashboard').should('exist'); // Adjust as per your app
  });
}); 
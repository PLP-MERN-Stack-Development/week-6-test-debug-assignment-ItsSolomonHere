describe('Error Handling and Edge Cases', () => {
  it('should show 404 page for unknown route', () => {
    cy.visit('/non-existent-page', { failOnStatusCode: false });
    cy.contains('404').should('exist'); // Adjust as per your app's 404 page
  });
}); 
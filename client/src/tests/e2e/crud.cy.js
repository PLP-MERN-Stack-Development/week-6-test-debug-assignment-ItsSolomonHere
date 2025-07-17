describe('CRUD Operations', () => {
  beforeEach(() => {
    // Assume user is logged in or perform login steps
    cy.visit('/login');
    cy.get('input[name="email"]').type('testuser@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
  });

  it('should create a new post', () => {
    cy.visit('/posts/new');
    cy.get('input[name="title"]').type('My New Post');
    cy.get('textarea[name="content"]').type('This is the content of my new post.');
    cy.get('button[type="submit"]').click();
    cy.contains('My New Post').should('exist');
  });

  it('should edit a post', () => {
    cy.visit('/posts');
    cy.contains('My New Post').click();
    cy.get('button.edit-post').click();
    cy.get('input[name="title"]').clear().type('My Updated Post');
    cy.get('button[type="submit"]').click();
    cy.contains('My Updated Post').should('exist');
  });

  it('should delete a post', () => {
    cy.visit('/posts');
    cy.contains('My Updated Post').click();
    cy.get('button.delete-post').click();
    cy.contains('My Updated Post').should('not.exist');
  });
}); 
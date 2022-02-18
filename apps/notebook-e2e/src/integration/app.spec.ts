import { getGreeting } from '../support/app.po';

describe('notebook', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    // Custom command example, see `../support/commands.ts` file
    cy.login('my-email@something.com', 'myPassword');

    console.log('Make me affected');

    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains('Welcome notebook');
  });
});

Cypress.Commands.add("getBySel", (selector, ...args) => {
  return cy.get(`[data-testid=${selector}]`, ...args);
});

Cypress.Commands.add("selectDropdown", (selector, value) => {
  cy.getBySel(selector).parent().click()
  cy.get('.v-list-item').contains(value).click()
});


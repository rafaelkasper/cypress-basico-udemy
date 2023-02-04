Cypress.Commands.add("fillMandatoryFieldsAndSubmit", function () {
  cy.get("#firstName").type("Rafael");
  cy.get("#lastName").type("Kasper");
  cy.get("#email").type("prof.rafaelkasper@gmail.com");
  cy.get("#open-text-area").type("Teste");
  cy.get('button[type="submit"').click();
});

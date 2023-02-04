/// <reference types="Cypress" />

describe("Central de Atendimento ao Cliente TAT", function () {
  beforeEach(function () {
    cy.visit("./src/index.html");
  });
  it("verifica o título da aplicação", function () {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it("preenche os campos obrigatórios e envia o formulário", () => {
    const longText = "Text, text, text";
    cy.get("#firstName").type("Rafael");
    cy.get("#lastName").type("Kasper");
    cy.get("#email").type("prof.rafaelkasper@gmail.com");
    cy.get("#open-text-area").type(longText, { delay: 0 });
    cy.get('button[type="submit"').click();
    cy.get(".success").should("be.visible");
  });

  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
    cy.get("#firstName").type("Rafael");
    cy.get("#lastName").type("Kasper");
    cy.get("#email").type("prof.rafaelkasper@gmail,com");
    cy.get("#open-text-area").type("Teste");
    cy.get('button[type="submit"').click();
    cy.get(".error").should("be.visible");
  });

  it("input continua vazio ao digitar texto no telefone", () => {
    cy.get("#phone").type("abcdefghij").should("have.value", "");
  });

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.get("#firstName").type("Rafael");
    cy.get("#lastName").type("Kasper");
    cy.get("#email").type("prof.rafaelkasper@gmail.com");
    cy.get("#phone-checkbox").check();
    cy.get("#open-text-area").type("Teste");
    cy.contains("button", "Enviar").click();
    cy.get(".error").should("be.visible");
  });

  it("preenche e limpa os campos nome, sobrenome, email e telefone", () => {
    cy.get("#firstName")
      .type("Rafael")
      .should("have.value", "Rafael")
      .clear()
      .should("have.value", "");
    cy.get("#lastName")
      .type("Kasper")
      .should("have.value", "Kasper")
      .clear()
      .should("have.value", "");
    cy.get("#email")
      .type("prof.rafaelkasper@gmail.com")
      .should("have.value", "prof.rafaelkasper@gmail.com")
      .clear()
      .should("have.value", "");
    cy.get("#phone")
      .type("985159798")
      .should("have.value", "985159798")
      .clear()
      .should("have.value", "");
  });

  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", () => {
    cy.get('button[type="submit"').click();
    cy.get(".error").should("be.visible");
  });

  it("envia o formuário com sucesso usando um comando customizado", () => {
    cy.fillMandatoryFieldsAndSubmit();
    cy.get(".success").should("be.visible");
  });

  it("seleciona um produto (YouTube) por seu texto", () => {
    cy.get("#product")
      .select("YouTube") // texto da opção
      .should("have.value", "youtube"); // valor da opção
  });

  it("seleciona um produto (Mentoria) por seu valor (value)", () => {
    cy.get("#product")
      .select("mentoria") // value da opção
      .should("have.value", "mentoria"); // valor da opção
  });

  it("seleciona um produto (Blog) por seu índice", () => {
    cy.get("#product")
      .select(1) // índice
      .should("have.value", "blog"); // valor da opção
  });

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      // .should("be.checked")
      .should("have.value", "feedback");
  });

  it("marca cada tipo de atendimento", () => {
    cy.get('input[type="radio"]')
      .should("have.length", 3)
      .each(function ($radio) {
        cy.wrap($radio).check();
        cy.wrap($radio).should("be.checked");
      });
  });

  it("marca ambos checkboxes, depois desmarca o último", () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should("be.checked")
      .last()
      .uncheck()
      .should("not.be.checked");
  });

  it("seleciona um arquivo da pasta fixtures", () => {
    cy.get('input[type="file"]#file-upload')
      .should("not.have.value")
      .selectFile("./cypress/fixtures/example.json")
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });

  it("seleciona um arquivo simulando drag and drop", () => {
    cy.get('input[type="file"]#file-upload')
      .should("not.have.value")
      .selectFile("./cypress/fixtures/example.json", { action: "drag-drop" })
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });

  it("seleciona um arquivo utilizando um fixture que foi dada um alias", () => {
    cy.fixture("example.json").as("sampleFile");
    cy.get('input[type="file"]#file-upload')
      .should("not.have.value")
      .selectFile("@sampleFile")
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });

  it("verifica que a política de privacidade abre em outra aba sem a necessidade de clique", () => {
    cy.get("#privacy a").should("have.attr", "target", "_blank");
  });

  it("acessa a página de política de privacidade removendo o target e então clicando no link", () => {
    cy.get("#privacy a").invoke("removeAttr", "target").click();
    cy.contains("Talking About Test").should("be.visible");
  });
});

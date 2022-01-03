/// <reference types='cypress' />

context('Dev Finances Agilizei', () => {

    //HOOKS
    // beforeEach()
    // afterEach()
    // after()
    // before()

    beforeEach(() =>{
        cy.visit('https://devfinance-agilizei.netlify.app/');
        cy.get('#data-table tbody tr').should('have.length', 0);
    })

    it('Cadastrar entradas', () => {
        cy.get('#transaction .button').click();
        cy.get('#description').type('Mesada');
        cy.get('[name=amount]').type(20);
        cy.get('[type=date]').type('2022-03-17');
        cy.get('button').contains('Salvar').click();

        cy.get('#data-table tbody tr').should('have.length', 1);
    });

    it('Cadastrar saídas', () => {
        cy.get('#transaction .button').click();
        cy.get('#description').type('Mesada');
        cy.get('[name=amount]').type(-20);
        cy.get('[type=date]').type('2022-03-17');
        cy.get('button').contains('Salvar').click();

        cy.get('#data-table tbody tr').should('have.length', 1);
    });

    it('Remover entradas e saídas', () => {
        const entrada = 'Mesada';
        const saida = 'KinderOvo';

        cy.get('#transaction .button').click();
        cy.get('#description').type(entrada);
        cy.get('[name=amount]').type(20);
        cy.get('[type=date]').type('2022-03-17');
        cy.get('button').contains('Salvar').click();

        cy.get('#transaction .button').click();
        cy.get('#description').type(saida);
        cy.get('[name=amount]').type(-12);
        cy.get('[type=date]').type('2022-03-17');
        cy.get('button').contains('Salvar').click();

        cy.get('td.description')
        .contains(entrada)
        .parent()
        .find('img[onclick*=remove]')
        .click();

        cy.get('td.description')
        .contains(saida)
        .parent()
        .find('img[onclick*=remove]')
        .click();

        cy.get('#data-table tbody tr').should('have.length', 0);
    });
});
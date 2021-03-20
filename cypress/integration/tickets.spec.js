/// <reference types="cypress" />
describe('Tickets', () => {

    beforeEach(() => {
        cy.visit('https://bit.ly/2XSuwCW');
    });

    it('Interagindo com TextBoxs', () => {
        const firstName = 'Diogo';
        const lastName = 'Marques';
        
        cy.get('#first-name').type(firstName);
        cy.get('#last-name').type(lastName);
        cy.get('#email').type('example@gmail.com');
        cy.get('#requests').type('Vegetarian');
        cy.get('#signature').type(`${firstName} ${lastName}`);
    });

    it('Interagindo com Selects', () => {
        cy.get('#ticket-quantity').select('2');
    });

    it('Interagindo com RadioButtons', () => {
        cy.get('#vip').check();
    });

    it('Interagindo com CheckBoxs', () => {
        cy.get('#friend').check();
        cy.get('#publication').check();
        cy.get('#publication').uncheck();
    });

    it('Validando Titulo da Página', () => {
        cy.get('header h1').should('contain', 'TICKETBOX');
    });

    it('Validando Alerta de E-mail Inválido', () => {
        cy.get('#email')
            .as('email')
            .type('examplegmail.com');

        cy.get('#email.invalid').should('exist');

        cy.get('@email')
            .clear()
            .type('example@gmail.com');
        
        cy.get('#email.invalid').should('not.exist');               
    });

    it('Validando Reset do Formulário', () => {
        const firstName = 'Diogo';
        const lastName = 'Marques';
        const fullName = `${firstName} ${lastName}`;

        cy.get('#first-name').type(firstName);
        cy.get('#last-name').type(lastName);
        cy.get('#email').type('example@gmail.com');
        cy.get('#ticket-quantity').select('2');
        cy.get('#vip').check();
        cy.get('#friend').check();
        cy.get('#requests').type('Vegetarian');      

        cy.get('.agreement p').should(
            'contain',
            `${fullName}, wish to buy 2 VIP tickets.`
        );

        cy.get('#agree').check();
        cy.get('#signature').type(`${fullName}`);  

        cy.get("button[type='submit']")
            .as('buttonSubmit')
            .should('not.be.disabled');

        cy.get('.reset').click();
        cy.get("@buttonSubmit").should('be.disabled');
    });

    it('Preenchendo campos obrigatórios com comandos customizados', () => {
        const customer = {
            firstName: 'Diogo',
            lastName: 'Marques',
            email: 'example@gmail.com'
        };

        cy.preencherCamposObrigatorios(customer);
        cy.get('#agree').uncheck();
        cy.get("button[type='submit']").should('be.disabled');

    })

    it('Validando Confirmação de Tickets', () => {
        const customer = {
            firstName: 'Diogo',
            lastName: 'Marques',
            email: 'example@gmail.com'
        };

        cy.preencherCamposObrigatorios(customer);
        cy.clicarBotaoConfirmarTickets();
        cy.get('.success p').should('contain', 'Ticket(s) successfully ordered.');
    });

});
/// <reference types="cypress" />

const { lab } = require("d3-color")

describe('Our first suite', ()=> {
    it('first test', ()=> {

        cy.visit('/')

        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // by Tag Name
        cy.get('input')

        // by ID
        cy.get('#inputEmail1')

        // by Class Name
        cy.get('.input-full-width')

        // by Attribute name
        cy.get('[placeholder]')

        // by Attribute name and value
        cy.get('[placeholder="Email"]')

        //by Class value
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        // by Tag name and Attribute with value
        cy.get('input[placeholder="Email"]')

        // by two different attributes
        cy.get('[placeholder="Email"][type="email"]')

        // by Tag name, Attribute with value, ID and Class name
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

        // The most recommended way by Cypress
        cy.get('[data-cy="imputEmail1"]')

    })

    it('second test', ()=>{
        
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()


        cy.get('[data-cy="signInButton"]')

        cy.contains('Sign in')

        //
        cy.contains('[status="warning"]','Sign in')

        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain','Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click()

        cy.contains('nb-card','Horizontal form').find('[type="email"]')
    })

    it('then and wrap methods', ()=>{
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //cy.contains('nb-card','Using the Grid').find('[for="inputEmail1"]').should('contain','Email')
        //cy.contains('nb-card','Using the Grid').find('[for="inputPassword2"]').should('contain','Password')

        //cy.contains('nb-card','Basic form').find('[for="exampleInputEmail1"]').should('contain','Email address')
        //cy.contains('nb-card','Basic form').find('[for="exampleInputPassword1"]').should('contain','Password')
        

        // Cypress style
        cy.contains('nb-card','Using the Grid').then( firstForm =>{
            const emailLabelFirst= firstForm.find('[for="inputEmail1"]').text()
            const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()
            expect(emailLabelFirst).to.equal('Email')
            expect(passwordLabelFirst).to.equal('Password')


            cy.contains('nb-card','Basic form').then( secondForm =>{
                //const emailLabelSecond= secondForm.find('[for="exampleInputEmail1"]').text()
                const passwordLabelSecond = secondForm.find('[for="exampleInputPassword1"]').text()
                // expect(emailLabelSecond).to.equal('Email address')
                // expect(passwordLabelSecond).to.equal('Password')
                expect(passwordLabelFirst).to.equal(passwordLabelSecond)

                // Convert your code from JjQuery format to Cypress
                cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain','Password')
            })


        })

        
    })

    it('invoke command', ()=> {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //1
        cy.get('[for="exampleInputEmail1"]').should('contain','Email address')

        //2
        cy.get('[for="exampleInputEmail1"]').then( label => {
            expect(label.text()).to.equal('Email address')

        })

        //3
        cy.get('[for="exampleInputEmail1"]').invoke('text').then( text =>{
            expect(text).to.equal('Email address')
        })

        // In order to check the checkbox

        cy.contains('nb-card', 'Basic form')
            .find('nb-checkbox')
            .click()
            .find('.custom-checkbox')
            .invoke('attr', 'class')
            //.should('contain','checked')
            .then(classValue => {
                expect(classValue).to.contain('checked') // calssValue is extracted value from the invoked function
            })

    })

    it('assert property', () =>{
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        cy.contains('nb-card','Common Datepicker').find('input').then( input =>{
            cy.wrap(input).click()
            cy.get('nb-calendar-day-picker').contains('30').click()
            cy.wrap(input).invoke('prop','value').should('contain','Dec 30, 2020')
        })
    })

    it('radio button', ()=>{

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then( radioButtons =>{
            cy.wrap(radioButtons)
                .first()
                .check({force: true})
                .should('be.checked')

            cy.wrap(radioButtons)
                .eq(1)
                .check({force: true})

            cy.wrap(radioButtons)
                .first() // or eq(0)
                .should('not.be.checked')

            cy.wrap(radioButtons)
                .eq(2)
                .should('be.disabled')

        })

    })

    it('check boxes', ()=>{

        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

        // cy.get('[type="checkbox"]').check({force: true})
        cy.get('[type="checkbox"]').eq(0).click({force: true})
        cy.get('[type="checkbox"]').eq(1).check({force: true})
    })



    it('Lists and dropdowns', ()=> {
        cy.visit('/')

        //1
        //cy.get('nav nb-select').click()
        //cy.get('.options-list').contains('Dark').click()
        //cy.get('nav nb-select').should('contain', 'Dark')
        //cy.get('nb-layout-header nav').should('have.css', 'background-color','rgb(34, 43, 69)')

        //2
        cy.get('nav nb-select').then (dropdown => {
            cy.wrap(dropdown).click()
            cy.get('.options-list nb-option').each( (listitem, index) => {
                const itemText = listitem.text().trim()

                const colors = {
                    "Light": "rgb(255, 255, 255)",
                    "Dark":"rgb(34, 43, 69)",
                    "Cosmic":"rgb(50, 50, 89)",
                    "Corporate":"rgb(255, 255, 255)"
                }

                cy.wrap(listitem).click()
                cy.wrap(dropdown).should('contain', itemText)
                cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])
                if(index < 3){
                    cy.wrap(dropdown).click()
                }
            })
        })


    })

    it.only('Web tables', ()=>{
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        //1 how to update table row
        cy.get('tbody').contains('tr','Larry').then( tableRow =>{
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
            cy.wrap(tableRow).find('.nb-checkmark').click()
            cy.wrap(tableRow).find('td').eq(6).should('contain','25')
        })

        //2 add a row
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then( tableRow => {
            cy.wrap(tableRow).find('[placeholder="First Name"]').type('Tony')
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Homsi')
            cy.wrap(tableRow).find('.nb-checkmark').click()
        })
        cy.get('tbody tr').first().find('td').then( tableColumns => {
            cy.wrap(tableColumns).eq(2).should('contain','Tony')
            cy.wrap(tableColumns).eq(3).should('contain','Homsi')
        })

        //3 Search function

        const age = [20, 30, 40, 200]

        cy.wrap(age).each(age => {
            cy.get('thead [placeholder="Age"]').clear().type(age)
            cy.wait(500)
            cy.get('tbody tr').each( tableRow =>{
                if(age == 200){
                    cy.wrap(tableRow).should('contain', 'No data found')
                }
                else{
                    cy.wrap(tableRow).find('td').eq(6).should('contain', age)
                }
            })
      })

    })

})

import {navigationTo} from '../support/page_objects/navigationPage'

describe('Test with pafe Objects', ()=>{

    beforeEach('open application', ()=>{
        cy.visit('/')
    })

    it('verify navigations across the pages', ()=>{
        navigationTo.formLayoutsPage()
        navigationTo.datepickerPage()
        navigationTo.toasterPage()
        navigationTo.tooltipPage()
        navigationTo.smartTabelPage()

    })
})
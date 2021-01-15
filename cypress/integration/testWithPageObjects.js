import { onDatePickerPage } from '../support/page_objects/datePickerPage'
import { onFormLayoutsPage } from '../support/page_objects/formLayoutsPage'
import {navigationTo} from '../support/page_objects/navigationPage'
import { onSmartTablePage } from '../support/page_objects/smartTablePage'

describe('Test with page Objects', ()=>{

    beforeEach('open application', ()=>{
        cy.visit('/')
    })

    it.only('verify navigations across the pages', ()=>{
        navigationTo.formLayoutsPage()
        navigationTo.datepickerPage()
        navigationTo.toasterPage()
        navigationTo.tooltipPage()
        navigationTo.smartTabelPage()

    })

    it.only('should submit Inline and Basic form and select tomorrow date in the calendar', ()=>{
        navigationTo.formLayoutsPage()
        onFormLayoutsPage.submitInlineFormWithNameAndEmail('Tony','test@test.com')
        onFormLayoutsPage.submitBasicFormWithEmailAndPassword('test@test.com', 'passowrd')
        navigationTo.datepickerPage()
        onDatePickerPage.selectCommonDatePickerDateFromToday(1)
        onDatePickerPage.selectDatePickerWithRangeFromToday(7, 14)
        navigationTo.smartTabelPage()
        onSmartTablePage.addNewRecordWithFirstAndLastName('Tony','Homsi')
        onSmartTablePage.updateAgeByFirstName('Tony', '35')
        onSmartTablePage.deleteRowByIndex(1)

    })
})
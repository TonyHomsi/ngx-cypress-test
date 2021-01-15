import { ExpandOperator } from "rxjs/internal/operators/expand";

function selectGroupMenuItem(groupName){
    cy.contains('a', groupName).then( menu =>{
        cy.wrap(menu).find('.expand-state g g').invoke('attr', 'data-name').then( attr =>{
            if(attr.includes('left')){
                cy.wrap(menu).click()
            }
        })
    })

}

export class NavigationPage{

    formLayoutsPage(){
        selectGroupMenuItem('Forms')
        cy.contains('Form Layouts').click()
    }

    datepickerPage(){
        selectGroupMenuItem('Forms')
        cy.contains('Datepicker').click()
    }

    toasterPage(){
        selectGroupMenuItem('Modal & Overlays')
        cy.contains('Toastr').click()
    }
     tooltipPage(){
        selectGroupMenuItem('Modal & Overlays')
        cy.contains('Tooltip').click()
    }

    smartTabelPage(){
        selectGroupMenuItem('Tables & Data')
        cy.contains('Smart Table').click()
    }

}

export const navigationTo = new NavigationPage()
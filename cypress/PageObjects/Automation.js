/*
  * Written by :Zaahid Ahmad
  * Date Created/Updated: 08/07/2024
*/

class automation {

    getcreateboard(){
        return cy.get('[data-cy="create-board"]')
    }

    getnewboardinput(){
        return cy.get('[data-cy="new-board-input"]')
    }

    getnewboardcreate(){
        return cy.get('[data-cy="new-board-create"]')
    }

    getboard(){
        return cy.get('#board-')
    }

    getaddlistinput(){
        return cy.get('[data-cy="add-list-input"]')
    }  
    
    getaddlist(){
        return cy.get('.grid > div > .py-1')
    }
    
    getdeletelist(){
        return cy.get('[data-cy="delete-list"]')
    }
}

export default automation

        
        
        
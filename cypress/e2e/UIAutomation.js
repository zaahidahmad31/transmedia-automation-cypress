/*
  * Written by :Zaahid Ahmad
  * Date Created/Updated: 08/07/2024
*/

/// <reference types="cypress" />

import automation from '../PageObjects/Automation'

describe('Board and List Management', () => {

  beforeEach(function () {
    cy.fixture('UIAutomation.json').then(function (data){
      this.automation=data;
    cy.visit("/")
  }) 
 })

    it('TC_001 Create Board', function () {

        const createboard = new automation()

        createboard.getcreateboard().click()
        createboard.getnewboardinput().click().type(this.automation.boardname);
        createboard.getnewboardcreate().click();
    });

    it('TC_002 should fetch the created board and create lists', function () {

      const createlist = new automation()

      cy.request({
        method: 'GET',
        url: 'http://localhost:3000/api/boards',
        headers: {
          'Accept': 'application/json, text/plain, */*',
        }
      }).then((response) => {

        expect(response.status).to.eq(200);
        expect(response.headers['content-type']).to.include('application/json');
  
        const responseBody = response.body;
        const lastElement = responseBody[responseBody.length - 1];
        const lastElementId = lastElement.id;

        cy.get('#board-'+lastElementId).click();
        createlist.getaddlistinput().type(this.automation.firstlist);
        createlist.getaddlist().click();
        createlist.getaddlistinput().type(this.automation.secondlist)
        createlist.getaddlist().click();
      });
    });

    it('TC_003 Delete the 1st list in the Board', function() {
      
      const deletelist = new automation()

      cy.request({
        method: 'GET',
        url: 'http://localhost:3000/api/boards',
        headers: {
          'Accept': 'application/json, text/plain, */*',
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.headers['content-type']).to.include('application/json');
    
        const responseBody = response.body;
        const lastElement = responseBody[responseBody.length - 1];
        const lastElementId = lastElement.id;
    
        cy.get('#board-' + lastElementId).click();

        cy.request({
          method: 'GET',
          url: `http://localhost:3000/api/lists?boardId=${lastElementId}`,
          headers: {
            'Accept': 'application/json, text/plain, */*',
          }
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.headers['content-type']).to.include('application/json');
      
          const responseBody = response.body;
          const firstlist = responseBody[responseBody.length - 1];
          const firstlistId = firstlist.order;
      
        cy.get(`:nth-child(${firstlistId}) > [data-cy="list"] > .flex > [data-cy="list-options"] > .inline-block`).click();
        deletelist.getdeletelist().click();

      });
    });  
  });
});
    
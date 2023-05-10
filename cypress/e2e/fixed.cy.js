const backoff = require('../..')

describe('fixed strategy', () => {
  beforeEach(() => {
    backoff.fixed([1,2,3])
  })

  it('Given the fixed range, the first execution has a defaultCommandTimeout of 1', () => {
    cy.wrap(Cypress.config('defaultCommandTimeout')).should('equal', 1)
    cy.wrap(Cypress.currentRetry).should('equal', 0)
  })

  it('Given the fixed range, the second execution has a defaultCommandTimeout of 2', () => {
    cy.wrap(Cypress.config('defaultCommandTimeout')).should('equal', 2)
    cy.wrap(Cypress.currentRetry).should('equal', 1)
  })

  it('Given the fixed range, the third execution has a defaultCommandTimeout of 3', () => {
    cy.wrap(Cypress.config('defaultCommandTimeout')).should('equal', 3)
    cy.wrap(Cypress.currentRetry).should('equal', 2)
  })
})
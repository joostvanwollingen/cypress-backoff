const backoff = require('../..')

describe('fibonacci strategy', () => {
  beforeEach(() => {
    backoff.fibonacci(1)
  })

  it('Given the fibonacci sequence, the first execution has a defaultCommandTimeout of 0', () => {
    cy.wrap(Cypress.config('defaultCommandTimeout')).should('equal', 0)
    cy.wrap(Cypress.currentRetry).should('equal', 0)
  })

  it('Given the fibonacci sequence, the second execution has a defaultCommandTimeout of 1', () => {
    cy.wrap(Cypress.config('defaultCommandTimeout')).should('equal', 1)
    cy.wrap(Cypress.currentRetry).should('equal', 1)
  })

  it('Given the fibonacci sequence, the third execution has a defaultCommandTimeout of 1', () => {
    cy.wrap(Cypress.config('defaultCommandTimeout')).should('equal', 1)
    cy.wrap(Cypress.currentRetry).should('equal', 2)
  })
})
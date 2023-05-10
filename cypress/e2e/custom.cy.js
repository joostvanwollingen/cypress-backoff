const backoff = require('../..')

describe('custom strategy', () => {
  beforeEach(() => {
    backoff.custom((retryCount) => { return Math.max(1, retryCount * 3) })
  })

  it('Given the custom strategy, the first execution has a defaultCommandTimeout of 1', () => {
    cy.wrap(Cypress.config('defaultCommandTimeout')).should('equal', 1)
    cy.wrap(Cypress.currentRetry).should('equal', 0)
  })

  it('Given the custom strategy, the second execution has a defaultCommandTimeout of 3', () => {
    cy.wrap(Cypress.config('defaultCommandTimeout')).should('equal', 3)
    cy.wrap(Cypress.currentRetry).should('equal', 1)
  })

  it('Given the custom strategy, the third execution has a defaultCommandTimeout of 6', () => {
    cy.wrap(Cypress.config('defaultCommandTimeout')).should('equal', 6)
    cy.wrap(Cypress.currentRetry).should('equal', 2)
  })
})
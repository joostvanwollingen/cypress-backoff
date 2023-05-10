const backoff = require('../..')

describe('exponential strategy', () => {
  beforeEach(() => {
    backoff.exponential(2, 2)
  })

  it('Given a timeout of 2, the first execution has a defaultCommandTimeout of 2', () => {
    cy.wrap(Cypress.config('defaultCommandTimeout')).should('equal', 2)
    cy.wrap(Cypress.currentRetry).should('equal', 0)
  })

  it('Given a timeout of 2, the second execution has a defaultCommandTimeout of 4', () => {
    cy.wrap(Cypress.config('defaultCommandTimeout')).should('equal', 4)
    cy.wrap(Cypress.currentRetry).should('equal', 1)
  })

  it('Given a timeout of 2, the third execution has a defaultCommandTimeout of 8', () => {
    cy.wrap(Cypress.config('defaultCommandTimeout')).should('equal', 8)
    cy.wrap(Cypress.currentRetry).should('equal', 2)
  })
})
import '@testing-library/cypress/add-commands'
import '../../index'

Cypress.Commands.add(
  'assertList',
  {
    prevSubject: true,
  },
  (subject, expected) => {
    cy.wrap(subject).should((items) => {
      expect(items.get().map((a) => a.textContent)).to.deep.equal(expected)
    })
  },
)

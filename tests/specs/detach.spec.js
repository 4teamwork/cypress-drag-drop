describe('Drag drop', () => {
  it('should not throw error when element is detached on drop', () => {
    cy.visit('/')

    cy.setExample('Detach')

    cy.findByTestId('item-1').drag('[data-testid="right"]')
  })
})

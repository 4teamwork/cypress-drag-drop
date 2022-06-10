describe('Drag drop', () => {
  it('should catch no draggable elements', () => {
    cy.visit('/')

    cy.setExample('NotDraggable')

    cy.findByTestId('not-draggable')
      .drag('[data-testid="target"]')
      .then((success) => {
        assert.isFalse(success)
      })
  })
})

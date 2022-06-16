describe('Drag drop', () => {
  it('should be able to drag and drop elements', () => {
    cy.visit('/')

    cy.setExample('Basic')

    cy.findByTestId('left').find('.item').assertList(['1', '2', '3', '4', '5', '6'])

    cy.findByTestId('item-1')
      .drag('[data-testid="right"]', { target: { position: 'left' } })
      .then((success) => {
        assert.isTrue(success)
      })

    cy.findByTestId('right').find('.item').assertList(['1'])

    cy.findByTestId('left').find('.item').assertList(['2', '3', '4', '5', '6'])
  })
})

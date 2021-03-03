describe('Drag drop', () => {
  it('should be able to drag and drop elements through elements using force', () => {
    cy.visit('/')

    cy.setExample('Force')

    cy.findByTestId('left').find('.item').assertList(['1', '2', '3', '4', '5', '6'])

    cy.findByTestId('item-1').drag('[data-testid="right"]', { force: true })

    cy.findByTestId('right').find('.item').assertList(['1'])

    cy.findByTestId('left').find('.item').assertList(['2', '3', '4', '5', '6'])
  })
})

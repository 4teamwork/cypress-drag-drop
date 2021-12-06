describe('Position', () => {
  it('should grap at the correct position', () => {
    cy.visit('/')

    cy.setExample('Position')

    cy.findByTestId('left').find('.left-handle').assertList(['1', '2', '3', '4', '5', '6'])

    cy.findByTestId('item-1').drag('[data-testid="right"]', {
      source: { position: 'left' },
      target: { position: 'left' },
    })

    cy.findByTestId('right').find('.item').assertList(['1'])
  })
})

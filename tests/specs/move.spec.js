describe('Drag drop', () => {
  it('should be able to move elements', () => {
    cy.visit('/')

    cy.setExample('Move')

    cy.findByTestId('draggable').should((target) => {
      const { top, left } = target.offset()
      expect(top).to.be.equal(100)
      expect(left).to.be.equal(100)
    })

    cy.findByTestId('draggable').move({ x: 100, y: 100, position: 'center' })

    cy.findByTestId('draggable').should('have.css', 'transform', 'matrix(1, 0, 0, 1, 100, 100)')
    cy.findByTestId('draggable').should((target) => {
      const { top, left } = target.offset()
      expect(top).to.be.equal(200)
      expect(left).to.be.equal(200)
    })
  })

  it('should trigger mouseup at the final mouse location', () => {
    cy.visit('/')

    cy.setExample('MoveOnMouseUp')

    cy.findByTestId('draggable').should((target) => {
      const { top, left } = target.offset()
      expect(top).to.be.equal(100)
      expect(left).to.be.equal(100)
    })

    cy.findByTestId('draggable').move({ x: 100, y: 100, position: 'center' })

    cy.findByTestId('draggable').should('have.css', 'transform', 'matrix(1, 0, 0, 1, 100, 100)')
    cy.findByTestId('draggable').should((target) => {
      const { top, left } = target.offset()
      expect(top).to.be.equal(200)
      expect(left).to.be.equal(200)
    })
  })
})

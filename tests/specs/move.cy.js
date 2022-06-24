describe('Drag drop', () => {
  it('should be able to move elements', () => {
    cy.visit('/')

    cy.setExample('Move')

    cy.findByTestId('draggable').should((target) => {
      const { top, left } = target.offset()
      expect(top).to.be.equal(10)
      expect(left).to.be.equal(20)
    })

    cy.findByTestId('draggable').move({ deltaX: 30, deltaY: 40 })

    cy.findByTestId('draggable').should('have.css', 'transform', 'matrix(1, 0, 0, 1, 30, 40)')
    cy.findByTestId('draggable').should((target) => {
      const { top, left } = target.offset()
      expect(top).to.be.equal(50)
      expect(left).to.be.equal(50)
    })
  })

  it('should trigger mouseup at the final mouse location', () => {
    cy.visit('/')

    cy.setExample('MoveOnMouseUp')

    cy.findByTestId('draggable').should((target) => {
      const { top, left } = target.offset()
      expect(top).to.be.equal(10)
      expect(left).to.be.equal(20)
    })

    cy.findByTestId('draggable').move({ deltaX: 30, deltaY: 40 })

    cy.findByTestId('draggable').should('have.css', 'transform', 'matrix(1, 0, 0, 1, 30, 40)')
    cy.findByTestId('draggable').should((target) => {
      const { top, left } = target.offset()
      expect(top).to.be.equal(50)
      expect(left).to.be.equal(50)
    })
  })
})

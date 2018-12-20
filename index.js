const DragSimulator = {
  MAX_TRIES: 5,
  DELAY_INTERVAL_MS: 10,
  counter: 0,
  rectsEqual(r1, r2) {
    return r1.top === r2.top
      && r1.right === r2.right
      && r1.bottom === r2.bottom
      && r1.left === r2.left;
  },
  get dropped() {
    const currentSourcePosition = this.source.getBoundingClientRect();
    return !this.rectsEqual(this.initialSourcePosition, currentSourcePosition);
  },
  get hasTriesLeft() { return this.counter < this.MAX_TRIES; },
  dragstart() {
    cy
      .wrap(this.source)
      .trigger('mousedown', { which: 1, button: 0 })
      .trigger('dragstart');
  },
  drop() {
    return cy
      .wrap(this.target)
      .trigger('drop', { force: true })
      .trigger('mouseup', { which: 1, button: 0 });
  },
  dragover() {
    if (!this.dropped && this.hasTriesLeft) {
      return cy
        .wrap(this.target)
        .trigger('dragover', 'bottom')
        .wait(this.DELAY_INTERVAL_MS)
        .then(() => this.dragover());
    }
    if (!this.dropped) {
      return this.drop().then(() => {
        throw new Error(`Exeeded maximum tries of: ${this.MAX_TRIES}, aborting`);
      });
    }
    return this.drop();
  },
  init(source, target) {
    this.source = source;
    this.target = target;

    this.dragstart();

    return cy.wait(this.DELAY_INTERVAL_MS).then(() => {
      this.initialSourcePosition = this.source.getBoundingClientRect();
      return this.dragover();
    });
  },
  simulate(sourceWrapper, targetSelector) {
    return cy.get(targetSelector)
      .then(targetWrapper => this.init(sourceWrapper.get(0), targetWrapper.get(0)));
  },
};

Cypress.Commands.add('drag', {
  prevSubject: 'element',
}, (subject, target) => DragSimulator.simulate(subject, target));

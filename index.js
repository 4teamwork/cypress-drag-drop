const dataTransfer = new DataTransfer();

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
      .trigger('dragstart', { dataTransfer: dataTransfer });
  },
  drop() {
    return cy
      .wrap(this.target)
      .trigger('drop', { dataTransfer: dataTransfer, force: true })
      .trigger('mouseup', { which: 1, button: 0 });
  },
  dragover() {
    if (!this.dropped && this.hasTriesLeft) {
      this.counter += 1;
      return cy
        .wrap(this.target)
        .trigger('dragover', { dataTransfer: dataTransfer, position: this.position })
        .wait(this.DELAY_INTERVAL_MS)
        .then(() => this.dragover());
    }
    if (!this.dropped) {
      return this.drop().then(() => {
        console.error(`Exceeded maximum tries of: ${this.MAX_TRIES}, aborting`);
        return false;
      });
    }
    return this.drop().then(() => true);
  },
  init(source, target, position) {
    this.source = source;
    this.target = target;
    this.position = position;
    this.counter = 0;

    this.dragstart();

    return cy.wait(this.DELAY_INTERVAL_MS).then(() => {
      this.initialSourcePosition = this.source.getBoundingClientRect();
      return this.dragover();
    });
  },
  simulate(sourceWrapper, targetSelector, position = 'top') {
    return cy.get(targetSelector)
      .then(targetWrapper => this.init(sourceWrapper.get(0), targetWrapper.get(0), position));
  },
};

Cypress.Commands.add('drag', {
  prevSubject: 'element',
}, (...args) => DragSimulator.simulate(...args));

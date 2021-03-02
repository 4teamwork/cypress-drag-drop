const dataTransfer = new DataTransfer()

function isAttached(element) {
  return !!element.closest('html')
}

const DragSimulator = {
  MAX_TRIES: 5,
  DELAY_INTERVAL_MS: 10,
  counter: 0,
  targetElement: null,
  rectsEqual(r1, r2) {
    return r1.top === r2.top && r1.right === r2.right && r1.bottom === r2.bottom && r1.left === r2.left
  },
  get dropped() {
    const currentSourcePosition = this.source.getBoundingClientRect()
    return !this.rectsEqual(this.initialSourcePosition, currentSourcePosition)
  },
  get hasTriesLeft() {
    return this.counter < this.MAX_TRIES
  },
  set target(target) {
    this.targetElement = target
  },
  get target() {
    return cy.wrap(this.targetElement)
  },
  dragstart({ clientX, clientY } = {}) {
    return cy
      .wrap(this.source)
      .trigger('pointerdown', {
        which: 1,
        button: 0,
        clientX,
        clientY,
        eventConstructor: 'PointerEvent',
        ...this.options,
      })
      .trigger('mousedown', {
        which: 1,
        button: 0,
        clientX,
        clientY,
        eventConstructor: 'MouseEvent',
        ...this.options,
      })
      .trigger('dragstart', { dataTransfer, eventConstructor: 'DragEvent', ...this.options })
  },
  drop({ clientX, clientY } = {}) {
    return this.target
      .trigger('drop', {
        dataTransfer,
        eventConstructor: 'DragEvent',
        ...this.options,
      })
      .then(() => {
        if (isAttached(this.targetElement)) {
          this.target
            .trigger('mouseup', {
              which: 1,
              button: 0,
              clientX,
              clientY,
              eventConstructor: 'MouseEvent',
              ...this.options,
            })
            .then(() => {
              if (isAttached(this.targetElement)) {
                this.target.trigger('pointerup', {
                  which: 1,
                  button: 0,
                  clientX,
                  clientY,
                  eventConstructor: 'PointerEvent',
                  ...this.options,
                })
              }
            })
        }
      })
  },
  dragover({ clientX, clientY } = {}) {
    if (!this.counter || (!this.dropped && this.hasTriesLeft)) {
      this.counter += 1
      return this.target
        .trigger('dragover', {
          dataTransfer,
          eventConstructor: 'DragEvent',
          ...this.options,
        })
        .trigger('mousemove', {
          ...this.options,
          clientX,
          clientY,
          eventConstructor: 'MouseEvent',
        })
        .trigger('pointermove', {
          ...this.options,
          clientX,
          clientY,
          eventConstructor: 'PointerEvent',
        })
        .wait(this.DELAY_INTERVAL_MS)
        .then(() => this.dragover({ clientX, clientY }))
    }
    if (!this.dropped) {
      console.error(`Exceeded maximum tries of: ${this.MAX_TRIES}, aborting`)
    }
  },
  init(source, target, options = {}) {
    this.options = {
      ...options,
      position: options.position || 'top',
      force: options.force || false,
    }
    this.counter = 0
    this.source = source.get(0)
    this.initialSourcePosition = this.source.getBoundingClientRect()
    return cy.get(target).then((targetWrapper) => {
      this.target = targetWrapper.get(0)
    })
  },
  drag(sourceWrapper, targetSelector, options) {
    this.init(sourceWrapper, targetSelector, options)
      .then(() => this.dragstart())
      .then(() => this.dragover())
      .then(() => this.drop())
      .then(() => true)
  },
  move(sourceWrapper, options) {
    const { x: deltaX, y: deltaY } = options
    const { top, left } = sourceWrapper.offset()
    const finalCoords = { clientX: top + deltaX, clientY: left + deltaY }
    this.init(sourceWrapper, sourceWrapper, options)
      .then(() => this.dragstart({ clientX: top, clientY: left }))
      .then(() => this.dragover(finalCoords))
      .then(() => this.drop(finalCoords))
  },
}

function addChildCommand(name, command) {
  Cypress.Commands.add(name, { prevSubject: 'element' }, (...args) => command(...args))
}

addChildCommand('drag', DragSimulator.drag.bind(DragSimulator))
addChildCommand('move', DragSimulator.move.bind(DragSimulator))

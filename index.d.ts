/// <reference types="cypress" />

type Options = Partial<Cypress.ClickOptions & {
  position: Cypress.PositionType
}>

type MoveOptions = Options & {
  x: number
  y: number
}

declare namespace Cypress {
  interface Chainable {
    drag<K extends keyof HTMLElementTagNameMap>(targetSelector: K, options?: Options): true
    drag<E extends Node = HTMLElement>(targetSelector: string, options?: Options): true
    drag(targetAlias: string, options?: Options): true
    move(options: MoveOptions): Chainable<Element>
  }
}

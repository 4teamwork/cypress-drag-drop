# cypress-drag-drop

A cypress child command for drag'n'drop support.

# Setup

Install using npm:

```bash
npm install --save-dev @4tw/cypress-drag-drop
```

or yarn

```bash
yarn add --dev @4tw/cypress-drag-drop
```

Before Cypress is loaded (usually in your `commands.js`) put the following line:

```javascript
require('@4tw/cypress-drag-drop')
```

Or, if you are using ES module syntax:

```javascript
import '@4tw/cypress-drag-drop'
```

This will register the `drag` command.

# Usage

The `drag` command is a child command.
The command only accepts elements.
As the drop target simply pass a selector as string.

In your cypress spec use the command as follows:

```javascript
describe('Dragtest', () => {
  it('should dragndrop', () => {
    cy.visit('/yourpage')

    cy.get('.sourceitem').drag('.targetitem')
  })
})
```

# Options

The second argument of the `.drag` command is an object containing options.

```javascript
describe('Dragtest', () => {
  it('should dragndrop', () => {
    cy.visit('/yourpage')

    cy.get('.sourceitem').drag('.targetitem', options)
  })
})
```

## position

Decide at which position the element should be dropped.

Possible values are topLeft, top, topRight, left, center, right, bottomLeft,
bottom, and bottomRight.

The default position is `top`.

## force

Force the drag'n'drop interaction. Meaning that the grabbing, moving and dropping
is forced. See https://docs.cypress.io/guides/core-concepts/interacting-with-elements.html#Forcing
for more information.

# Development

The plugin itselt is implemented in the `index.js` file.

## Testing

The tests can be run using cyress:

```
yarn test
```

The test fixtures are under `src/examples/`. Using the `setExample` cypress command
the fixture is loaded and ready to run tests on. The first attribute in the `setExample` command
is the name of the fixture which needs to be the filename of the component.

```javascript
cy.setExample('NameOfTheComponent')
```

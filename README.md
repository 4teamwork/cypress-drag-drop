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


If you're using TypeScript, the following configuration in a `tsconfig.json`

```json
{
  "compilerOptions": {
    "types": ["cypress", "@4tw/cypress-drag-drop"]
  }
}
```

# Usage

## drag

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

The command also accepts all the [common options](#options).

```javascript
describe('Dragtest', () => {
  it('should dragndrop', () => {
    cy.visit('/yourpage')

    cy.get('.sourceitem').drag('.targetitem', options)
  })
})
```

## move

The `move` command is a child command.
The command only accepts elements.
Define `x` and `y` as an object parameter to move the element in x- and y-position relative to the elements current position.

In your cypress spec use the command as follows:

```javascript
describe('Dragtest', () => {
  it('should dragndrop', () => {
    cy.visit('/yourpage')

    cy.get('.sourceitem').move({ x: 100, y: 100 })
  })
})
```

The command also accepts all the [common options](#options).

```javascript
describe('Dragtest', () => {
  it('should dragndrop', () => {
    cy.visit('/yourpage')

    cy.get('.sourceitem').move({ x: 100, y: 100, ...options })
  })
})
```


# Options

## position

Decide at which position the element should be grabbed, moved and dropped.

Possible values are topLeft, top, topRight, left, center, right, bottomLeft,
bottom, and bottomRight.

The default position is `top`.

See https://docs.cypress.io/api/commands/trigger.html#Arguments for more information.
## force

Force the drag'n'drop interaction. Meaning that the grabbing, moving and dropping
is forced. See https://docs.cypress.io/guides/core-concepts/interacting-with-elements.html#Forcing
for more information.

## other options

You can also use other options defined by default by Cypress, like: `ctrlKey`, `log`, `timeout`...

See https://docs.cypress.io/api/commands/click.html#Arguments for more information.

# Development

The plugin itself is implemented in the `index.js` file.

## Testing

The tests can be run using cypress:

```
yarn test
```

The test fixtures are under `src/examples/`. Using the `setExample` cypress command
the fixture is loaded and ready to run tests on. The first attribute in the `setExample` command
is the name of the fixture which needs to be the filename of the component.

```javascript
cy.setExample('NameOfTheComponent')
```


# Release

Release a new version of this package:

```
yarn run release
```

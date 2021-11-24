# cypress-drag-drop

A Cypress child command for drag'n'drop support.

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

This will register the `drag` and `move` command.


If you're using TypeScript, put the following configuration in a `tsconfig.json`

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
As the drop target simply pass a selector as a string.

In your Cypress spec use the command as follows:

```javascript
describe('Dragtest', () => {
  it('should dragndrop', () => {
    cy.visit('/yourpage')

    cy.get('.sourceitem').drag('.targetitem')
  })
})
```

Pass the options as an object in the second paramteter.

```javascript
describe('Dragtest', () => {
  it('should dragndrop', () => {
    cy.visit('/yourpage')

    cy.get('.sourceitem').drag('.targetitem', options)
  })
})
```

During the drag and drop interaction, two elements are involved. The source element being dragged and the drop target.
In order to decide what options should either be applied to the source or the target, the options object can be divided in `source` and `target`. Options that are not specific to the source or target are applied to both the source and the target.

``` javascript
cy.get('.sourceitem').drag('.target', {
  source: { x: 100, y: 100 }, // applies to the element being dragged
  target: { position: 'left' }, // applies to the drop target
  force: true, // applied to both the source and target element
})
```

The options are directly passed to Cypress' `trigger` command.
So, all options from https://docs.cypress.io/api/commands/trigger#Arguments are possible.

### Check command outcome

The `drag` command is able to tell wether the drag attempt was successful or not. So, the command will yield `true` when the drag attempt was successful and `false` otherwise:

``` javascript
cy.get('.sourceitem').drag('.target').then((success) => {
  assert.isTrue(success)
})
```

Or you might also want to check that the element is not draggable:

``` javascript
cy.get('.sourceitem').drag('.target').then((success) => {
  assert.isFalse(success)
})
```

## move

The `move` command is a child command.
The command only accepts elements.
Define `deltaX` and `deltaY` as an object parameter to move the element in x- and y-position relative to the element's current position.

In your Cypress spec use the command as follows:

```javascript
describe('Movetest', () => {
  it('should move', () => {
    cy.visit('/yourpage')

    cy.get('.sourceitem').move({ deltaX: 100, deltaY: 100 })
  })
})
```

The command accepts all options from https://docs.cypress.io/api/commands/trigger#Arguments except `position`, `x` and `y` because they have no effect, since the command makes use of `clientX` and `clientY` internally.

```javascript
describe('Movetest', () => {
  it('should move', () => {
    cy.visit('/yourpage')

    cy.get('.sourceitem').move({ deltaX: 100, deltaY: 100, ...options })
  })
})
```

# Development

The plugin itself is implemented in the `index.js` file.

## Testing

The tests can be run using Cypress:

```
yarn test
```

The test fixtures are under `src/examples/`. Using the `setExample` Cypress command
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

# Changelog

Have a look at the [Changelog](CHANGELOG.md)

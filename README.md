# cypress-drag-drop
A cypress child command for drag'n'drop support.

# Usage

The `drag` command is a child command.
The command only accepts elements.
As the drop target simply pass a selector as string.

In your cypress spec use the command as follows:

``` javascript
describe('Dragtest', () => {
  it('should dragndrop', () => {
    cy.visit('/yourpage');

    cy.get('.sourceitem').drag('.targetitem');
  });
});
```

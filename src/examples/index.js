import path from 'path'
import Vue from 'vue'

/**
 * Automatically loads all examples
 * and initializes according components in Vue.
 * See https://goo.gl/NqtXNE
 */

function resolveComponents(components) {
  return components.keys().map((fileName) => {
    // Get component config
    const component = components(fileName)

    // Get PascalCase name of component
    const name = path.basename(fileName).replace('.vue', '')

    // Look for the component options on `.default`, which will
    // exist if the component was exported with `export default`,
    // otherwise fall back to module's root.
    return { component: component.default || component, name, fileName }
  })
}

const requireLocalComponents = require.context(
  // The relative path of the components folder
  './',
  // Whether or not to look in subfolders
  true,
  // The regular expression used to match base component filenames
  /\.(vue)$/,
)

const registeredComponents = Object.keys(Vue.options.components)

// Register local components globally
resolveComponents(requireLocalComponents).forEach(({ name, component, fileName }) => {
  if (registeredComponents.includes(name)) {
    throw new Error(
      `Naming clash: The component under ${fileName} could not be registered, because there is already a component with the same name registered.`,
    )
  }
  Vue.component(name, component)
})

import flow from 'lodash/flow'
import camelCase from 'lodash/camelCase'
import upperFirst from 'lodash/upperFirst'
import { PropOptions } from 'vue'
import { Component, Mixins } from 'vue-property-decorator'

import ContextMixin from './ContextMixin'
import { hasOwnProperty } from '../services/utils'

const pascalCase = flow(camelCase, upperFirst)

/**
 * name that signifies config should be applied to all components
 */
const ALL_COMPONENTS = 'all'

const CONTEXTABLE_COMPUTED_PROP_DEFAULT_PREFIX = 'c_'

/**
 * Attempt to find a prop value from config chain.
 *
 * @category String
 * @param configs [object] config chain.
 * @param componentName [string]
 * @param propName [string] property name (pascal-case)
 *
 * @returns {any} config object if found undefined means not found.
 */
export const getLocalConfigWithComponentProp = (
  configs: any[],
  componentName: string,
  propName: any,
) => {
  // Find prop value in config chain.
  return configs.reverse().find((config) => {
    const componentConfig = config[componentName]
    return componentConfig && hasOwnProperty(componentConfig, propName)
  })
}

/**
 * Calc value of property from component, local and global config
 *
 * @category String
 * @param context [object] this of the vue component.
 * @param prop [string=''] The string of property name.
 * @param defaultValue [any] The default property value.
 * This value takes when each local or global config and component do not contain property.
 * @returns {any} Returns property value.
 */
const getContextPropValue = (
  context: Record<string, any>,
  prop: string,
  defaultValue: () => any,
) => {
  // We have to pass context here as this method will be mainly used in prop default,
  // and methods are not accessible there.

  // Local prop takes priority even when empty.
  if (hasOwnProperty(context, prop)) {
    return context[prop]
  }

  const componentName = pascalCase(context.$options.name)

  if (!context._$configs) {
    throw new Error(
      `'getContextPropValue' working only together with 'ContextMixin'. Please, use 'ContextMixin' for ${componentName} component`,
    )
  }

  const configs = context.$vaContextConfig
    ? [context.$vaContextConfig, ...context._$configs]
    : context._$configs

  const componentConfig = getLocalConfigWithComponentProp(
    configs,
    componentName,
    prop,
  )
  if (componentConfig) {
    return componentConfig[componentName][prop]
  }

  const allConfig = getLocalConfigWithComponentProp(
    configs,
    ALL_COMPONENTS,
    prop,
  )
  if (allConfig) {
    return allConfig[ALL_COMPONENTS][prop]
  }

  return typeof defaultValue === 'function' ? defaultValue() : defaultValue
}

export const getContextableProps = (
  componentProps: Record<string, PropOptions>,
  propsData: Record<string, any>,
) => {
  const props: Record<string, any> = {}

  Object.entries(componentProps).forEach(([name, definition]) => {
    props[name] = new Proxy(props[name], {
      get () {
        // We want to fallback to context in 2 cases:
        // * prop value is undefined (allows user to dynamically enter/exit context).
        // * prop value is not defined
        if (!(name in propsData) || propsData[name] === undefined) {
          return getContextPropValue(this, name, definition.default)
        }
        // In other cases we return the prop itself.
        return propsData[name]
      },
    })
  })

  return props
}

type Options = {
  componentProps: Record<string, PropOptions>;
  prefix: string;
};

// function componentFactory (Component, options = {}) {}
//
// function ComputedContextProps (options: Options) {
//   if (typeof options === 'function') {
//     return componentFactory(options)
//   }
//
//   return function (Component, options) {}
// }

@Component
class ContextablePropsMixin extends Mixins(ContextMixin) {
  [x: string]: any;

  beforeCreated () {
    // getComputedContextProps(this.$options.propsData)
  }
}

export default ContextablePropsMixin

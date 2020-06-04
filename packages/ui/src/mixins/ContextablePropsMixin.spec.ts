import { mount } from '@vue/test-utils'

import ContextablePropsMixin from './ContextablePropsMixin'
import ContextablePropsMixinText from './ContextablePropsMixinText.vue'

describe('ContextMixin', () => {
  it('should return the default configs set value', () => {
    const wrapper = mount(ContextablePropsMixinText)
  })
})

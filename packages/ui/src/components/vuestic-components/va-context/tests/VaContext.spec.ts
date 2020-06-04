import { mount } from '@vue/test-utils'

import VaContext from '../VaContext'

describe('VaContext', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaContext)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})

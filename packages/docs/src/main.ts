import { createApp } from 'vue'
import { createMetaManager, resolveOption, defaultConfig, useMeta } from 'vue-meta'
import App from './App.vue'
import router from './router'
import { i18n } from 'vue-lang-router'

// plugin to change algolia colors according docs theme
import AlgoliaColorPlugin from './components/sidebar/algolia-search/algolia-color-plugin'
import { VuesticPlugin } from 'vuestic-ui/src/main'
import { VuesticConfig } from './config/vuestic-config'

// TODO: figure it out
// https://github.com/nuxt/vue-meta/blob/next/examples/vue-router/main.js
const decisionMaker5000000 = resolveOption((prevValue, context) => {
  // @ts-ignore
  const { uid = 0 } = context.vm || {}
  // @ts-ignore
  if (!prevValue || prevValue < uid) {
    return uid
  }
})

const metaManager = createMetaManager({
  ...defaultConfig,
  esi: {
    group: true,
    namespaced: true,
    // @ts-ignore
    attributes: ['src', 'test', 'text'],
  },
}, decisionMaker5000000)

useMeta(
  {
    og: {
      something: 'test',
    },
  },
  metaManager,
) /**/

createApp(App)
  .use(router)
  .use(i18n)
  .use(AlgoliaColorPlugin)
  .use(VuesticPlugin, VuesticConfig)
  .use(metaManager)
  .mount('#app')

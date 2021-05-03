<template>
  <router-view />
</template>

<script>
import { useMeta, useActiveMeta } from 'vue-meta'
import emitter from 'tiny-emitter/instance'
import { genAppMetaInfo } from '@/utilities/metadata'
import { setColors } from '../../ui/src/main'
import { COLOR_THEMES, ThemeName } from './config/theme-config'

const eventBus = {
  $on: (...args) => emitter.on(...args),
  $once: (...args) => emitter.once(...args),
  $off: (...args) => emitter.off(...args),
  $emit: (...args) => emitter.emit(...args),
}

export default {
  data () {
    return {
      eventBus,
    }
  },

  setup () {
    // useMeta({
    //   title: 'My Example App',
    //   htmlAttrs: {
    //     lang: 'en',
    //     amp: true,
    //   },
    // })
    // const metainfo = useActiveMeta()
    //
    // console.log(metainfo)

    setColors(COLOR_THEMES[ThemeName.DEFAULT])
  },
}
</script>

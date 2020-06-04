<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import contextConfig from '../../components/page-configs/va-context/page-config'

@Component({
  components: {
    DocsContent,
  },
})
export default class Context extends Vue {
  get configComputed () {
    return contextConfig
  }
}
</script>

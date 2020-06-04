<template>
  <div class="contextable-props-mixin-test">
    <slot />
  </div>
</template>

<script lang="ts">
import { Mixins, Component } from 'vue-property-decorator'
import ContextablePropsMixin from './ContextablePropsMixin'

@Component({
  name: 'ContextablePropsMixinTest',
})
export default class extends Mixins(ContextablePropsMixin) {

}
</script>

<template>
  <div class="va-button-toggle">
    <va-button-group>
      <va-button
        v-for="option in options"
        :key="option.value"
        :style="buttonStyle(option.value)"
        :outline="outline"
        :flat="flat"
        :disabled="disabled"
        :size="size"
        :color="buttonColor(option.value)"
        :class="buttonClass(option.value)"
        @click="changeValue(option.value)"
      >
        {{ option.label }}
      </va-button>
    </va-button-group>
  </div>
</template>

<script>
import VaButtonGroup from '../va-button-group/VaButtonGroup'
import { getGradientBackground } from '../../../services/color-functions'
import VaButton from '../va-button/VaButton'

export default {
  name: 'VaButtonToggle',
  components: {
    VaButtonGroup,
    VaButton,
  },
  props: {
    options: {
      type: Array,
      default () {
        return []
      },
    },
    value: {
      type: [String, Number],
      default: '',
    },
    outline: {
      type: Boolean,
    },
    flat: {
      type: Boolean,
    },
    disabled: {
      type: Boolean,
    },
    size: {
      type: String,
      default: 'medium',
      validator: value => {
        return ['medium', 'small', 'large'].includes(value)
      },
    },
    color: {
      type: String,
      default: 'success',
    },
    toggleColor: {
      type: String,
      default: '',
    },
  },
  methods: {
    buttonColor (buttonValue) {
      return buttonValue === this.value && this.toggleColor ? this.toggleColor : this.color
    },
    buttonStyle (buttonValue) {
      if (buttonValue !== this.value) {
        return {}
      }

      if (this.outline || this.flat) {
        return {
          backgroundColor: this.$themes[this.toggleColor ? this.toggleColor : this.color],
          color: '#ffffff',
        }
      } else {
        return {
          backgroundColor: getGradientBackground(this.$themes[this.color]),
          filter: 'brightness(85%)',
        }
      }
    },
    buttonClass (buttonValue) {
      return {
        'va-button--active': buttonValue === this.value,
      }
    },
    changeValue (value) {
      this.$emit('input', value)
    },
  },
}
</script>
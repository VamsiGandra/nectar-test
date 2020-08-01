<template>
  <v-text-field
    v-model="displayValue"
    v-bind="$attrs"
    @blur="isInputActive = false"
    @focus="isInputActive = true"
  ></v-text-field>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: null,
    },
  },
  data: () => ({
    isInputActive: false,
  }),
  computed: {
    displayValue: {
      get: function () {
        if (this.isInputActive) {
          return this.value ? this.value.toString() : null
        } else {
          return this.value
            ? '$ ' +
                this.value
                  .toFixed(2)
                  .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
            : null
        }
      },
      set: function (modifiedValue) {
        let newValue = parseFloat(modifiedValue.replace(/[^\d.]/g, ''))
        if (isNaN(newValue)) {
          newValue = 0
        }
        this.$emit('input', newValue)
      },
    },
  },
}
</script>

<style></style>

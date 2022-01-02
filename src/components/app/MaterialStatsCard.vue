<template>
  <material-card
    class="v-card--material-stats"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template #subtitle>
      <div
        class="text-right text-h3 v-card__subtitle--material-stats"
        v-text="value"
      />
    </template>

    <template #actions>
      <slot name="actions" />
    </template>

    <slot />
  </material-card>
</template>

<script>
import MaterialCard from "./MaterialCard.vue";
export default {
  name: "MaterialStatCard",

  props: { value: String },
  components: {
    MaterialCard,
  },
};
</script>

<style lang="sass" scoped>
.v-card--material-stats.v-card--material .v-card--material__title
  color: #999999
  font-size: .875rem !important
  margin-left: auto
  text-align: right

.v-card__subtitle--material-stats
  color: #3C4858

.text-h3
  font-size: 1.5625rem !important
  font-weight: 300
  line-height: 1.4em
  letter-spacing: normal !important
  font-family: "Roboto", sans-serif !important
</style>

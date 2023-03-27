<template>
    <material-card
      v-bind="$attrs"
      class="v-card--material-generic-chart"
      full-header
    >
      <template #heading>
        <div class="pa-4">
        <slot name="heading" />
        </div>
      </template>
  
      <template #subtitle>
        <slot name="subtitle" />
      </template>
  
      <slot />
  
      <template #actions>
        <slot name="actions" />
      </template>
    </material-card>
  </template>
  
  <script>
  import MaterialCard from "./MaterialCard.vue";
    export default {
      name: 'MaterialChartGenericCard',
      components:{MaterialCard},
  
      inheritAttrs: false,
  
      props: {
      },
    }
  </script>
  
<style lang="sass">
.v-card--material-generic-chart
  p
    color: #999

  .v-card--material__sheet
    width: 100%

    .ct-label
      color: rgba(255, 255, 255, 1)
      opacity: .7
      font-size: 0.875rem
      font-weight: 300

    .ct-grid
      stroke: hsla(0,0%,100%,.2)

    .ct-series-a .ct-point,
    .ct-series-a .ct-line,
    .ct-series-a .ct-bar,
    .ct-series-a .ct-slice-donut
        stroke: rgba(255,255,255,.8)

    .ct-series-a .ct-slice-pie,
    .ct-series-a .ct-area
        fill: rgba(255,255,255,.4)
</style>

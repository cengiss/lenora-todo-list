<template>
  <v-btn
  @click="$store.commit('sortingToggle')"
  class="done-sorting"
  color="teal lighten-4"
  >
      Sorting Completed!
  </v-btn>
</template>

<script>
export default {

}
</script>

<style lang="sass">

    .done-sorting
      position: fixed
      bottom: 20px
      left: 50%
      transform: translateX(-50%)

</style>
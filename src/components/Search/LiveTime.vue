<template>
  <div class="text-caption ml-5">
    {{ date }}
  </div>
</template>

<script>
import { format } from 'date-fns'

export default {
  data() {
    return {
      date: ''
    }
  },
  methods: {
    getDate() {
      this.date = format(new Date(), ' do MMMM yyyy, HH:mm:ss')
      setTimeout(this.getDate, 1000)
    }
  },
  mounted() {
    this.getDate()
  }
}
</script>

<style>

</style>
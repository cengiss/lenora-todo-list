<template>
  <v-dialog
    ref="dialog"
    :value="true"
    :return-value.sync="date"
    persistent
    width="290px"
  >
    <v-date-picker
      v-model="date"
      color="cyan darken-3"
      scrollable
    >
      <v-spacer></v-spacer>
      <v-btn
        @click="$emit('close')"
        text
        color="red"
      >
        Cancel
      </v-btn>
      <v-btn
        @click="editTask"
        text
        color="green"
      >
        Save
      </v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
export default {
  props: ['task'],
  data() {
    return {
      date: null
    }
  },
  methods: {
    editTask() {
      let payload = {
        id: this.task.id,
        dueDate: this.date
      }
      this.$store.dispatch('editTaskDueDate', payload)
      this.$emit('close')
    }
  },
  mounted() {
    if (this.task.dueDate) {
      this.date = this.task.dueDate
    }
  }
}
</script>

<style>

</style>
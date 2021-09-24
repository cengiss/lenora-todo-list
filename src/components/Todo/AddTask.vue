<template>
      <v-text-field
         v-model="newTitle"
         @keyup.enter="addNewTask"
         class="field-add-task pa-2"
         outlined
         label="New Task"
         color="white"
         hide-details
         clearable
     >
            <template v-slot:append>
              <v-icon
              @click="addNewTask"
              color="white"
              :disabled="newTitleInvalid"
              >
               mdi-plus-circle-outline 
              </v-icon>
            </template>
     </v-text-field>
</template>

<script>
export default {
    data() {
      return{
        newTitle: '',
      }
    },
    computed: {
      newTitleInvalid() {
        return !this.newTitle
      }
    },
    methods: {
      addNewTask() {
        if(!this.newTitleInvalid){
        this.$store.dispatch('addNewTask', this.newTitle)
        this.newTitle = ''
        }
      },
    },
}
</script>

<style lang="sass">
  .field-add-task.v-input--is-focused
    .v-input__slot
      background: rgba(56,125,137, 0.6)
</style>
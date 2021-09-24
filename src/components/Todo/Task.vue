<template>
    <div>
         <v-list-item 
         @click="$store.dispatch('taskDone', task.id)"
         :class="{ 'teal lighten-4' : task.done}"
         class="white"
         :ripple="false"
         >
          <template v-slot:default>
            <v-list-item-action>
              <v-checkbox
                :input-value="task.done"
                color="cyan darken-3"
              ></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title
              :class="{'text-decoration-line-through' : task.done }"
              >
              {{ task.title }}</v-list-item-title>
            </v-list-item-content>
              <v-list-item-action v-if="task.dueDate">
                <v-list-item-action-text>
                  <v-icon small>
                    mdi-calendar-range 
                  </v-icon>
                  {{ task.dueDate | specialDate}}
                  </v-list-item-action-text>

              </v-list-item-action>



            <v-list-item-action>
              <menu-task :task="task" />
            </v-list-item-action>
            <v-list-item-action
              v-if="$store.state.sorting"
            >
               <v-btn
                color="cyan darken-3"
                class="handle"
                icon
                >
                <v-icon>mdi-sort</v-icon>
              </v-btn>

            </v-list-item-action>

          </template>

        </v-list-item>
        <v-divider></v-divider>
        </div>
</template>

<script>
import { format } from 'date-fns'

export default {
    props: ['task'],
    filters: {
      specialDate(value) {
        return format(new Date(value), 'do MMMM yyyy')
      }
    },
    components: {
      'menu-task': require('@/components/Todo/Menu.vue').default
  }
}
</script>

<style lang="sass">
  .sortable.ghost
    opacity: 0
  .sortable-drag
    box-shadow: 0 0 10px rgba(0,0,0,0.3)


</style>
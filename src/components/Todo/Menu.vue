<template>
  <div>
 <v-menu
            bottom
            left
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="cyan darken-3"
                icon
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-dots-horizontal-circle-outline</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                v-for="(item, i) in items"
                :key="i"
                @click="menuClick(i)"
              >
          <v-list-item-icon>
          <v-icon v-text="item.icon"></v-icon>
        </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>


     <delete-dialog 
        v-if="dialogs.delete" @close="dialogs.delete = false" :task="task"
        />
     <edit-dialog 
        v-if="dialogs.edit" @close="dialogs.edit = false" :task="task"
        />
     <date-dialog 
        v-if="dialogs.dueDate" @close="dialogs.dueDate = false" :task="task"
        />        

  </div>

</template>

<script>
export default {
    props: ['task'],
    data: () => ({
        dialogs: {
          delete: false,        
          edit: false,
          dueDate: false
        },
        items: [
            { 
              title: 'Delete',
              icon: 'mdi-delete-outline',
              click() {
                this.dialogs.delete = true
              }
            },
            { 
              title: 'Edit' ,
              icon: 'mdi-pencil-outline',
              click() {
                this.dialogs.edit = true
              }
            },
            { 
              title: 'Sort',
              icon: 'mdi-sort',
              click() {
                if (!this.$store.state.search) {
                this.$store.commit('sortingToggle')
                }
                else{
                  this.$store.commit('showSnackbar', 'You can not sort while searching!')
                }
              }
            },
            {
              title: 'Due Date' ,
              icon: 'mdi-calendar-range',
              click() {
                this.dialogs.dueDate = true
              }
            },
        ],
    }),
    methods: {
      menuClick(i) {
        this.items[i].click.call(this)
      }
    },
    components: {
       'delete-dialog': require('@/components/Todo/Dialogs/DeleteDialog.vue').default,
       'edit-dialog': require('@/components/Todo/Dialogs/EditDialog.vue').default,
       'date-dialog': require('@/components/Todo/Dialogs/DateDialog.vue').default
    }
}
</script>

<style>

</style>
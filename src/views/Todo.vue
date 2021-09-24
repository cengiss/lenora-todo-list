<template>
  <div class="home">

    <tasks-list
    v-if="$store.state.tasks.length"
    />

    <no-tasks 
    v-else
    />

    <done-sorting 
    v-if="$store.state.sorting"
    />


  </div>
</template>

<script>
  export default {
    name: 'Home',
    components: {
      'tasks-list': require('@/components/Todo/TasksList.vue').default,
      'no-tasks': require('@/components/Todo/NoTasks.vue').default,
      'done-sorting': require('@/components/Todo/DoneSorting.vue').default,
    }
  }
</script>

import Vue from 'vue'
import Vuex from 'vuex'
import Localbase from 'localbase'

let db = new Localbase('db')
db.config.debug = false

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appTitle: process.env.VUE_APP_TITLE,
    search: null,
    tasks: [
          
      /*{
        id: 1,
        title: 'Go to the cinema',
        done: false,
        dueDate: '6-29-2021'
      },
       {
        id: 2,
        title: 'Do your homework',
        done: false,
        dueDate: '10-09-2021'
      },
       {
        id: 3,
        title: 'Eat an apple',
        done: false,
        dueDate: null
      }*/
    ],
    snackbar: {
      show: false,
      text: ''
    },
    sorting: false
  },
  mutations: {
    setSearch(state, value) {
      state.search = value
    },
    addNewTask(state, newTask){
      state.tasks.push(newTask)
    },
    taskDone(state, id) {
      let task = state.tasks.filter(task => task.id === id)[0]
      task.done = !task.done
    },
    taskDelete(state, id){
      state.tasks = state.tasks.filter(task => task.id !== id)
  },
  editListTitle(state, payload) {
    let task = state.tasks.filter(task => task.id === payload.id)[0]
    task.title = payload.title
  },
  editTaskDueDate(state, payload) {
    let task = state.tasks.filter(task => task.id === payload.id)[0]
    task.dueDate = payload.dueDate
  },
  setTasks(state, tasks) {
    state.tasks = tasks
  },
  showSnackbar(state, text) {
    let timeout = 0
    if (state.snackbar.show) {
      state.snackbar.show = false
      timeout = 100
    }
    setTimeout(() => {
      state.snackbar.show = true
      state.snackbar.text = text
    }, timeout)
   },
   hideSnack(state) {
     state.snackbar.show = false
   },
   sortingToggle(state) {
     state.sorting = !state.sorting
   }
  },
  actions: {
    addNewTask({commit}, newTitle) {
      let newTask = {
        id: Date.now(),
        title: newTitle,
        done: false,
        dueDate: null
      }
      db.collection('tasks').add(newTask).then(()=>{
        commit('addNewTask', newTask)
        commit('showSnackbar', 'A new to do list item is added!')
      })
    },
    taskDone({state, commit}, id){
      let task = state.tasks.filter(task => task.id === id)[0]
      db.collection('tasks').doc({ id: id }).update({
        done: !task.done
      }).then(() =>{
        commit('taskDone', id)
      })
    },
    taskDelete({commit}, id) {
      db.collection('tasks').doc({ id: id }).delete().then(() => {
        commit('taskDelete', id)
        commit('showSnackbar', 'Deleted!')
      })
    },
    editListTitle({commit},payload) {
      db.collection('tasks').doc({ id: payload.id }).update({
        title: payload.title
      }).then(() => {
        commit('editListTitle',payload)
        commit('showSnackbar','To do list item is edited!')
      })
    },
    editTaskDueDate({commit},payload) {
      db.collection('tasks').doc({ id: payload.id }).update({
        dueDate: payload.dueDate
      }).then(() => {
        commit('editTaskDueDate',payload)
        commit('showSnackbar','Date is added!')
      })
    },
    setTasks({ commit }, tasks) {
      db.collection('tasks').set(tasks)
      commit('setTasks', tasks)
    },
    getTasks({commit}) {
     db.collection('tasks').get().then(tasks =>{
      commit('setTasks', tasks)
     }) 
    }    
  },
  getters: {
    filteredTasks(state) {
      if (!state.search) {
        return state.tasks
      }
      return state.tasks.filter(task => task.title.toLowerCase().includes(state.search.toLowerCase()))
    }
  }
})

<template>
  <v-app id="inspire">
         <v-navigation-drawer
         v-model="drawer"
         :mobile-breakpoint="768"
         app
         >
    <v-img
      class="pa-5 pt-4"
      src="nature.jpg"
      height="150"
      gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
    >
        <v-avatar size="70" class="mb-1">
      <img
        src="lenora.jpeg"
        alt="Lenora"
      >
    </v-avatar>
    <div class="white--text text-subtitle-1 font-weight-bold">Lenora Bilişim</div>
    <div class="white--text text-subtitle-2">lenorabilisim</div>
    </v-img>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

     <v-app-bar
      app
      color="#fcb69f"
      dark
      shrink-on-scroll
      src="nature.jpg"
      scroll-target="#scrolling-techniques-2"
      prominent
      :height="$route.path === '/' ? '205' : '150'"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <v-container class="title-container pl-0">
        <v-row>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <search />
        </v-row>
        <v-row>
          <v-app-bar-title class="ml-4 text-h5 font-weight-bold">{{ $store.state.appTitle }}</v-app-bar-title>          
        </v-row> 
        <v-row>
          <live-time />
          </v-row>  
          <v-row v-if="$route.path === '/'">
            <add-task />
          </v-row>     
      </v-container>

    </v-app-bar>

    <v-main>
      <router-view></router-view>
      <snackbar />
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({ 
      drawer: null,
       items: [
          { title: 'Todo List', icon: 'mdi-list-status', to: '/' },
          { title: 'About', icon: 'mdi-information-outline', to: '/about' },
        ],
      }),
      mounted() {
        this.$store.dispatch('getTasks')
      },
      components: {
        'search': require('@/components/Search/SearchTool.vue').default,
        'live-time': require('@/components/Search/LiveTime.vue').default,
        'add-task': require('@/components/Todo/AddTask.vue').default,
        'snackbar': require('@/components/Shared/Snackbar.vue').default
      }
  }
</script>

<style lang="sass">
  .title-container
    max-width: none !important
</style>
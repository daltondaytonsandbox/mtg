<template>
  <v-app>
    <nav-bar app></nav-bar>

    <v-content>
      <v-container fluid>
        <transition name="slide-fade" appear>
          <nuxt />
        </transition>
      </v-container>
    </v-content>

    <NotificationContainer />
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import NotificationContainer from '@/components/NotificationContainer.vue'

export default {
  components: {
    NavBar,
    NotificationContainer
  }
}
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

/* .notification-container {
  position: absolute;
  bottom: 0;
  right: 0;
} */
</style>

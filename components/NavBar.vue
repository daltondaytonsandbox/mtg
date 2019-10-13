<template>
  <div>
    <v-app-bar app color="primary" dark>
      <router-link id="brand" to="/" tag="v-toolbar-title">
        MTG App
      </router-link>
      <v-spacer></v-spacer>
      <v-btn
        v-for="link in links"
        :key="`${link.label}-header-link`"
        text
        rounded
        :to="link.url"
      >
        {{ link.label }}
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      links: [
        {
          label: 'Home',
          url: '/'
        },
        {
          label: 'Test',
          url: '/test'
        }
      ]
    }
  }
}
</script>

<style scoped>
#brand {
  cursor: pointer;
}
</style>

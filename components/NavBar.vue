<template>
  <div>
    <v-app-bar app color="indigo" dark>
      <router-link id="brand" to="/">
        <img id="brandLogo" src="~/assets/logo.png" />
      </router-link>

      <v-toolbar-title>galdr</v-toolbar-title>

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
        },
        {
          label: 'Log in',
          url: '/login'
        },
        {
          label: 'Register',
          url: '/register'
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

#brandLogo {
  height: 55px;
  margin: 5px 10px 0 0;
}
</style>

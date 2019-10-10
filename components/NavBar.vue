<template>
  <div>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>
        MTG App
      </v-toolbar-title>
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
          label: 'Dashboard',
          url: '/'
        },
        {
          label: 'Collection',
          url: '/collection'
        }
      ]
    }
  }
}
</script>

<style scoped></style>

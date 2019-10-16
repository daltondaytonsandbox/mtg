<template>
  <div>
    <h1 class="text-center">Collection</h1>
    <v-container>
      <v-text-field
        v-model="searchInput"
        label="Search"
        @keyup.enter="searchCards"
      ></v-text-field>
      <ul>
        <li v-for="card in cards" :key="card._id">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <span v-on="on">
                {{ card.name }}
              </span>
            </template>
            <span><img :src="card.image_uris.normal" :alt="card.name"/></span>
          </v-tooltip>
        </li>
      </ul>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cards: [],
      searchInput: ''
    }
  },
  methods: {
    async searchCards() {
      console.log('search')

      this.cards = await this.$axios.$get('/api/cards', {
        params: {
          searchInput: this.searchInput
        }
      })
    }
  }
}
</script>

<style scoped></style>

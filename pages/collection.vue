<template>
  <div>
    <h1 class="text-center">Collection</h1>

    <CardCard :card="cards" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CardCard from '@/components/CardCard.vue'

export default {
  components: {
    CardCard
  },
  computed: mapState({
    cards: (state) => state.cards.cards
  }),
  async fetch({ store, error }) {
    try {
      await store.dispatch('cards/fetchCards')
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable to fetch cards at this time. Please try again.'
      })
    }
  }
}
</script>

<style scoped></style>

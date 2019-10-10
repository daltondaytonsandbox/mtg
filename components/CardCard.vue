<template>
  <div>
    <v-card max-width="520" class="mx-auto">
      <!-- <v-card-title>{{ card.name }}</v-card-title> -->
      <v-card-text>
        <img :src="card.image_uris.normal" />
      </v-card-text>
    </v-card>
    {{ card }}
  </div>
</template>

<script>
export default {
  name: 'CardCard',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    card: Object
  }
}
</script>

<style scoped></style>

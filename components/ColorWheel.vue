<template>
  <div>
    <h3>Color Wheel</h3>
    <div class="wheelContainer">
      <img class="colorButton" src="../assets/colors/white.png" alt="white" />
      <img class="colorButton" src="../assets/colors/blue.png" alt="blue" />
      <img class="colorButton" src="../assets/colors/green.png" alt="green" />
      <img class="colorButton" src="../assets/colors/black.png" alt="black" />
      <img class="colorButton" src="../assets/colors/red.png" alt="red" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      colors: {
        White: 'Mono White',
        Blue: 'Mono Blue',
        Green: 'Mono Green',
        Black: 'Mono Black',
        Red: 'Mono Red'
      }
    }
  }
}
</script>

<style scoped></style>

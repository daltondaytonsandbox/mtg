<template>
  <div>
    <h1 class="text-center">To Do</h1>

    <v-container>
      <v-form>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field v-model="task" label="Task" required></v-text-field>
          </v-col>
        </v-row>
        <v-btn class="mr-4" @click.prevent="submit">submit</v-btn>
        <input @keyup.enter="submit" />
      </v-form>

      <br />
      <v-divider />
      <br />
      <ol>
        <li v-for="task in tasks" :key="task.id">
          <v-container>
            <v-layout>
              <div :class="[{ checked: isDone }]">{{ task.task }}</div>
              &nbsp;
              <v-icon @click="removeTask(task)">
                mdi-close
              </v-icon>
            </v-layout>
          </v-container>
        </li>
      </ol>
    </v-container>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const tasks = await $axios.$get('/api/tasks')
    return { tasks }
  },
  methods: {
    async submit() {
      await this.$axios.$post('/api/tasks', {
        task: this.task
      })
      this.task = ''

      this.tasks = await this.$axios.$get('/api/tasks')
    },
    async removeTask(task) {
      await this.$axios.delete('/api/tasks/' + task._id)
      this.tasks = await this.$axios.$get('/api/tasks')
    }
  }
}
</script>

<style scoped>
.checked {
  text-decoration: line-through;
}
</style>

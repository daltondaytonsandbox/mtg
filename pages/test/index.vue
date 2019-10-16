<template>
  <div>
    <v-row>
      <v-col>
        <h1>ToDo List</h1>
        <v-container>
          <v-form>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="task"
                  label="Task"
                  required
                ></v-text-field>
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
      </v-col>
      <v-divider class="mx-4" vertical></v-divider>
      <v-col>
        <h1>Account List</h1>
        <ul>
          <li v-for="user in users" :key="user._id">
            <v-btn @click="removeUser(user)">X</v-btn>
            {{ user }}
          </li>
        </ul>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const users = await $axios.$get('/api/users')
    const tasks = await $axios.$get('/api/tasks')
    return {
      users,
      tasks
    }
  },
  methods: {
    async removeUser(user) {
      await this.$axios.delete('/api/users/' + user._id)
      this.users = await this.$axios.$get('/api/users')
    },
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

<style scoped></style>

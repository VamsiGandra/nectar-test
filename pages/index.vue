<template>
  <v-row justify="center">
    <v-col cols="8">
      <v-row justify="center">
        <v-col cols="6"><h1>Applications list</h1> </v-col>
        <v-col cols="6" class="text-right">
          <v-btn
            class="mt-1"
            color="primary"
            rounded
            large
            @click="newApplicationDialog = true"
          >
            <v-icon class="mr-2">mdi-plus</v-icon>New Application</v-btn
          ></v-col
        >
      </v-row>
      <v-dialog
        v-if="newApplicationDialog"
        v-model="newApplicationDialog"
        width="500"
      >
        <CreateApplication @new-application="createApplication" />
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
import CreateApplication from '~/components/CreateApplication'

export default {
  components: {
    CreateApplication,
  },
  data: () => ({
    newApplicationDialog: false,
  }),
  methods: {
    createApplication(data) {
      console.log('application created', data)
      this.newApplicationDialog = false
    },
  },
}
</script>

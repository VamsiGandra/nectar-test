<template>
  <v-row justify="center">
    <v-col sm="12" md="8">
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
      <ApplicationsList :applications="applications" />
      <div v-if="applications.length">
        <v-row>
          <v-col class="py-0">Total Lended: {{ totalLended }}</v-col>
        </v-row>
        <v-row>
          <v-col class="py-0"
            >Total weekly payments: {{ totalWeeklyPayment }}</v-col
          >
        </v-row>
        <v-row>
          <v-col class="py-0">Total declined: {{ totalDeclined }}</v-col>
        </v-row>
      </div>
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
import ApplicationsList from '~/components/ApplicationsList'

export default {
  components: {
    CreateApplication,
    ApplicationsList,
  },
  data: () => ({
    newApplicationDialog: false,
    applications: [],
  }),
  computed: {
    totalLended() {
      return this.applications.reduce((a, b) => a + b.requestedAmount, 0)
    },
    totalWeeklyPayment() {
      return this.applications.reduce((a, b) => a + b.weeklyRepayment, 0)
    },
    totalDeclined() {
      return this.applications.reduce((a, b) => a + b.requestedAmount, 0)
    },
  },
  methods: {
    createApplication(data) {
      console.log('application created', data)
      this.applications.push(data)
      this.newApplicationDialog = false
    },
  },
}
</script>

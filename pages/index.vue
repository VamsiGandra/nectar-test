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
            data-testid="newApplicationButton"
            large
            @click="newApplicationDialog = true"
          >
            <v-icon class="mr-2">mdi-plus</v-icon>New Application</v-btn
          ></v-col
        >
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-select
            v-model="filterSelected"
            prepend-icon="mdi-filter"
            data-testid="applicationFilter"
            label="Filter Applications"
            :items="filterItems"
          ></v-select>
        </v-col>
      </v-row>
      <ApplicationsList :applications="filteredApplications" />
      <div v-if="applications.length" class="mt-6">
        <v-row
          v-if="
            filterSelected === applicationStatus.APPROVED ||
            filterSelected === 'All'
          "
        >
          <v-col class="py-0"
            >Total Lended: $
            <span data-testid="totalLendedAmount">{{ totalLended }}</span>
          </v-col>
        </v-row>
        <v-row
          v-if="
            filterSelected === applicationStatus.APPROVED ||
            filterSelected === 'All'
          "
        >
          <v-col class="py-0"
            >Total weekly payments: $
            <span data-testid="totalWeeklyPaymentAmount">{{
              totalWeeklyPayment
            }}</span>
          </v-col>
        </v-row>
        <v-row
          v-if="
            filterSelected === applicationStatus.DECLINED ||
            filterSelected === 'All'
          "
        >
          <v-col class="py-0"
            >Total declined: $
            <span data-testid="totalDeclinedAmount">{{ totalDeclined }}</span>
          </v-col>
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

import { ApplicationStatus } from '~/helpers/models'
import { statusItems } from '~/helpers/db'

export default {
  components: {
    CreateApplication,
    ApplicationsList,
  },
  data: () => ({
    newApplicationDialog: false,
    applications: [],
    filterItems: ['All', ...statusItems],
    filterSelected: 'All',
    applicationStatus: { ...ApplicationStatus },
  }),
  computed: {
    approvedApplications() {
      return this.applications.filter(
        (application) => application.status === ApplicationStatus.APPROVED
      )
    },
    declinedApplications() {
      return this.applications.filter(
        (application) => application.status === ApplicationStatus.DECLINED
      )
    },
    totalLended() {
      return this.approvedApplications
        .reduce((a, b) => a + b.requestedAmount, 0)
        .toFixed(2)
    },
    totalWeeklyPayment() {
      return this.approvedApplications
        .reduce((a, b) => a + b.weeklyRepayment, 0)
        .toFixed(2)
    },
    totalDeclined() {
      return this.declinedApplications
        .reduce((a, b) => a + b.requestedAmount, 0)
        .toFixed(2)
    },
    filteredApplications() {
      if (this.filterSelected === ApplicationStatus.APPROVED) {
        return this.approvedApplications
      } else if (this.filterSelected === ApplicationStatus.DECLINED) {
        return this.declinedApplications
      } else {
        return this.applications
      }
    },
  },
  methods: {
    createApplication(data) {
      this.applications.push(data)
      this.newApplicationDialog = false
    },
  },
}
</script>

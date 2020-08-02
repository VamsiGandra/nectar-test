<template>
  <v-simple-table data-testid="applicationsListTable">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Amount</th>
          <th class="text-left">Term</th>
          <th class="text-left">Weekly Payment</th>
          <th class="text-left">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(application, i) in applications" :key="i">
          <td>{{ application.fullName }}</td>
          <td>$ {{ application.requestedAmount }}</td>
          <td>{{ application.term }}</td>
          <td>$ {{ application.weeklyRepayment }}</td>
          <td>{{ application.status }}</td>
        </tr>
        <v-row v-if="!applications.length">
          <v-col>
            No Applications found. Please add by clicking the button above
          </v-col>
        </v-row>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  props: {
    applications: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style>
tbody tr:nth-child(1) {
  background-color: #cdfeff;
}
</style>

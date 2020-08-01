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
        <tr v-if="!applications.length">
          No Applications found. Please add by clicking the button above
        </tr>
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

<style></style>

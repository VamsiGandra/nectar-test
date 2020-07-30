<template>
  <v-card class="pa-4">
    <v-card-title class="title">New Application Form</v-card-title>
    <v-row>
      <v-col class="px-6">
        <v-form
          ref="form"
          v-model="valid"
          :lazy-validation="lazy"
          @keyup.native.enter="createApplication"
        >
          <v-text-field
            v-model="fullName"
            data-testid="fullName"
            autocomplete="off"
            :rules="fullNameRules"
            label="Full Name"
          ></v-text-field>
          <v-text-field
            v-model.number="requestedAmount"
            type="number"
            autocomplete="off"
            :rules="requestedAmountRules"
            data-testid="requestedAmount"
            label="Requested amount"
          >
          </v-text-field>
          <v-select
            v-model.number="termWeeks"
            data-testid="term"
            label="Term(6 months, 1 year, 2 years)"
            :rules="[(v) => !!v || 'Term is required']"
            :items="termItems"
            item-value="weeks"
            item-text="text"
          ></v-select>
          <v-select
            v-model="status"
            :rules="[(v) => !!v || 'Status is required']"
            data-testid="status"
            label="Status"
            :items="statusItems"
          ></v-select>
          <v-text-field
            :value="weeklyRepayment"
            data-testid="weeklyRepayment"
            readonly
            label="Weekly repayment"
            placeholder="N/A"
          ></v-text-field>
        </v-form>
      </v-col>
    </v-row>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        data-testid="createApplicationButton"
        class="mx-2 px-8"
        color="primary"
        rounded
        large
        type="submit"
        @click="createApplication"
        >Create</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    lazy: true,
    termItems: [
      {
        text: '6 Months',
        weeks: 26,
      },
      {
        text: '1 year',
        weeks: 52,
      },
      {
        text: '2 years',
        weeks: 104,
      },
    ],
    statusItems: ['approved', 'declined'],
    fullName: '',
    requestedAmount: null,
    termWeeks: null,
    status: null,
    fullNameRules: [(v) => !!v || 'Full name is required'],
    requestedAmountRules: [(v) => !!v || 'Requested amount is required'],
  }),
  computed: {
    weeklyRepayment() {
      if (this.termWeeks && this.requestedAmount) {
        return parseInt((this.requestedAmount / this.termWeeks).toFixed(2))
      } else {
        return null
      }
    },
  },
  methods: {
    createApplication() {
      if (this.$refs.form.validate()) {
        const newApplication = {
          fullName: this.fullName,
          requestedAmount: this.requestedAmount,
          term: this.termItems.find((term) => term.weeks === this.termWeeks)
            .text,
          status: this.status,
          weeklyRepayment: this.weeklyRepayment,
        }
        this.$emit('new-application', newApplication)
      }
    },
  },
}
</script>

<style></style>

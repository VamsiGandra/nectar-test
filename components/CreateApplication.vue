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
            v-model="application.fullName"
            data-testid="fullName"
            autocomplete="off"
            :rules="fullNameRules"
            label="Full Name"
          ></v-text-field>
          <CurrencyInput
            v-model.number="application.requestedAmount"
            :rules="requestedAmountRules"
            autocomplete="off"
            data-testid="requestedAmount"
            label="Requested amount"
          >
          </CurrencyInput>
          <v-select
            v-model.number="application.termWeeks"
            data-testid="term"
            label="Term(6 months, 1 year, 2 years)"
            :rules="[(v) => !!v || 'Term is required']"
            :items="termItems"
            item-value="weeks"
            item-text="text"
          ></v-select>
          <v-select
            v-model="application.status"
            :rules="[(v) => !!v || 'Status is required']"
            data-testid="status"
            label="Status"
            :items="statusItems"
          ></v-select>
          <v-text-field
            :value="weeklyRepayment"
            data-testid="weeklyRepayment"
            readonly
            type="number"
            label="Weekly repayment"
            placeholder="N/A"
          >
            <template v-slot:prepend>
              <div>$</div>
            </template>
          </v-text-field>
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
import { Application } from '~/helpers/models'
import { termItems, statusItems } from '~/helpers/db'
import CurrencyInput from './CurrencyInput'

export default {
  components: {
    CurrencyInput,
  },
  data: () => ({
    valid: true,
    lazy: true,
    termItems: [...termItems],
    statusItems: [...statusItems],
    application: { ...Application },
    fullNameRules: [
      (v) => !!v || 'Full name is required',
      (v) =>
        /^[ A-Za-z-']*$/.test(v) ||
        `Full name just accepts (a-z or A-Z), space, ' and -`,
    ],
    requestedAmountRules: [(v) => !!v || 'Requested amount is required'],
  }),
  computed: {
    weeklyRepayment() {
      const { termWeeks, requestedAmount } = this.application
      if (termWeeks && requestedAmount) {
        return parseFloat((requestedAmount / termWeeks).toFixed(2))
      } else {
        return null
      }
    },
  },
  methods: {
    createApplication() {
      if (this.$refs.form.validate()) {
        const newApplication = {
          ...this.application,
          ...{
            weeklyRepayment: this.weeklyRepayment,
            term: this.termItems.find(
              (term) => term.weeks === this.application.termWeeks
            ).text,
            createdAt: new Date(),
          },
        }
        this.$emit('new-application', newApplication)
      }
    },
  },
}
</script>

<style></style>

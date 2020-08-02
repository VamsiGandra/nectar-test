export const Application = {
  fullName: null,
  requestedAmount: null,
  term: null,
  termWeeks: null,
  status: null,
  weeklyRepayment: null,
  createdAt: null,
}

export const ApplicationStatus = Object.freeze({
  APPROVED: 'Approved',
  DECLINED: 'Declined',
})

export const applications = [
  {
    name: 'Bruce Wayne',
    amount: 30000,
    term: '2 years',
    termWeeks: 104,
    status: 'Declined',
    weeklyPayment: 288.46
  },
  {
    name: 'Clark Kent',
    amount: 3000,
    term: '6 Months',
    termWeeks: 26,
    status: 'Approved',
    weeklyPayment: 115.38

  },
  {
    name: 'Vamsi Reddy',
    amount: 1000,
    term: '2 years',
    termWeeks: 104,
    status: 'Approved',
    weeklyPayment: 9.62
  },
  {
    name: 'Zuko',
    amount: 4000,
    term: '1 year',
    termWeeks: 52,
    status: 'Approved',
    weeklyPayment: 76.92
  },
]

export const unacceptedNames = ['Vamsi. Reddy', 'vamsi/reddy', `vamsi'.s test`, 'VAMSI 2GANDRA']

export const acceptedNames = ['Vamsi Reddy', 'vamsi reddy', `vamsi's test`, 'VAMSI GANDRA']

export const applicationFilters = Object.freeze({
  ALL: 'All',
  APPROVED: 'Approved',
  DECLINED: 'Declined'
})

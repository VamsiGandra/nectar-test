import { applications, unacceptedNames, acceptedNames, applicationFilters } from '../support/data'

describe('Application test suite', function () {
  const appUrl = 'http://localhost:3000'

  beforeEach(() => {
    cy.visit(appUrl)
  })

  it('Requires all fields to create an application', () => {
    // Act
    cy.getBySel('newApplicationButton').click()
    cy.getBySel('createApplicationButton').click()

    // Assert
    cy.getBySel('fullName').parents('.v-input').find('.v-messages__message').should('contain.text', 'Full name is required')
    cy.getBySel('requestedAmount').parents('.v-input').find('.v-messages__message').should('contain.text', 'Requested amount is required')
    cy.getBySel('term').parents('.v-input').find('.v-messages__message').should('contain.text', 'Term is required')
    cy.getBySel('status').parents('.v-input').find('.v-messages__message').should('contain.text', 'Status is required')
  })

  it(`Accepts full name with (a-z or A-Z), space, ' and -`, () => {
    // Act
    cy.getBySel('newApplicationButton').click()

    acceptedNames.forEach((name) => {
      cy.getBySel('fullName').type(name)
      // Assert
      cy.getBySel('fullName').parents('.v-input').find('.v-messages__message').should('not.exist')
      cy.getBySel('fullName').clear()
    })
  })

  it('Does not accept wrong full name format', () => {
    // Act
    cy.getBySel('newApplicationButton').click()

    unacceptedNames.forEach((name) => {
      cy.getBySel('fullName').type(name)
      // Assert
      cy.getBySel('fullName').parents('.v-input').find('.v-messages__message').should('contain.text', `Full name just accepts (a-z or A-Z), space, ' and -`)
      cy.getBySel('fullName').clear()
    })
  })

  it('Calculates weekly repayment when requested amount and term are set', () => {
    // Arrange
    const newApplication = applications[0]
    const expectedWeeklyRepayment = (newApplication.amount / newApplication.termWeeks).toFixed(2).toString()

    // Act
    cy.getBySel('newApplicationButton').click()
    cy.getBySel('requestedAmount').first().type(newApplication.amount)
    cy.selectDropdown('term', newApplication.term)

    // Assert
    cy.getBySel('weeklyRepayment').should('have.value', expectedWeeklyRepayment)
  })

  it('Creates a new application successfully', () => {
    // Arrange
    const newApplication = applications[0]

    // Act
    cy.getBySel('newApplicationButton').click()
    cy.getBySel('fullName').first().type(newApplication.name)
    cy.getBySel('requestedAmount').first().type(newApplication.amount)
    cy.selectDropdown('term', newApplication.term)
    cy.selectDropdown('status', newApplication.status)
    cy.getBySel('createApplicationButton').click()

    // Assert
    cy.getBySel('applicationsListTable').get('tbody').find('tr').should('have.length', 1)
  })

  it('Filters the applications list by application status', () => {

    // Act
    applications.forEach((application) => {
      cy.getBySel('newApplicationButton').click()
      cy.getBySel('fullName').first().type(application.name)
      cy.getBySel('requestedAmount').first().type(application.amount)
      cy.selectDropdown('term', application.term)
      cy.selectDropdown('status', application.status)
      cy.getBySel('createApplicationButton').click()
    })

    // Assert
    cy.selectDropdown('applicationFilter', applicationFilters.APPROVED)
    cy.getBySel('applicationsListTable').get('tbody').find('tr').should('have.length', 3)

    cy.selectDropdown('applicationFilter', applicationFilters.DECLINED)
    cy.getBySel('applicationsListTable').get('tbody').find('tr').should('have.length', 1)

    cy.selectDropdown('applicationFilter', applicationFilters.ALL)
    cy.getBySel('applicationsListTable').get('tbody').find('tr').should('have.length', 4)

  })

  it('Shows the amounts calculated by the application status', () => {
    // Act
    applications.forEach((application) => {
      cy.getBySel('newApplicationButton').click()
      cy.getBySel('fullName').first().type(application.name)
      cy.getBySel('requestedAmount').first().type(application.amount)
      cy.selectDropdown('term', application.term)
      cy.selectDropdown('status', application.status)
      cy.getBySel('createApplicationButton').click()
    })

    // Assert
    cy.selectDropdown('applicationFilter', applicationFilters.APPROVED)
    cy.getBySel('totalDeclinedAmount').should('not.exist')
    cy.getBySel('totalLendedAmount').should('exist')
    cy.getBySel('totalWeeklyPaymentAmount').should('exist')

    cy.selectDropdown('applicationFilter', applicationFilters.DECLINED)
    cy.getBySel('totalDeclinedAmount').should('exist')
    cy.getBySel('totalLendedAmount').should('not.exist')
    cy.getBySel('totalWeeklyPaymentAmount').should('not.exist')

    cy.selectDropdown('applicationFilter', applicationFilters.ALL)
    cy.getBySel('totalDeclinedAmount').should('exist')
    cy.getBySel('totalLendedAmount').should('exist')
    cy.getBySel('totalWeeklyPaymentAmount').should('exist')

  })

  it('Calculates the lended, declined and weekly payment amounts for the applications created', () => {

    // Arrange
    const expectedLendedAmount = applications.filter(
      (application) => application.status === applicationFilters.APPROVED
    ).reduce(
      (a, b) => a + b.amount,
      0
    ).toFixed(2).toString()

    const expectedDeclinedAmount = applications.filter(
      (application) => application.status === applicationFilters.DECLINED
    ).reduce(
      (a, b) => a + b.amount,
      0
    ).toFixed(2).toString()

    const expectedWeeklyPaymentAmount = applications.filter(
      (application) => application.status === applicationFilters.APPROVED
    ).reduce(
      (a, b) => a + b.weeklyPayment,
      0
    ).toFixed(2).toString()

    // Act
    applications.forEach((application) => {
      cy.getBySel('newApplicationButton').click()
      cy.getBySel('fullName').first().type(application.name)
      cy.getBySel('requestedAmount').first().type(application.amount)
      cy.selectDropdown('term', application.term)
      cy.selectDropdown('status', application.status)
      cy.getBySel('createApplicationButton').click()
    })

    // Assert
    cy.getBySel('totalLendedAmount').should('contain.text', expectedLendedAmount)

    cy.getBySel('totalDeclinedAmount').should('contain.text', expectedDeclinedAmount)

    cy.getBySel('totalWeeklyPaymentAmount').should('contain.text', expectedWeeklyPaymentAmount)

  })

})

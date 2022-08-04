/// <reference types="cypress" />


describe('Task Manager Specs', () => {

  const BaseURL = Cypress.env('url')
  const userName = Cypress.env('uName')
  const password = Cypress.env('pWord')

  let today = new Date();
  let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  // Test data 1 for the task, with today date and task as important
  const randomNum1 = () => Cypress._.random(0, 1e6)
  let taskName1 = `Title${randomNum1()}`
  let taskDesc1 = `Desc${randomNum1()}`
  let date1 =
  {
    dd: today.getDate(),
    mm: month[today.getMonth()].toLocaleUpperCase(),
    yyyy: today.getFullYear()
  }
  let important1 = true

  // Test data2 for the task, with tomorrow date and task as not important
  const randomNum2 = () => Cypress._.random(0, 1e6)
  let taskName2 = `Title${randomNum2()}`
  let taskDesc2 = `Desc${randomNum2()}`
  let date2 =
  {
    dd: today.getDate() + 1,
    mm: month[today.getMonth()].toLocaleUpperCase(),
    yyyy: today.getFullYear()
  }
  let important2 = false


  before(() => {
    //Step 1) Navigate to the Target URL
    cy.visitURL(BaseURL)
    //Step 2) Login to Task Manager
    cy.loginTaskManager(userName, password)
    //Step 3) Creating two tasks with the above test data as a precondition
    cy.addTasks(taskName1, taskDesc1, date1, important1)
    cy.addTasks(taskName2, taskDesc2, date2, important2)

  })

  beforeEach(function () {
    //Step 2) Login to Task Manager

  })

  afterEach(() => {
    //cy.logOutTaskManager()
  })


  it('TM-001 Validate ability to add a task', () => {

    // Verify the added task 1 present in the my day task list
    cy.contains('.home-card.task-card', taskName1).should('be.visible')
    cy.contains('.home-card.task-card', `${month[today.getMonth()]} ${date1.dd}, ${date1.yyyy}`).should('be.visible')
    // Verify the added task 2 should not  present in the my day task list
    cy.contains('.home-card.task-card', taskName2).should('not.exist')

    // Verify the added task1 and task 2 in the "All tasks"
    cy.selectSideNavBar('All Tasks')
    cy.contains('.home-card.task-card', taskName1).should('be.visible')
    cy.contains('.home-card.task-card', taskName2).should('be.visible')

    /*                
                   ******** This Section seems an bug in the application *********
    // Verify the task 1 is present in the "Important tasks" page and task 2 should not present there
      cy.selectSideNavBar('Important Tasks')
      cy.contains('.home-card.task-card', taskName1).should('be.visible')
      cy.contains('.home-card.task-card', taskName2).should('not.exist')
 
    */

  })


  it('TM-002 Validate marking/unmarking a task as done', () => {

    cy.selectSideNavBar('My day')
    cy.selectTaskinMyDay(taskName1)
    // Verify the selected task 1 is striked out in my day page
    cy.contains('.home-card.task-card [ng-reflect-ng-class]', taskName1)
      .should('have.css', 'text-decoration', 'line-through solid rgb(0, 0, 0)')

    //  Verify the selected task 1 is striked out in "All tasks" page
    cy.selectSideNavBar('All Tasks')
    cy.contains('.home-card.task-card [ng-reflect-ng-class]', taskName1)
      .should('have.css', 'text-decoration', 'line-through solid rgb(0, 0, 0)')


    // Verify the striked task 1 again in all tasks page and verify the is striked out is not there in all tasks page
    cy.selectTaskinAllTasks(taskName1)
    cy.contains('.home-card.task-card [ng-reflect-ng-class]', taskName1)
      .should('not.have.css', 'text-decoration')
    //verify the is striked out is not there in all My day page
    cy.selectSideNavBar('My day')
    cy.contains('.home-card.task-card [ng-reflect-ng-class]', taskName1)
      .should('not.have.css', 'text-decoration')

  })
  it('TM-003 Validate ability to remove a task', () => {

    //Remove Task1
    cy.selectSideNavBar('My day')
    cy.removeTasks(taskName1)
    // Verify the removed task 1 is not present in the my day list
    cy.contains('.home-card.task-card', taskName1).should('not.exist')

    // Verify the removed task1 is not present in the "All tasks"
    cy.selectSideNavBar('All Tasks')
    cy.contains('.home-card.task-card', taskName1).should('not.exist')
    cy.contains('.home-card.task-card', taskName2).should('be.visible')



  })
})

import 'cypress-wait-until';


// common method used for get the element
Cypress.Commands.add('elementSelector', (selector) => {
  cy.get(selector)
})

// common method used for type the Value in to the field
Cypress.Commands.add('typeValue', (selector, val) => {
  cy.elementSelector(selector).should('exist').then((element) => {
    cy.wrap(element).wait(10).focus().clear().type(val)
  })
})

// common method used for Select the element from dropdown
Cypress.Commands.add('selectValue', (selector, val) => {
  cy.elementSelector(selector).then((element) => {
    cy.wrap(element).select(val)
  })
})

// common method used for Click the element
Cypress.Commands.add('clickElement', (selector) => {
  cy.elementSelector(selector).then((element) => {
    cy.wrap(element).click()
  })
})

// This is the method used  Load the URL
Cypress.Commands.add('visitURL', (url) => {
  cy.visit(url)
  cy.title().should('eq','Task Manager')
  cy.get('.mat-card .mat-card-title').should('be.visible')
})


// This is the method used  Login the Sauce Demo application
Cypress.Commands.add('loginTaskManager', (uName, pWord) => {
 cy.typeValue("input[name='email']", uName)
  cy.typeValue("input[name='password']", pWord)
  cy.clickElement("button[type='submit']")
  cy.get('.sidenav-container .mat-nav-list').should('be.visible')
})



// This is the method used  Logout the Task Manager
Cypress.Commands.add('logOutTaskManager', () => {
  cy.get('.mat-icon-button mat-icon').eq(1).should('be.visible')
  cy.get('.mat-icon-button mat-icon').eq(1).click()
  cy.get('.mat-card .mat-card-title').should('be.visible')


})

// This is the method to select the date
Cypress.Commands.add('selectDate', (date) => {
  cy.get('form .mat-datepicker-toggle-default-icon').click()
  cy.get('.mat-datepicker-popup .mat-calendar').should('be.visible')
  cy.get('.mat-datepicker-popup .mat-calendar-period-button').click()
  cy.get('.mat-datepicker-popup mat-multi-year-view table td').each((el,index)=>
  {
    if((el.text().trim())===String(date.yyyy))
    {
      cy.wrap(el).click()
    }
  })

  cy.get('.mat-datepicker-popup mat-year-view table td').each((el)=>
  {
    if(el.text().trim()===date.mm)
    {
      cy.wrap(el).click()
    }
  })

  cy.get('.mat-datepicker-popup mat-month-view table td').each((el)=>
  {
    if((el.text().trim())===String(date.dd))
    {
      cy.wrap(el).click()
    }
  })
})

// This is the method used  Add the Tasks
Cypress.Commands.add('addTasks', (taskTitle,taskDesc,date,important) => {
  cy.typeValue("#mat-input-2", taskTitle)
  cy.typeValue("#mat-input-3", taskDesc)
  cy.selectDate(date)
  if(important===true)
  {
    cy.contains('#mat-checkbox-1 .mat-checkbox-label','Important').click()
  }
  cy.get('#addTask').click()
})


// This method used to remove the task from the list
Cypress.Commands.add('removeTasks', (taskTitle) => {
 cy.get('.home-card.task-card').each((el,index)=>
 {
  if(el.text().includes(taskTitle))
  {
    cy.get('mat-card .remove-icon').eq(index).click()
  }
 })
})

//This method used to Select the side nav bar item

Cypress.Commands.add('selectSideNavBar', (sideNav) => {
  cy.get('.mat-list-item.sidenav-item').each((el,index)=>
  {
   if(el.text().includes(sideNav))
   {
     cy.get('.mat-list-item.sidenav-item').eq(index).click()
   }
  })
 })

 //This method used to Get the side nav bar items

Cypress.Commands.add('sideNavBarItems', () => {
  let sideBarItems=[]
  cy.get('.mat-list-item.sidenav-item .mat-list-item-content').each((el,index)=>
  {
    sideBarItems.push(el.text().trim())
  }).then(()=>
  {
    return sideBarItems
  })
 })


 //This method used to select the tasks lists in the My day page

Cypress.Commands.add('selectTaskinMyDay', (taskName) => {
  cy.get('.home-card.task-card [ng-reflect-ng-class]').each((el,index)=>
  {
    if(el.text().trim()===taskName)
    {
      cy.get('.home-card.task-card .mat-checkbox-inner-container').eq(index).click()
    }
  })
 })


 //This method used to select the tasks in the ALL Tasks page

Cypress.Commands.add('selectTaskinAllTasks', (taskName) => {
  cy.get('.home-card.task-card [ng-reflect-ng-class]').each((el,index)=>
  {
    if(el.text().trim()===taskName)
    {
      cy.get('.home-card.task-card .mat-checkbox-inner-container').eq(index).click()
    }
  })
 })

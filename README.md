# Task Manager Test Automation

Test script which covers the Task Manager scenarios using Cypress.

## Prerequisite

- Node JS > v14.X
- Cypress verison as per the `package.json` file.

## Cypress Installation & Project setup

### Install the tests

1. Download Node & NPM (<https://nodejs.org/en/download/>)

2. Set `NODE_HOME` Environment Variable
   1. Go to Control Panel\System and Security\System
   2. Click Environment Variables > System Variables> New
   3. Set Variable name:  for ex: `Node_HOME`
   4. Set Variable value – Specify the location where exactly node js is installed.

### To Run 
1. In a terminal, `cd` to the folder where you want to get the task manager and get the test from source control:
       `git clone https://git.xsb.com/scm/swiss/automated-smoke-test.git`

2. `cd task_manager`

3. `git pull`
4. Run: `npm install` (Note: This step can be run to update the installed libraries at any time)
5. Run: `npm run taskmanager-chrome -- --headed`

### Run a Text Suite

Note that adding `--headed` to the end of any of the following command lines will run the test with a visible browser. Otherwise the browser (if used) will not be visible.

Run one of the following commands:

#### Run the Task Manager Test Script for different browsers
    - `npm run taskmanager-chrome --` # to run the Sauce demo script in a Chrome browser.
    - `npm run taskmanager-firefox --` # to run the Sauce demo script in a Firefox browser.
    - `npm run taskmanager-edge --` # to run the Sauce demo script in a a Edge browser.
    - `npm run taskmanager-headless --'` # This will run the to run the Sauce demo script in the command line, in headless mode, using a generic “browser”


### Example Success Output

```Output

Task Manager Specs
    √ TM-002 Validate landing page (8417ms)
    √ TM-003 Validate ability to add a task
    √ TM-004 Validate tasks appearing on the ‘all tasks’ page
    √ TM-005 Validate tasks appearing on the ‘favorites’ page
    √ TM-006 Validate marking/unmarking a task as done
    √ TM-007 Validate ability to remove a task


  6 passing (14s)

 (Results)

  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Tests:        6                                                                                │
  │ Passing:      6                                                                                │
  │ Failing:      0                                                                                │
  │ Pending:      0                                                                                │
  │ Skipped:      0                                                                                │
  │ Screenshots:  0                                                                                │
  │ Video:        true                                                                             │
  │ Duration:     13 seconds                                                                       │
  │ Spec Ran:     TaskManager/TaskManager.spec.js                                                  │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘

====================================================================================================

  (Run Finished)


       Spec                                              Tests  Passing  Failing  Pending  Skipped
  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ √  TaskManager/TaskManager.spec.js          00:13        6        6        -        -        - │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘
    √  All specs passed!                        00:13        6        6        -        -        -
# Micro Expense Tracker

A **micro front-end & back-end** full-stack project for managing personal expenses. Currently includes:

- **Angular (frontend)** – project shell and UI for tracking expenses.
- **NestJS (backend)** – basic API and data handling.
- **Cypress & Jest (Testing)** - testing framework 
- (Note: Still in early development — "micro" refers to modular architecture, future micro front-end expansion planned.)

---

## ​ Tech Stack

- **Frontend**: Angular, TypeScript, SCSS  
- **Backend**: NestJS, TypeScript  
- **Architecture**: Modular, Clean Architecture principles  
- **Tools**: Git, Angular CLI, Nest CLI, Github Project
- **Testing framework**: Jest for Unit test, Cypress for Automation test

---

##  Features

- Angular-based shell with routing and component structure
- NestJS backend with placeholder endpoints (e.g. `/expenses`)
- Shared type definitions to align frontend & backend
- Ready for micro front-end expansion or integration with other modules

---

##  Getting Started
  ### 1. Start the Frontend (Angular Micro-Frontend)
  ```
  cd mfe-shell-angular
  npm install
  ng serve
  ```
Frontend will run at: http://localhost:4200/
  ### 2. Start the Backend (NestJS)
  ```
  cd backend
  npm install
  npm run start:dev
  ```
Make sure both frontend and backend are running before starting tests.
  ### 3. Start testing (Cypress)
  ```
  cd mfe-shell-angular
  npx cypress open   # Interactive mode
  # or
  npx cypress run    # Headless mode
  ```
Select E2E -> Your Favor browser -> Select expense-crud.cy.ts

### Prerequisites
- Node.js (v14+)
- npm or Yarn

### Clone the repo

```bash
git clone https://github.com/hoangphivo97/micro-expense-tracker.git
cd micro-expense-tracker
FE: cd mfe-shell-angular -> ng serve
BE: cd backend -> npm run start:dev

### Note
- This project is for learning & demonstration purposes only.
- Work in progress.

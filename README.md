# Micro Expense Tracker

A **micro front-end & back-end** full-stack project for managing personal expenses. Currently includes:


```markdown
## 📂 Project Structure


micro-expense-tracker/
├── 📱 apps/
│   ├── mfe-shell-angular/      # 🏠 Host Application (Angular) - Main UI & Routing
│   ├── mfe-remote-react/       # 🧩 Remote Application (React) - UI Components
│   └── backend/                # ⚙️ API Server (NestJS) - Logic & Database
│
├── 📦 libs/
│   └── shared/types/           # 🔗 Shared Library (Interfaces & DTOs)
│
├── 🧪 e2e/
│   ├── mfe-shell-angular-e2e/  # Cypress tests for Angular Shell
│   ├── mfe-remote-react-e2e/   # Cypress tests for React Remote
│   └── backend-e2e/            # Jest e2e tests for Backend
│
├── nx.json                 # Nx Configuration
├── package.json            # Root Dependencies
└── tsconfig.base.json      # Global TypeScript Config
```

## ​ Tech Stack

- **Frontend**: Angular, TypeScript, SCSS , React
- **Backend**: NestJS, TypeScript  
- **Architecture**: Modular, Clean Architecture principles  
- **Tools**: Git, Angular CLI, Nest CLI, Github Project, NX, ApexCharts
- **Testing framework**: Jest for Unit test, Cypress for Automation test

---

##  Features

- Angular-based shell with routing and component structure
- NestJS backend with placeholder endpoints (e.g. `/expenses`)
- Shared type definitions to align frontend & backend

---

##  Getting Started
  ### Start project using NX
  ```
  nx run-many -t serve
  ```
  React run at: localhost:5000
  Angular run at: localhost:4200
  backend run at: localhost:3000

  ### Start each project (If you prefer)
  ```
  nx serve backend
  nx serve mfe-shell-angular
  nx serve mfe-react-remote 
  ```
  For each new terminal

  ### Unit Test whole App
  ```
  nx run-many -t test
  ```

  ### Unit test specific on backend
  ```
  nx test backend
  ```
  ### E2E Test Angular App
  ```
  nx e2e mfe-shell-angular-e2e
  ```

  ### run Storybook React Remote App
  ```
  nx storybook mfe-remote-react
  ```

### Prerequisites
- Node.js: v18.x trở lên.
- MongoDB: Default port is 27017.
- Nx CLI: npm install -g nx (recommend).

### Clone the repo

```
git clone https://github.com/hoangphivo97/micro-expense-tracker.git
cd micro-expense-tracker
```

### Note
- This project is for learning & demonstration purposes only.
- Work in progress.

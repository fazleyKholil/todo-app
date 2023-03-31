# Getting Started TODO App
[![Build](https://github.com/fazleyKholil/todo-app/actions/workflows/docker-compose-build.yml/badge.svg)](https://github.com/fazleyKholil/todo-app/actions/workflows/docker-compose-build.yml)

[![coverage](https://github.com/fazleyKholil/todo-app/actions/workflows/coverage-pr.yml/badge.svg)](https://github.com/fazleyKholil/todo-app/actions/workflows/coverage-pr.yml)


# Todo App Requirements 
![Usecase Diagram](/resx/usecase.PNG)
- The user should be able to view todo's
- The user should be able to add todo's
- The user should be able to delete todo's
- The user should be able to edit todo's


# UI Flow design
 ![Floe Diagram](/resx/pageflow.PNG)

The application will contains 2 main screen. 
The first screen will display all the todo's and action buttons such as edit and delete for each todo.
The Create Todo screen will serve a form that allows a user to add a Todo as well as edit an existing todo.


# Architecture
 ![Architecture Diagram](/resx/jsonserver.PNG)

For simplicity, the app connects to the Mock JSON server and serves todo's data.

# Detailed Architecture

 ![Detailed Architecture Diagram](/resx/detailed%20arc.PNG)


## Getting started
### Running locally

When running locally, you need to create all the infra dependencies.
```javascript
 docker-compose -f docker-compose.yml -f docker-compose.apps.yml up --build --force-recreate
```

### Running coverage locally
This will output the coverage result in the terminal as well as generate a coverage folder with lcov-report to analyze which lines of code was not covered
```javascript
 npm run coverage
```
```javascript
> todo-app@0.1.0 coverage
> react-scripts test --silent --testLocationInResults --coverage --watchAll=false --ci --all --coverage

 PASS  src/__tests__/CreateTodo.test.tsx
 PASS  src/__tests__/ViewTodo.test.tsx
 PASS  src/__tests__/NotificationPanel.test.tsx
 PASS  src/__tests__/TodoDueWarning.test.tsx
 PASS  src/__tests__/TodoList.test.tsx
 PASS  src/__tests__/TodoItem.test.tsx      
 PASS  src/__tests__/CreateTodoForm.test.tsx
 PASS  src/__tests__/App.test.tsx
--------------------------|---------|----------|---------|---------|-------------------
File                      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
--------------------------|---------|----------|---------|---------|-------------------
All files                 |     100 |      100 |     100 |     100 |                   
 Components               |     100 |      100 |     100 |     100 |                   
  CreateTodoForm.tsx      |     100 |      100 |     100 |     100 |                   
  TodoDueWarning.tsx      |     100 |      100 |     100 |     100 |                   
  TodoItem.tsx            |     100 |      100 |     100 |     100 |                   
  TodoList.tsx            |     100 |      100 |     100 |     100 | 
 Components/UI            |     100 |      100 |     100 |     100 | 
  Card.tsx                |     100 |      100 |     100 |     100 | 
  FilterSortAddWidget.tsx |     100 |      100 |     100 |     100 | 
  Loader.tsx              |     100 |      100 |     100 |     100 | 
  NotificationPanel.tsx   |     100 |      100 |     100 |     100 | 
--------------------------|---------|----------|---------|---------|-------------------

Test Suites: 8 passed, 8 total
Tests:       18 passed, 18 total
Snapshots:   0 total
Time:        6.011 s
```
### Viewing lcov detailed report
Browse to the generated coverage folder and lcov then open the inde.html file.
By cliking on the component you will be able to view the code section that was not covered.

 ![Folder Coverage](/resx/lcovreport.PNG)

## Setting up code coverage
After creating your tests files, do the following step : 
- Modify the `package.json` file and add the following  in the scripts section.

``` json
  "scripts": {
    "start": "...",
    "build": "...",
    "test": "...",
    "eject": "...",
    "coverage": "react-scripts test --silent --testLocationInResults --coverage --watchAll=false --ci --all --coverage ",
  },
```

Then open a terminal and run `npm run coverage` which will generate the output illustrated above.

# Setting up build pipeline Github Actions

 ![Detailed Architecture Diagram](/resx/GitActions.PNG)

On each push and Pull requests, a sets of actions will be triggered like follows :
- Build the JSON server docker image and pre load data in the DB to be ready to serve as tests data for automated testing
- Build the react app to check if the build is successfull
- Run the code coverage on pull requests to ensure code tetsing coverage. 

## Setting up code coverage in Github Actions

Create a pipeline file in the .github folder and name it `docker-compose-build.yml` with the below code snippet.

``` yml

name: Build

on:
  push:
    branches:
    - main
    - develop
  pull_request:
    branches:
    - main

jobs:
  docker:
    timeout-minutes: 10
    runs-on: ubuntu-latest

    steps:
    - name: Checkout
      uses: actions/checkout@v1

    - name: Start Infrastructure
      run:  docker-compose -f docker-compose.yml up --build --force-recreate -d   


```

This file will gets triggered on each push on the main,develop branch to check wether the app is building correctly as well as loads up any infra dependencies ready for automated testing.


## Setting up build pipeline in Github Actions

Create a pipeline file and name it `coverage-pr.yml` with the below code snippet.

``` yml

name: "coverage"
on:
  pull_request:
    branches:
      - main

jobs:
  coverage:
    runs-on: ubuntu-latest
    name: Coverage report
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Test coverage
        uses: ArtiomTr/jest-coverage-report-action@v2
        with:
          annotations: failed-tests
          test-script: npm run coverage
      - name: Generating coverage badges
        uses: jpb06/jest-badges-action@latest
        with:
          coverage-summary-path: ./coverage/coverage-final.json

```

This file will gets triggered on each pull requests and generate the coverage output as a comment on the PR.

 ![PR Coverage](/resx/pr-cov.PNG)

## Setting up Story book

```
npx storybook init
npm i @storybook/addon-styling --save 
```

This will download all the components Storybooks need and add them to the project. It will bootstrap some files in the stories folder whoch you can delete and start to code some custom stories for your project.

### Setting up a first Story
Create a file under the stories folder and name it the component name you want to add. In my case lets take TodoItem, thus I'll name it `TodoItem.stories.js`

``` tsx
import TodoItem from "../Components/TodoItem";
import { action } from "@storybook/addon-actions";

export default {
  title: "TodoItem",
  component: TodoItem,
};

const todo = {
  id: 0,
  done: true,
  name: "Read Book",
  priority: "High",
  due: "2022-01-01",
  text: "Need to read the Accelerate book Building and Scaling high performing Organization",
};

const todoChecked = {
  id: 0,
  done: false,
  name: "Read Book",
  priority: "High",
  due: "2022-01-01",
  text: "Need to read the Accelerate book Building and Scaling high performing Organization",
};

export const NormalTodo = () => (
  <TodoItem
    todo={todo}
    onDeleteTodo={action("onDeleteTodo clicked")}
    onEditTodo={action("onEditTodo clicked")}
    toggleComplete={action("toggleComplete clicked")}
  />
);

export const CheckedTodo = () => (
  <TodoItem
    todo={todoChecked}
    onDeleteTodo={action("onDeleteTodo clicked")}
    onEditTodo={action("onEditTodo clicked")}
    toggleComplete={action("toggleComplete clicked")}
  />
);

```

Since I am using MDB framework, we will need to add some additional styling config so that Story is able to render the desired style.

In the `.storybook` folder open the `main.js` file and add the below config : 
``` js

module.exports = {
  "stories": [
 ...
  ],
  "addons": [
...
    '@storybook/addon-styling',
...
  ],
........
  }
}
```

Then open the `preview.js` file and add the following config : 
``` js
import '../src/index.css';
import '../src/App.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
```

This will basically tells Storybook to this this particualar lib and apply the relevant styling.

### Running the StoryBook
Run the following command : 
```
npm run storybook
```
It will output something similar to this and open the link on a browser to view the pages.

```
99% done plugins webpack-hot-middlewarewebpack built preview 7e0b949283d629dee58c in 18069ms
╭───────────────────────────────────────────────────╮
│                                                   │
│   Storybook 6.5.16 for React started              │
│   16 s for manager and 22 s for preview           │
│                                                   │
│    Local:            http://localhost:6006/       │
│    On your network:  http://172.23.208.1:6006/    │
│                                                   │
╰───────────────────────────────────────────────────╯
No issues found.
99% done plugins webpack-hot-middlewarewebpack built preview 0655679f50fa354ddc85 in 791ms
No issues found.
```
On the Browser you should see a similar page depending on your component.

 ![Story](/resx/story.PNG)

 It basically allows you to run and tests individually the diffirent states of your component in isolation.
 
 ![Story](/resx/story2.PNG)



# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

const inquirer = require("inquirer");

// console.log(inquirer);

const promptUser = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What's your name?",
      validate: nameInput => {
          if (nameInput) {
              return true;
          } else {
              console.log('please enter your name!')
              return false;
          }
      }
    },
    {
      type: "input",
      name: "githubUsername",
      message: "What's your GitHub username?",
      validate: usernameInput => {
        if (usernameInput) {
            return true;
        } else {
            console.log('Please enter your username!')
            return false;
        }
    }
    },
    {
        type: 'confirm',
        name: 'confirmAbout',
        message: 'Would you like to include an "About" section?',
        default: true
    },
    {
      type: "input",
      name: "about",
      message: "Tell us a little about yourself",
      when: ({ confirmAbout}) => {
          if (confirmAbout) {
              return true;
          } else {
              return false;
          }
      }
    },
  ]);
};

const promptProject = portfolioData => {

    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }

  console.log(`

        =================

        Add a new project

        =================

    `);

  return inquirer.prompt([
    {
      type: "input",
      name: "project",
      message: "what's the name of your project?",
      validate: projectNameInput => {
        if (projectNameInput) {
            return true;
        } else {
            console.log('Please enter the name of your project!')
            return false;
        }
    }
    },
    {
      type: "input",
      name: "description",
      message: "Give us a little description about your project.",
    },
    {
      type: "checkbox",
      name: "languages",
      message: "What programming languages did you use? (check all that apply)",
      choices: [
        "JavaScript",
        "HTML",
        "CSS",
        "ES6",
        "jQuery",
        "bootstrap",
        "node",
      ],
    },
    {
      type: "input",
      name: "link",
      message: "Please provide a link to your project.",
      validate: linkInput => {
        if (linkInput) {
            return true;
        } else {
            console.log('please enter a link to your project!')
            return false;
        }
    }
    },
    {
      type: "confirm",
      name: "feature",
      message: "Would you like to feature this project?",
      default: false,
    },
    {
      type: "confirm",
      name: "confirmAddProject",
      message: "Would you like to enter another project?",
      default: false,
    },
  ])
  .then(projectData => {
    portfolioData.projects.push(projectData);
    if (projectData.confirmAddProject) {
        return promptProject(portfolioData);
    } else {
        return portfolioData;
    }
  });
};

promptUser()
  .then(promptProject)
  .then(portfolioData => {
      console.log(portfolioData);
  })

// const fs = require('fs');
// const generatePage = require('./src/page-template');

// const pageHTML = generatePage(name, github);

// fs.writeFile('./index.html', pageHTML, err => {
//   if (err) throw err;

//   console.log('Portfolio complete! Check out index.html to see the output!');
// });

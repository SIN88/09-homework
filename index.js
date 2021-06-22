const inquirer = require('inquirer');
const fs = require('fs');
const axios = require('axios');


const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is your project name ?',
      default: "Best Project"
    },
    {
      type: 'input',
      name: 'description',
      message: 'these are installation instructions?',
      default: "This is a tribute to the greatest app in the world!"
    },
    {
      type: 'input',
      name: 'usage',
      message: 'how can people use this application?',
      default: 'They can use it by  typing'
    },
    {
      type: 'input',
      name: 'contributions',
      message: 'Who is contributing to the application ?',
      default: 'Their contributions make the app better'
    },
    {
      type: 'input',
      name: 'tests',
      message: 'What test can be performed?',
      default: 'all kinds of tests'
    },
    {
      type: 'input',
      name: 'installation',
      message: 'How do you install this application?',
      default: 'You load it on your computer'
    },
    {
        type:'input',
        name: 'username',
        message:'What is your username ?',
        default:'SIN88'
    }
  ]);
};
const generateMarkDown =(answers) =>
`# ${answers.title}

## Project Description
${answers.description}

## Usage
${answers.usage}

## Contributions
${answers.contributions}

## Test
${answers.tests}

## Installations
${answers.installation}
`
// const generateHTML = (answers) =>
//   `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta http-equiv="X-UA-Compatible" content="ie=edge">
//   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
//   <title>Document</title>
// </head>
// <body>
//   <div class="jumbotron jumbotron-fluid">
//   <div class="container">
//     <h1 class="display-4">Hi! My name is ${answers.name}</h1>
//     <p class="lead">I am from ${answers.location}.</p>
//     <h3>Example heading <span class="badge badge-secondary">Contact Me</span></h3>
//     <ul class="list-group">
//       <li class="list-group-item">My GitHub username is ${answers.github}</li>
//       <li class="list-group-item">LinkedIn: ${answers.linkedin}</li>
//     </ul>
//   </div>
// </div>
// </body>
// </html>`;

// Bonus using writeFileAsync as a promise
const init = () => {
  promptUser()
    .then((answers) => {
        //before writefile we need to call github users api with username and get more info
        //api call here with axios
        axios.get(`https://api.github.com/users/${answers.username}`)
        .then(data => console.log(data))
        fs.writeFileSync('PROJECT_README.md', generateMarkDown(answers))})
    .then(() => console.log('Successfully wrote to md file'))
    .catch((err) => console.error(err));
};

init();

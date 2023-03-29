// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');

// TODO: Create an array of questions for user input
const questions = ['What is the project Title?', 'Write the project description', 'How to install the application', 'How to use the application', 'If any, which license does your application use?', 'How can developers contribute to the project?', 'How did you test the project?', 'Write your email address', 'Write your GitHub username (Case-sensitive)', 'What is your forename?'];

// TODO: Create a function to write README file
const generateReadMe = ({ title, description, installation, usage, license, contribution, tests, email, github }, licenseSyn) =>
    `# ${title}   
 ${licenseSyn}
## Description  
${description}  
## Table of contents
[Description](#description)  
[Installation](#installation)  
[Usage](#usage)  
[License](#license)  
[Contribution](#contribution)  
[Tests](#tests)  
[Questions](#questions)  
## Installation  
${installation}  
## Usage  
${usage}
## License  
${license.name}
## Contribution  
${contribution}
## Tests  
${tests}  
## Questions  
My email address: ${email}  
My GitHub URL: https://github.com/${github}`;

function writeToFile(fileName, data) {
    const license = data.license;
    // This is to remove the license badge if the user hasn't used any type of license on theor project
    if (data.license == 'n/a') {
        var licenseSyn = ``
    } else {
        var licenseSyn = `![License](https://img.shields.io/badge/License-${license}-brightgreen.svg)`;
    }
    console.log(data.license);
    console.log(licenseSyn);
    const generator = generateReadMe(data, licenseSyn);
    fs.writeFile(fileName, generator, (err) =>
        err ? console.log(err) : console.log('Successfully created README.md')
    );
}

// TODO: Create a function to initialize app
function init() {
    inquirer.prompt([
        {
            type: 'input',
            message: questions[0],
            name: 'title',
        },
        {
            type: 'input',
            message: questions[1],
            name: 'description',
        },
        {
            type: 'input',
            message: questions[2],
            name: 'installation',
        },
        {
            type: 'input',
            message: questions[3],
            name: 'usage',
        },
        {
            type: 'list',
            message: questions[4],
            name: 'license',
            choices: [
                { name: 'None', value: 'n/a' },
                { name: 'Apache License 2.0', value: 'Apache_2.0' },
                { name: 'BSD 2-Clause "Simplified" License', value: 'BSD_2--Clause' },
                { name: 'BSD 3-Clause "New" or "Revised" License', value: 'BSD_3--Clause' },
                { name: 'Boost Software License 1.0', value: 'Boost_1.0' },
                { name: 'Creative Commons Zero v1.0 Universal', value: 'License-CC0_1.0' },
                { name: 'Eclipse Public License 2.0', value: 'EPL_1.0' },
                { name: 'GNU General Public License v3.0', value: 'GPLv3' },
                { name: 'GNU Affero General Public License v3.0', value: 'AGPL_v3' },
                { name: 'GNU General Public License v2.0', value: 'GPL_v2' },
                { name: 'GNU Lesser General Public License v2.1', value: 'LGPL_v2.1' },
                { name: 'MIT license', value: 'MIT' },
                { name: 'Mozilla Public License 2.0', value: 'MPL_2.0' },
                { name: 'The Unlicense', value: 'Unlicense' },
            ]
        },
        {
            type: 'input',
            message: questions[5],
            name: 'contribution',
        },
        {
            type: 'input',
            message: questions[6],
            name: 'tests',
        },
        {
            type: 'input',
            message: questions[7],
            name: 'email',
        },
        {
            type: 'input',
            message: questions[8],
            name: 'github',
        },
        {
            type: 'input',
            message: questions[9],
            name: 'fileName'
        }
    ])
        .then((data) => {
            // This is added so that the users README doesnt overwrite my README and they can still read it
            var fileName = data.fileName + `'s-README.md`;
            writeToFile(fileName, data);
        });
}

// Function call to initialize app
init();

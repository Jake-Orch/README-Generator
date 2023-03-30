// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');

// TODO: Create an array of questions for user input
const questions = ['What is the project Title?', 'Write the project description', 'How to install the application', 'How to use the application', 'If any, which license does your application use?', 'How can developers contribute to the project?', 'How did you test the project?', 'Write your email address', 'Write your GitHub username (Case-sensitive)', 'Write a prefix for your README file name (should be removed)?'];

// In this function, I have created a template for how the README should be structured, using data from the init function to fill out the sections which the user will need to be unqiue for their README.
const generateReadMe = ({ title, description, installation, usage, license, contributing, tests, email, github }, licenseSymbol, licenseName1) =>
    `# ${title}   
 ${licenseSymbol}
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
${licenseName1}
## Contributing  
${contributing}
## Tests  
${tests}  
## Questions  
If you have any questions about this application, contact me via either my email adress or my GitHub account.
My email address: ${email}  
My GitHub URL: https://github.com/${github}`;

// TODO: Create a function to write README file
// This function is using the generateReadMe function and data from init function to generate the README file.
function writeToFile(fileName, data) {
    var licensesymbol = licenseNA(data);
    var licenseName1 = licenseName(data);
    const generator = generateReadMe(data, licensesymbol, licenseName1);
    fs.writeFile(fileName, generator, (err) =>
        err ? console.log(err) : console.log('Successfully created README.md')
    );
}

function licenseNA (data) {
    const license = data.license;
    if (license == 'n/a') {
        var licenseSyn = ``
    } else {
        var licenseSyn = `![License](https://img.shields.io/badge/License-${license}-brightgreen.svg)`;
    }
    return licenseSyn
}

function licenseName(data) {
    const license = data.license;
    if (license == 'n/a') {
        var licenseName = 'N/A'
    } else if (license == 'Apache_2.0') {
        var licenseName = 'Apache License 2.0'
    } else if (license == 'BSD_2--Clause') {
        var licenseName = 'BSD 2-Clause "Simplified'
    } else if (license == 'BSD_3--Clause') {
        var licenseName = 'BSD 3-Clause "New" or "Revised'
    } else if (license == 'Boost_1.0') {
        var licenseName = 'Boost Software License 1.0'
    } else if (license == 'License-CC0_1.0') {
        var licenseName = 'Creative Commons Zero v1.0 Universal'
    } else if (license == 'EPL_1.0') {
        var licenseName = 'Eclipse Public License 2.0'
    } else if (license == 'GPLv3') {
        var licenseName = 'GNU General Public License v3.0'
    } else if (license == 'AGPL_v3') {
        var licenseName = 'GNU Affero General Public License v3.0'
    } else if (license == 'GPL_v2') {
        var licenseName = 'GNU General Public License v2.0'
    } else if (license == 'LGPL_v2.1') {
        var licenseName = 'GNU Lesser General Public License v2.1'
    } else if (license == 'MIT') {
        var licenseName = 'MIT license'
    } else if (license == 'MPL_2.0') {
        var licenseName = 'Mozilla Public License 2.0'
    } else if (license == 'Unlicense') {
        var licenseName = 'The Unlicense'
    }
    return licenseName;
}

// TODO: Create a function to initialize app
// In this function, i use inquirer prompt to gain the necessary data from the user to generate their README file.
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
            // In the license prompt, i have created values for each license which the user can choose, these values will be used for the license label which shall appear near the top of their README file.
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
            name: 'contributing',
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
            // This is added so that the users README doesnt overwrite my README and they can still read it.
            var fileName = data.fileName + ` README.md`;
            writeToFile(fileName, data);
        });
}

// Function call to initialize app
init();

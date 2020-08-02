const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

//Questions asked to generate team
const employees = [];

const managerQs = [
    {
        type: "input",
        message: "What's the name of the manager or your team?",
        name: "managerName"
    },
    {
        type: "input",
        message: "What's their email address?",
        name: "managerEmail"
    },
    {
        type: "input",
        message: "What is the manager's office number?",
        name: "managerOfficeNum"
    },
    {
        type: "input",
        message: "What is the manager's employee ID?",
        name: "managerID"
    },
    {
        type: "list",
        message: "Do you want to add another team member?",
        name: "newEmp",
        choices: [
            "Let's add an Engineer",
            "Let's add an Intern",
            "Not now"
        ]
    }
];

const internQs = [
    {
        type: "input",
        message: "What is the intern's name?",
        name: "internName"
    },
    {
        type: "input",
        message: "What is your intern's email address?",
        name: "internEmail"
    },
    {
        type: "input",
        message: "What school is the intern attending?",
        name: "internSchool"
    },
    {
        type: "input",
        message: "What is the intern's employee ID?",
        name: "internId"
    },
    {
        type: "list",
        message: "Do you want to add another team member?",
        name: "newEmp",
        choices: [
            "Let's add an Engineer",
            "Let's add another intern",
            "Not now"
        ]
    }
];


const engineerQs = [
    {
        type: "input",
        message: "What is the Engineer's name?",
        name: "engineerName"
    },
    {
        type: "input",
        message: "What is the Engineer's email address?",
        name: "engineerEmail"
    },
    {
        type: "input",
        message: "What is the Engineer's GitHub profile account's name?",
        name: "engineerGithub"
    },
    {
        type: "input",
        message: "What is the Engineer's employee ID?",
        name: "engineerID"
    },
    {
        type: "list",
        message: "Would you like to add another team member?",
        name: "newEmp",
        choices: [
            "Let's add another Engineer",
            "Let's add an Intern",
            "Not now"
        ]
    }
];

function manager() {
    inquirer
    .prompt(managerQs)
    .then( response => { 
        const {managerName, managerEmail, managerID, managerOfficeNum,} = response;
        employees.push(new Manager(managerName, managerEmail, managerID, managerOfficeNum));
        switch(response.newEmp) {
            case "Let's add an Engineer":
              engineer();
              break;
            case "Let's add an Intern":
              intern();
              break;
            case "Not now":
                outputTeam();
              break;
            default:
                break;
          }
    })
}

function intern() {
    inquirer
    .prompt(internQs)
    .then( response => { 
        const {internName, internEmail, internID, internSchool} = response;
        employees.push(new Intern(internName, internEmail, internID, internSchool));
        switch(response.newEmp) {
            case "Let's add an Engineer":
              engineer();
              break;
            case "Let's add another intern":
              intern();
              break;
            case "Not now":
                outputTeam();
              break;
            default:
                break;
          }
    })
}

function engineer() {
    inquirer
    .prompt(engineerQs)
    .then( response => { 
        const {engineerName, engineerEmail, engineerID, engineerGithub} = response;
        employees.push(new Engineer(engineerName, engineerEmail, engineerID, engineerGithub));
        switch(response.newEmp) {
            case "Let's add another Engineer":
              engineer();
              break;
            case "Let's add an Intern":
              intern();
              break;
            case "Not now":
                outputTeam();
              break;
            default:
                break;
          }
        })
}

//Outputs team to html page
function outputTeam(){
    const html = render(employees);
    fs.writeFile('output/team.html', html, function(err){
        if(err){
            console.log(err)
        }
    })
}

//Starts application through manager prompts
manager();
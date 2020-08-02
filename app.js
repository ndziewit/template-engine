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
        message: "What's their email address'?",
        name: "managerEmail"
    },
    {
        type: "input",
        message: "What is their offic number?",
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

function manager() {
    inquirer
    .prompt(managerQs)
    .then( response => { 
        const {managerName, managerEmail, managerOfficeNum, managerID} = response;
        employees.push(new Manager(managerName, managerEmail, managerOfficeNum, managerID));
        switch(response.newEmp) {
            case "Let's add an Engineer":
              engineer();
              break;
            case "Let's add an Intern":
              intern();
              break;
            case "Not now":
                finalize();
              break;
            default:
                break;
          }
    })
}

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

function intern() {
    inquirer
    .prompt(internQs)
    .then( response => { 
        const {internName, internEmail, internSchool, internID} = response;
        employees.push(new Intern(internName, internEmail, internSchool, internID));
        switch(response.newEmp) {
            case "Let's add an Engineer":
              engineer();
              break;
            case "Let's add another intern":
              intern();
              break;
            case "Not now":
                finalize();
              break;
            default:
                break;
          }
    })
}
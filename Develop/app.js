const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const writeFileAsync = util.promisify(fs.writeFile);

const render = require("./lib/htmlRenderer");

const teamMembers = [];
const idArray = [];

function appMenu() {
    
    function createManager() {
        console.log("Please build your team");
        inquirer.prompt([
            {
                type: 'input',
                name: 'managerName',
                message: 'What is your name?'
            },
            {
                type: 'input',
                name: 'managerId',
                message: 'What is your ID number?'
            },
            {
                type: 'input',
                name: 'managerEmail',
                message: 'What is your email address?'
            },
            {
                type: 'input',
                name: 'managerOfficeNumber',
                message: 'What is your office phone number?'
            }
        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            teamMembers.push(manager);
            idArray.push(answers.managerId);
            createTeam();
        });
    }
    
    function createTeam() {
        inquirer.prompt([
            {
                type: "list",
                name: "memberChoice",
                message: "Which type of team member would you like to add?",
                choices: ["Engineer", "Intern", "I don't want to add any more team members"]
            }
        ]).then(userChoice => {
            switch(userChoice.memberChoice) {
                case "Engineer":
                    addEngineer();
                    break;
                    case "Intern":
                        addIntern();
                        break;
                        default:
                            buildTeam();
                        }
                    });
                }
                
                function addEngineer() {
                    inquirer.prompt([
                        {
                            type: 'input',
                            name: 'engineerName',
                            message: 'What is your name?'
                        },
                        {
                            type: 'input',
                            name: 'engineerId',
                            message: 'What is your ID number?'
                        },
                        {
                            type: 'input',
                            name: 'engineerEmail',
                            message: 'What is your email address?'
                        },
                        {
                            type: 'input',
                            name: 'engineerGithub',
                            message: 'What is your github username?'
                        }
                    ]).then(answers => {
                        const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
                        teamMembers.push(engineer);
                        idArray.push(answers.engineerId);
                        createTeam();
                    });
                }
                
                function addIntern() {
                    inquirer.prompt([
                        {
                            type: 'input',
                            name: 'internName',
                            message: 'What is your name?'
                        },
                        {
                            type: 'input',
                            name: 'internId',
                            message: 'What is your ID number?'
                        },
                        {
                            type: 'input',
                            name: 'internEmail',
                            message: 'What is your email address?'
                        },
                        {
                            type: 'input',
                            name: 'internSchool',
                            message: 'What is the name of your school?'
                        }
                    ]).then(answers => {
                        const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
                        teamMembers.push(intern);
                        idArray.push(answers.internId);
                        createTeam();
                    });
                }
                
                function buildTeam() {
                    // Create the output directory if the output path doesn't exist
                    if (!fs.existsSync(OUTPUT_DIR)) {
                        fs.mkdirSync(OUTPUT_DIR)
                    }
                    writeFileAsync(outputPath, render(teamMembers), "utf-8")
                    .then(() => console.log('Successfully wrote to team.html'))
                    .catch((err) => console.error(err));

                }
                
                createManager();
            }
            appMenu();



            
          

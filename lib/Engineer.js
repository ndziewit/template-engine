const Employee = require('.Employee');

class Engineer extends Employee {
    constructor(name, email, id, engineerGithub){
        super(name, email, id);
        this.githuengineerGithubb = engineerGithub;
    }
    getGithub(){
        return this.engineerGithub;
    }
    getRole(){
        return 'Engineer'
    }
}

module.exports = Engineer;
const Employee = require('.Employee');

class Intern extends Employee{
    constructor(name, email, school, id){
        super(name, email, id);
        this.school = school;
    }
    getSchool(){
        return this.school;
    }
    getRole(){
        return "Intern"
    }
}

module.exports = Intern;
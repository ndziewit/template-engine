const Employee = require('./Employee');

class Manager extends Employee{
    constructor(name, email, managerOfficeNum, id){
        super(name, email, id);
        this.managerOfficeNum = managerOfficeNum;
    }
    getOfficenumber(){
        return this.managerOfficeNum;
    }
    getRole(){
        return "Manager";
    }
}
module.exports = Manager;
import {Config} from "../utility";

export default class EmployeeModel {
    identityNo = '';
    fullname = '';
    iban = '';
    photo = Config.NO_IMAGE;
    birthYear = 2000;
    salary = 3000;
    department = 'IT';
    fulltime = true;

    constructor(identityNo = '51925094780', fullname = 'jack bauer', iban = 'TR970006225349274786664946') {
        this.identityNo = identityNo;
        this.fullname = fullname;
        this.iban = iban;
    }
}
import React from "react";
import EmployeeModel from "../model/employee";
import {Config} from "../utility";
import {showErrorMessage, showSuccessMessage} from "../toastr-util";

export default class Hr extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employee: new EmployeeModel(),
            employees: []
        }
        this.findEmployee = this.findEmployee.bind(this);
        this.findAllEmployees = this.findAllEmployees.bind(this);
        this.createEmployee = this.createEmployee.bind(this);
        this.updateEmployee = this.updateEmployee.bind(this);
        this.removeEmployee = this.removeEmployee.bind(this);
        this.removeEmployeeByIdentity = this.removeEmployeeByIdentity.bind(this);
        this.handleFileInput = this.handleFileInput.bind(this);
        this.handleImageDrop = this.handleImageDrop.bind(this);
        this.handleImageDragOver = this.handleImageDragOver.bind(this);
    }

    render() {
        return (
            <div className="container">
                <p/>
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">Employee Panel</h4>
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="identityNo">Identity No:</label>
                            <input type="text"
                                   name="identityNo"
                                   value={this.state.employee.identityNo}
                                   onChange={this.handleEmployeeInput}
                                   className="form-control"
                                   id="identityNo"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="fullname">Full Name:</label>
                            <input type="text"
                                   name="fullname"
                                   value={this.state.employee.fullname}
                                   onChange={this.handleEmployeeInput}
                                   className="form-control"
                                   id="fullname"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="iban">Iban:</label>
                            <input type="text"
                                   name="iban"
                                   value={this.state.employee.iban}
                                   onChange={this.handleEmployeeInput}
                                   className="form-control"
                                   id="iban"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="salary">Salary:</label>
                            <input type="text"
                                   value={this.state.employee.salary}
                                   onChange={this.handleEmployeeInput}
                                   className="form-control"
                                   name="salary"
                                   id="salary"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="birthYear">Birth Year:</label>
                            <input type="text"
                                   value={this.state.employee.birthYear}
                                   onChange={this.handleEmployeeInput}
                                   className="form-control"
                                   name="birthYear"
                                   id="birthYear"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="department">Department:</label>
                            <select className="form-control"
                                    value={this.state.employee.department}
                                    onChange={this.handleEmployeeInput}
                                    name="department"
                                    id="department">
                                <option>IT</option>
                                <option>Sales</option>
                                <option>Finance</option>
                                <option>HR</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="photo">Photo:</label>
                            <input type="file"
                                   className="form-control"
                                   id="photo"/>
                            <img className="img-thumbnail"
                                 style={{width: '128px', height: '128px'}}
                                 src={this.state.employee.photo} alt=''></img>
                            <label className="btn btn-info btn-file">
                                <input type="file"
                                       onChange={this.handleFileInput}
                                       className='d-none' id="photo"/>
                                <span>Browse</span>
                            </label>
                            <p/>
                            <div className="drop-zone"
                                 onDrop={this.handleImageDrop}
                                 onDragOver={this.handleImageDragOver}
                                 type="text" id="filedrag"></div>
                        </div>
                        <div className="form-group">
                            <label>Fulltime?
                                <input type="checkbox"
                                       onChange={this.handleEmployeeInput}
                                       value={this.state.employee.fulltime}
                                       name="fulltime"
                                       className="form-control">
                                </input>
                            </label>
                        </div>
                        <div className="form-group">
                            <button onClick={this.findEmployee} className="btn btn-success">Find</button>
                            <button onClick={this.findAllEmployees} className="btn btn-success">Find All</button>
                            <button onClick={this.createEmployee} className="btn btn-warning">Add</button>
                            <button onClick={this.updateEmployee} className="btn btn-warning">Update</button>
                            <button onClick={this.removeEmployee} className="btn btn-danger">Delete</button>
                        </div>
                    </div>
                </div>
                <p/>
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">Employees</h4>
                    </div>
                    <div className="card-body">
                        <table className="table table-bordered table-hover table-hover">
                            <thead>
                            <tr>
                                <th>No</th>
                                <th>Photo</th>
                                <th>Identity No</th>
                                <th>Fullname</th>
                                <th>Iban</th>
                                <th>Salary</th>
                                <th>Department</th>
                                <th>Birth Year</th>
                                <th>Fulltime?</th>
                                <th>Operations</th>
                            </tr>
                            </thead>
                            <tbody>{
                                this.state.employees.map((emp, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td><img className="img-thumbnail"
                                                     style={{width: '64px', height: '64px'}}
                                                     src={emp.photo} alt=''></img></td>
                                            <td>{emp.identityNo}</td>
                                            <td>{emp.fullname}</td>
                                            <td>{emp.iban}</td>
                                            <td>{emp.salary}</td>
                                            <td>{emp.department}</td>
                                            <td>{emp.birthYear}</td>
                                            <td>{emp.fulltime ? 'yes' : 'no'}</td>
                                            <td>
                                                <button onClick={() => this.removeEmployeeByIdentity(emp.identityNo)}
                                                        className="btn btn-danger">Delete
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

    createEmployee() {
        fetch('http://localhost:4001/employees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(this.state.employee)
        }).then(res => res.json()).then(response => {
            showSuccessMessage('Employee is created!');
        }).catch(error => {
            showErrorMessage(error);
        });

    }

    updateEmployee() {
        fetch('http://localhost:4001/employees', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(this.state.employee)
        }).then(res => res.json()).then(response => {
            if (response.n) {
                if (response.n > 0 && response.nModified > 0)
                    showSuccessMessage('Employee is updated!');
                else if (response.n > 0 && response.nModified === 0)
                    showSuccessMessage('No fields are updated!');
                else
                    showSuccessMessage("Employee is not updated!");
            }
        }).catch(error => {
            showErrorMessage(error);
        });
    }

    findEmployee() {
        let idx = Math.floor(Math.random() * 1000);
        fetch('http://localhost:4001/employees/' + this.state.employee.identityNo + '?_=' + idx)
            .then(res => res.json())
            .then(employee => {
                if (employee.photo === null) employee.photo = Config.NO_IMAGE;
                this.setState({employee: employee});
                showSuccessMessage('Employee is retrieved!');
            }).catch(error => {
            showErrorMessage(error);
        });
    }

    removeEmployee() {
        fetch('http://localhost:4001/employees/' + this.state.employee.identityNo, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json'
            }
        }).then(res => res.json()).then(employee => {
            this.setState({employee: employee});
            showSuccessMessage('Employee is removed!');
        });
    }

    removeEmployeeByIdentity(identity) {
        fetch('http://localhost:4001/employees/' + identity, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json'
            }
        }).then(res => res.json()).then(employee => {
            let employees = this.state.employees.filter(emp => emp.identityNo !== identity);
            this.setState({employee, employees});
            showSuccessMessage('Employee is removed!');
        });
    }

    findAllEmployees() {
        let idx = Math.floor(Math.random() * 1000);
        fetch('http://localhost:4001/employees?_=' + idx)
            .then(res => res.json()).then(employees => {
            this.setState({employees: employees});
            showSuccessMessage('Employees are retrieved!');
        });
    }

    handleFileInput(event) {
        event.preventDefault();
        var files = event.target.files || event.originalEvent.dataTransfer.files;
        var reader = new FileReader();
        reader.readAsDataURL(files[0]);
        let emp = {...this.state.employee};
        reader.onload = (e) => {
            emp.photo = e.target.result;
            this.setState({employee: emp});
        };
    }

    handleImageDrop(event) {
        event.preventDefault();
        var reader = new FileReader();
        reader.readAsDataURL(event.dataTransfer.files[0]);
        reader.onload = (e) => {
            let emp = {...this.state.employee};
            emp.photo = e.target.result;
            this.setState({employee: emp});
        };
    }

    handleImageDragOver(e) {
        e.preventDefault();
    }

    handleEmployeeInput = (event) => {
        let target = event.target;
        let name = target.name;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let emp = this.state.employee;
        emp[name] = value;
        this.setState({
            employee: emp
        })
    }
}
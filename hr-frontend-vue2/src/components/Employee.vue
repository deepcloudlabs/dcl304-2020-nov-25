<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                Employee Panel
            </div>
            <div class="card-body">
                <div class="form-group">
                    <label for="identityNo">Identity No</label>
                    <input type="text" class="form-control"
                           id="identityNo"
                           v-model="identityNo" />
                </div>
                <div class="form-group">
                    <label for="fullname">Full Name</label>
                    <input type="text" class="form-control"
                           id="fullname"
                           v-model="fullname" />
                </div>
                <div class="form-group">
                    <label for="iban">IBAN</label>
                    <input type="text" class="form-control"
                           id="iban"
                           v-model="iban" />
                </div>
                <div class="form-group">
                    <label for="salary">Salary</label>
                    <input type="number" class="form-control"
                           id="salary"
                           v-model="salary" />
                </div>
                <div class="form-group">
                    <label for="birthYear">Birth Year</label>
                    <input type="number" class="form-control"
                           id="birthYear"
                           v-model="birthYear" />
                </div>
                <div class="form-group">
                    <label for="department">Department</label>
                    <select class="form-control"
                           id="department"
                           v-model="department">
                        <option>IT</option>
                        <option>Sales</option>
                        <option>Finance</option>
                        <option>HR</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="photo">Photo</label>
                    <img class="img-thumbnail"
                          v-bind:src="photo">
                    <input type="file" id="photo" class="form-control" />
                </div>
                <div class="form-group">
                    <button class="btn btn-success"
                            @click="addEmployee">Add</button>
                    <button class="btn btn-info"
                            @click="findEmployee">Find</button>
                    <button class="btn btn-warning"
                            @click="updateEmp">Update</button>
                    <router-link class="btn btn-success"
                                 to="/employees">Find All</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import EmployeeService from '../services/EmployeeService'

    export default {
        name: "Employee",
        mixins: [
            EmployeeService
        ],
        props: [
            'emp'
        ],
        created(){
          if (this.$route.params.emp != null){
              this.identityNo = this.$route.params.emp.identityNo;
              this.fullname = this.$route.params.emp.fullname;
              this.iban = this.$route.params.emp.iban;
              this.photo = this.$route.params.emp.photo;
              this.salary = this.$route.params.emp.salary;
              this.birthYear = this.$route.params.emp.birthYear;
          }
        },
        data() {
            return {
                identityNo: '12345678910',
                fullname: '',
                iban: 'TR',
                photo: null,
                birthYear: 1980,
                salary: 2000,
                department: 'IT',
                fulltime: true
            }
        },
        methods: {
            addEmployee : function(){
                this.createEmployee({
                    identityNo: this.identityNo,
                    fullname: this.fullname,
                    iban: this.iban,
                    photo: null,
                    birthYear: this.birthYear,
                    salary: this.salary,
                    department: this.department,
                    fulltime: this.fulltime
                }).then( res => console.log(res) )
            },
            updateEmp : function(){
                this.updateEmployee({
                    identityNo: this.identityNo,
                    fullname: this.fullname,
                    iban: this.iban,
                    photo: null,
                    birthYear: this.birthYear,
                    salary: this.salary,
                    department: this.department,
                    fulltime: this.fulltime
                }).then( res => console.log(res) )
            },
            findEmployee : function(){
                this.getEmployee(this.identityNo)
                    .then( emp => {
                        this.fullname = emp.fullname;
                        this.iban = emp.iban;
                        this.salary = emp.salary;
                        this.department = emp.department;
                        this.birthYear = emp.birthYear;
                        if (emp.photo == null)
                            this.photo = 'data:image/png;base64,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';
                        else
                           this.photo = emp.photo;
                    })
            }
        }
    }
</script>

<style scoped>

</style>

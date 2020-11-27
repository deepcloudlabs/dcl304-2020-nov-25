<template>
    <div class="container">
        <div class="card">
            <div class="card-header">Employees</div>
            <div class="card-body">
                <table class="table table-striped table-responsive table-hover">
                    <thead>
                    <tr>
                        <th>No</th>
                        <th>Identity No</th>
                        <th>Full Name</th>
                        <th>Salary</th>
                        <th>Photo</th>
                        <th>Operations</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(emp,i) in employees">
                        <td>{{i}}</td>
                        <td><router-link :to="{name: 'home', params: {emp}}">{{emp.identityNo}}</router-link></td>
                        <td>{{emp.fullname}}</td>
                        <td>{{emp.salary}}</td>
                        <td><img class="img-thumbnail"
                                 v-bind:src="emp.photo"/></td>
                        <td>
                            <button @click="removeEmp(emp)"
                                    class="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import EmployeeService from '../services/EmployeeService'

    export default {
        name: "Employees",
        mixins: [EmployeeService],
        data() {
            return {
                employees: []
            }
        },
        created() {
            this.findAllEmps();
        },
        methods: {
            findAllEmps: function () {
                this.getEmployees().then(emps => this.employees = emps)
            },
            removeEmp(emp){
                console.log(emp)
                let identity = emp.identityNo;
                this.removeEmployee(identity)
                    .then( res => {
                        this.employees =
                            this.employees.filter( e => e.identityNo != identity);
                        console.log(res);
                    })
            }
        }

    }
</script>

<style scoped>

</style>
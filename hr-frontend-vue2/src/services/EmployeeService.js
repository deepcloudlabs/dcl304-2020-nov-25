export default {
    data() {
        return {

        }
    },
    methods :{
        getEmployee(identity){
            return fetch('http://localhost:4001/employees/'+identity)
                       .then(res => res.json());
        },
        createEmployee(emp){
            return fetch('http://localhost:4001/employees', {
              method: 'POST',
              headers: new Headers({'content-type': 'application/json'}),
              body: JSON.stringify(emp)  
            }).then(res => res.json());
        },
        updateEmployee(emp){
            return fetch('http://localhost:4001/employees', {
                method: 'PUT',
                headers: new Headers({'content-type': 'application/json'}),
                body: JSON.stringify(emp)
            }).then(res => res.json());
        },
        removeEmployee(identity){
            return fetch('http://localhost:4001/employees/'+identity, {
              method: 'DELETE'  
            }).then(res => res.json());
        },
        getEmployees(){
            return fetch('http://localhost:4001/employees')
                .then(res => res.json());
        }
    }
}
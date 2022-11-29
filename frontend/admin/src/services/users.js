import axios from "axios";
const API_URL = "http://localhost:8081/api/admin/";

class User {
    async getUsers () {
        return await axios.get(API_URL + "user", {
            headers: {
                "x-access-token": JSON.parse(localStorage.getItem("admin")).accessToken 
            }
        }).then(response => {
            return response.data;
        }).catch(err => console.log("Error: " + err));        
    }

    async addUser(surname, name, email, password, role) {
        return await axios.post(API_URL + "user", {surname, name, email, password, role}, {
            headers: {
                "x-access-token": JSON.parse(localStorage.getItem("admin")).accessToken 
            }
        });  
    }

    async updateUser(userId, surname, name, role) {
        return await axios.patch(API_URL + "user", {userId, surname, name, role}, {
            headers: {
                "x-access-token": JSON.parse(localStorage.getItem("admin")).accessToken 
            }
        });  
    }

    async deleteUser(userId) {
        return await axios.delete(API_URL + "user", {userId}, {
            headers: {
                "x-access-token": JSON.parse(localStorage.getItem("user")).accessToken
            }
        }); 
    }
}

export default new User();
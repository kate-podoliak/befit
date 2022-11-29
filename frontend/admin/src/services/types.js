import axios from "axios";
const API_URL = "http://localhost:8081/api/admin/";

class Type {
   
    async getTypes () {
        return await axios.get(API_URL + "type", {
            headers: {
                "x-access-token": JSON.parse(localStorage.getItem("admin")).accessToken 
            }
        }).then(response => {
            return response.data;
        }).catch(err => console.log("Error: " + err));        
    }

    async addType(name, description) {
        return await axios.post(API_URL + "type", {name, description}, {
            headers: {
                "x-access-token": JSON.parse(localStorage.getItem("admin")).accessToken 
            }
        });  
    }

    async updateType(typeId, name, description) {
        return await axios.patch(API_URL + "type", {typeId, name, description}, {
            headers: {
                "x-access-token": JSON.parse(localStorage.getItem("admin")).accessToken 
            }
        });  
    }

    async deleteType(typeId) {
        return await axios.delete(API_URL + "type", {typeId}, {
            headers: {
                "x-access-token": JSON.parse(localStorage.getItem("admin")).accessToken 
            }
        }); 
    }
}

export default new Type();
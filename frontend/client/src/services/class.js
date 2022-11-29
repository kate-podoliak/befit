import axios from "axios";
const API_URL = "http://localhost:8081/api/admin/";

class Class {
    async getClasses () { 
        return await axios.get(API_URL + "class").then(response => {
            return response.data;
        }).catch(err => console.log("Error: " + err));        
    }

    async getTrainers() {    
        return await axios.get(API_URL + "trainer", {
            headers: {
                "x-access-token": JSON.parse(localStorage.getItem("user")).accessToken
            }
        }).then(response => {
            return response.data;
        }).catch(err => console.log("Error: " + err));          
    }

    async getTypes() {
        return await axios.get(API_URL + "type", {
            headers: {
                "x-access-token": JSON.parse(localStorage.getItem("user")).accessToken
            }
        }).then(response => {
            return response.data;
        }).catch(err => console.log("Error: " + err));            
    }

    async getClassesByTypeAndTrainer(typeId, trainerId) {
        return await axios.post(API_URL + "classes", { typeId, trainerId }, {
            headers: {
                "x-access-token": JSON.parse(localStorage.getItem("user")).accessToken
            }
        }).then(response => {
            return response.data;
        }).catch(err => console.log("Error: " + err));        
    }
}

export default new Class;
import axios from "axios";
const API_URL = "http://localhost:8081/api/admin/";

class Class {
    async getClasses () { 
        return await axios.get(API_URL + "class").then(response => {
            return response.data;
        }).catch(err => console.log("Error: " + err));        
    }

    async getTrainers () {
        return await axios.get(API_URL + "trainer", {
            headers: {
                "x-access-token": JSON.parse(localStorage.getItem("admin")).accessToken 
            }
        }).then(response => {
            return response.data;
        }).catch(err => console.log("Error: " + err));        
    }

    async addClass(start_time, end_time, price, place, count, typeId, trainerId, adminId) {
        return await axios.post(API_URL + "class", {start_time, end_time, price, place, count, typeId, trainerId, adminId}, {
            headers: {
                "x-access-token": JSON.parse(localStorage.getItem("admin")).accessToken 
            }
        });  
    }

    async updateClass(classId, start_time, end_time, price, place, count, typeId, trainerId, adminId) {
        return await axios.patch(API_URL + "class", {classId, start_time, end_time, price, place, count, typeId, trainerId, adminId}, {
            headers: {
                "x-access-token": JSON.parse(localStorage.getItem("admin")).accessToken 
            }
        });  
    }

    async deleteClass(classId) {
        return await axios.delete(API_URL + "class", {classId}, {
            headers: {
                "x-access-token": JSON.parse(localStorage.getItem("admin")).accessToken
            }
        }); 
    }
}

export default new Class();
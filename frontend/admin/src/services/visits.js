import axios from "axios";
const API_URL = "http://localhost:8081/api/admin/";

class Visit {
    async getVisits () { 
        return await axios.get(API_URL + "visit", {
            headers: {
                "x-access-token": JSON.parse(localStorage.getItem("admin")).accessToken 
            }
        }).then(response => {
            return response.data;
        }).catch(err => console.log("Error: " + err));        
    }

    async addVisit(payment, visited, userId, classId) {
        return await axios.post(API_URL + "visit", {payment, visited, userId, classId}, {
            headers: {
                "x-access-token": JSON.parse(localStorage.getItem("admin")).accessToken 
            }
        });  
    }

    async updateVisit(visitId, payment, visited, userId, classId) {
        return await axios.patch(API_URL + "visit", {visitId, payment, visited, userId, classId}, {
            headers: {
                "x-access-token": JSON.parse(localStorage.getItem("admin")).accessToken 
            }
        });  
    }

    async deleteVisit(visitId) {
        return await axios.delete(API_URL + "visit", {visitId}, {
            headers: {
                "x-access-token": JSON.parse(localStorage.getItem("admin")).accessToken 
            }
        }); 
    }
}

export default new Visit();
import axios from "axios";
const API_URL = "http://localhost:8081/api/admin/";

class Visit {
    async sendVisit(userId, classId) {    
        return await axios.post(API_URL + "visit", { userId, classId }, {
            headers: {
                "x-access-token": JSON.parse(localStorage.getItem("user")).accessToken
            }
        });   
    }

    async deleteVisit(visitId) {
        return await axios.delete(API_URL + "visit", { visitId }, {
            headers: {
                "x-access-token": JSON.parse(localStorage.getItem("user")).accessToken
            }
        });
    }

    async getVisits(userId) {
        return await axios.post(API_URL + "history", { userId }, {
            headers: {
                "x-access-token": JSON.parse(localStorage.getItem("user")).accessToken
            }
        }).then(response => {
            return response.data;
        }).catch(err => console.log("Error: " + err));    
    }
}

export default new Visit;
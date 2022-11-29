import axios from "axios";
const API_URL = "http://localhost:8081/api/admin/";

class Review {
    async sendReview(text, userId, createdAt) {
        return await axios.post(API_URL + "review", { text, userId, createdAt }, {
            headers: {
                "x-access-token": JSON.parse(localStorage.getItem("user")).accessToken
            }
        }); 
    }

    async getReviews() {
        return await axios.get(API_URL + "review").then(response => {
            return response.data;
        }).catch(err => console.log("Error: " + err));    
    }
}

export default new Review();
import axios from "axios";
const API_URL = "http://localhost:8081/api/admin/";

class Review {
    async getReviews () { 
        return await axios.get(API_URL + "review", {
            headers: {
                "x-access-token": JSON.parse(localStorage.getItem("admin")).accessToken 
            }
        }).then(response => {
            return response.data;
        }).catch(err => console.log("Error: " + err));        
    }

    async deleteReview(reviewId, token) {
        return await axios.delete(API_URL + "review", {reviewId}, {
            headers: {
                "x-access-token": JSON.parse(localStorage.getItem("admin")).accessToken 
            }
        }); 
    }
}

export default new Review();
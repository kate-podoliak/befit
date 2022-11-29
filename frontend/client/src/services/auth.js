import axios from "axios";
const API_URL = "http://localhost:8081/api/auth/";

class Auth {
    async login(email, password) {
        return await axios.post(API_URL + "signin", { email, password }).then(response => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
    }

    async register(name, surname, email, password) {
        return await axios.post(API_URL + "signup", {
            name,
            surname,
            email,
            password
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"));
    }

    logout() {
        localStorage.removeItem("user");
    }
}

export default new Auth();
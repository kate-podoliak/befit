const express = require("express");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const db = require("./models");
const Role = db.role;
const User = db.user;

const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
}

const app = express();
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync({alert: true}).then(async () => {
    if (await Role.count() !== 3) {
        initial();
    }
});

app.use(cookieParser());
app.use(cookieSession({
        name: "befit-session",
        secret: "COOKIE_SECRET",
        httpOnly: true
    })
);

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to application."
    });
});

const PORT = process.env.PORT || 8081;

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/type.routes")(app);
require("./routes/review.routes")(app);
require("./routes/class.routes")(app);
require("./routes/visit.routes")(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

function initial() {
    Role.create({
        id: 1,
        name: "user"
    });
    Role.create({
        id: 2,
        name: "trainer"
    });
    Role.create({
        id: 3,
        name: "admin"
    });
    // User.create({
    //     surname: 'Root',
    //     name: 'Admin',
    //     email: 'admin@gmail.com',
    //     password: bcrypt.hashSync("12345", 8),
    //     roleId: "3"
    // });
}
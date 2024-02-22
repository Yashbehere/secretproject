//jshint esversion:6
import express, { query } from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "school",
    password: "postdb",
    port: 5432
});

db.connect();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res)=> {
    res.render("home");
});

app.get("/register", (req, res)=> {
    res.render("register");
});

app.get("/login", (req, res)=> {
    res.render("login");
});

app.post("/register", async (req, res)=> {
    const email1 = req.body.username;
    const password1 = req.body.password;

    try  {
        await db.query("insert into user1 values($1, $2)", [email1, password1]);
        res.render("secrets.ejs");
    }
    catch(err) {
        console.log(err);
    }
});

app.post("/login", async (req, res)=> {
    const email2 = req.body.username;
    const password2 = req.body.password;

    const result = await db.query("select * from user1");
    const data = result.rows;

    try {
        const checkUser = data.find((user)=> user.email == email2);
        if(checkUser.password1 === password2) {
            res.render("secrets.ejs");
        }
        else {
            res.render("login.ejs");
        }
        
    }
    catch(err) {
        console.log(err);
    }

});

app.listen(port, ()=> {
    console.log(`server was on the port ${port}`);
});
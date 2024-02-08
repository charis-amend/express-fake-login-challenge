import express, { response } from "express";
import path, { dirname } from "path"
import { URL } from "url";

// Reads the PORT value from the environment variable `PORT`.
// If not found, uses the default value of 3000.
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json())
app.use(express.urlencoded())

// 1. GET /
//    -> specificy the path of the local created server
//    -> we need the absolute path of the current directory!
//    -> import path module:
//       import path from "path"
//    -> then create variable for the directoryName -> getting with "dirname"
const directoryName = path.dirname(new URL(import.meta.url).pathname)
app.get("/", function (request, response) {
    console.log("serving index.html welcome page...")
    response.sendFile(path.join(directoryName, "/index.html"))
})


// 2. GET /echo/:message
app.get("/echo/:message", (request, response) => {
    console.log("--------------- request -------------", request.params)
    const message = request.params.message

    if (message === "hello") {
        response.send("hello")
    } else {
        response.send("the secret is... 42!")
    }
});



app.get("/login", (request, response) => {
    response.sendFile(path.join(directoryName, "/login.html"))
})
app.get("/myaccount", (request, response) => {
    response.sendFile(path.join(directoryName, "/myaccount.html"))
})
app.get("/error", (request, response) => {
    response.sendFile(path.join(directoryName, "/error.html"))
})


app.post("/login/", (request, response) => {

    console.log("--------------- form input -------------", request.body)

    const inputEmail = request.body["input-email"]
    const inputPW = request.body["input-password"]
    // if (inputEmail) === if(inputEmail === true)
    if (inputEmail === "" && inputPW === "") {
        // response.json({ success: false });
        response.redirect("/error")
    }
    else if (inputEmail === "user@email.com" && inputPW === "very-secret") {
        response.json({ success: true });
        response.redirect("/myaccount")
    } else {
        // response.json({ success: false });
        response.redirect("/error")
    }
})





// response.send(path.join(directoryName, "/error.html"))
// console.log("serving error.html")


// starting server, after all route definitions:
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
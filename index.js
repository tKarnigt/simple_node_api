const express = require("express")
const app = express()

const plusHandler = (req, res) => {
    const result = parseInt(req.params.num1) + parseInt(req.params.num2);
    res.json(result);
};

app.get("/", (req, res) => res.send("Hello World!"))
app.get("/secret", (req, res) => res.send("This is SECRET! I won't tell you :P"))
app.get("/plus/:num1/:num2",plusHandler)
const server = app.listen(3001, () => console.log("Application is listening on port 3001!"))

module.exports = {
    plusHandler,
    server
}

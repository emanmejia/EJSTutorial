// Load packages and access services
const express = require("express");
const app = express();

const multer = require("multer");
const upload = multer();

// Setup view engine to ejs
app.set('view engine', 'ejs');

// Serve static content directly
app.use(express.static("css"));

// Start listening to incoming requests
// If process.env.PORT is not defined, port number 5001 is used
const listener = app.listen(process.env.PORT || 5001, () => {
    console.log(`Your app is listening on port ${listener.address().port}`);
});

// Add middleware to parse default urlencoded form
app.use(express.urlencoded({ extended: false }));

// Enable CORS (see https://enable-cors.org/server_expressjs.html)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Setup routes

// Route to the services page
app.get('/services', (request, response) => {
    //Data
    const name = "Amy";
    const data = {
        years: 5,
        services: [
            {
                name: "Consulting",
                desc: "State of the art consulting services"
            },
            {
                name: "Education",
                desc: "Educate your work force"
            },
            {
                name: "Security",
                desc: "Secure your network"
            }
        ]
    };
    response.render("services",
        {
            name: name,
            data: data
        });
}); 

// Route to the welcome page
app.get('/', (request, response) => {
    response.render("index");
});

// GET Route to form page
app.get('/formPost', (req, res) => {
    res.render("formPost", {
        message: "get", // EJS will show the blank form
        data: {
            name: "",
            email: "",
            payment: ""
        }
    });
});


app.post('/formPost', upload.array(), (req, res) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        payment: req.body.payment
    };

    res.render("formPost", {
        message: "post", // So your EJS knows it’s a postback
        data: data
    });
});


// GET Route to form page (AJAX)
app.get('/formAjax', (request, response) => {
    response.render("formAjax")
});

// POST Route to form page (AJAX)
app.post('/formAjax', upload.array(), (request, response) => {    
    // Send form data back to the form
    const data = {
        name: request.body.name,
        email: request.body.email,
        payment: request.body.payment
    };
    //Send the caller (formAjax) the data in JSON format
    response.json(data);
});

// Enable CORS (see https://enable-cors.org/server_expressjs.html)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
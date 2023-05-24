const express = require("express");
const openAI = require("openai");
const morgan = require("morgan");
const path = require("path");
const ejs = require("ejs");
const app = express();
const bodyParser = require("body-parser");

// Importamos dotenv para acceder a variables de entorno
require("dotenv").config();

/* MIDDLEWARES */
app.use(morgan("dev"));
app.use(express.json());
//Configurando archivos estáticos
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/test", (req, res) => {
	res.render("index", {respuesta: null});
});

// Importamos y configuramos el cliente OpenAI API
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
	apiKey: process.env.TOKEN,
});
const openai = new OpenAIApi(configuration);

//Parámetros de la API
let temperature = 0.9;
let max_tokens = 150;
let top_p = 1;
let frequency_penalty = 0;
let presence_penalty = 0.6;

// Definimos el prompt
const conversationContextPrompt = "";

app.post("/test", (req, res) => {
	const message = req.body.message;
	// LLamando a la API de OpenAI
	openai
	.createCompletion({
		model: "text-davinci-003",
		// Agregamos a la conversación el mensaje en cuestión
		prompt: conversationContextPrompt + message,
		temperature,
		max_tokens,
		top_p,
		frequency_penalty,
		presence_penalty,
		stop: [" Human:", " AI:"],
	})
	.then((response) => {
		const resp = response.data.choices[0].text;
		res.render("index", { respuesta: resp });
	})
	.catch((error) => {
		console.error(error);
		// Manejar el error aquí y enviar una respuesta adecuada al cliente
	});
});

app.post("/test", (req, res) => {
	const { value1, value2, value3, value4, value5 } = req.body;
	temperature = parseFloat(value1);
    max_tokens = parseInt(value2);
    top_p = parseFloat(value3);
    frequency_penalty = parseFloat(value4);
    presence_penalty = parseFloat(value5);
	res.json({ message: "Respuesta generada con los nuevos parámetros" })
	console.log("funcionaSupongo")
});


// Escuchamos en el puerto correspondiente
app.listen(2500, () => {
	console.log("Chatbot escuchando en el puerto 2500!");
});

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

//Linea agregada al error: "refused to execute script from 'http://localhost:2500/app.js' because its MIME type ('text/html') is not executable, and strict MIME type checking is enabled"
app.use(express.static('./', {
	setHeaders: (res, path) => {
		if (path.endsWith('.js')) {
			res.setHeader('Content-Type', 'application/javascript');
		}
	}
}));

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
	if (req.body.value1 || req.body.value2 || req.body.value3 || req.body.value4 || req.body.value5) {
		// Si se actualizan los valores en los sliders, actualiza los parámetros correspondientes en el server
		temperature = parseFloat(req.body.value1);
		console.log("nuevo valor de temperature ", temperature);
		max_tokens = parseInt(req.body.value2);
		console.log("nuevo valor de max_tokens: ", max_tokens);
		top_p = parseFloat(req.body.value3);
		console.log("nuevo valor de top_p ", top_p);
		frequency_penalty = parseFloat(req.body.value4);
		console.log("nuevo valor de frequency_penalty: ", frequency_penalty);
		presence_penalty = parseFloat(req.body.value5);
		console.log("nuevo valor de presence_penalty: ", presence_penalty);
		res.json({ message: "Parámetros actualizadas correctamente" });
	} else {
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
	}
});

// Escuchamos en el puerto correspondiente
app.listen(2500, () => {
	console.log("Chatbot escuchando en el puerto 2500!");
});
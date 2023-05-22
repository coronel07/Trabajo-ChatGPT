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

// Definimos el prompt
const conversationContextPrompt = "información de Messi";

app.post("/test", (req, res) => {
	const message = req.body.message;
	// LLamando a la API de OpenAI
	openai
		.createCompletion({
			model: "text-davinci-003",
			// Agregamos a la conversación el mensaje en cuestión
			prompt: conversationContextPrompt + message,
			temperature: 0.9,
			max_tokens: 150,
			top_p: 1,
			frequency_penalty: 0,
			presence_penalty: 0.6,
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


// Escuchamos en el puerto correspondiente
app.listen(2500, () => {
	console.log("Chatbot escuchando en el puerto 2500!");
});

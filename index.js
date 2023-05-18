const express = require("express");
const openAI = require("openai");
const morgan = require("morgan");
const path = require("path");

// Importamos dotenv para acceder a variables de entorno
require("dotenv").config();

const app = express();

/* MIDDLEWARES */
app.use(morgan("dev"));
app.use(express.json());
//Configurando archivos estáticos
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Importamos y configuramos el cliente OpenAI API
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
	apiKey: process.env.TOKEN,
});
const openai = new OpenAIApi(configuration);

// Definimos el prompt
const conversationContextPrompt = "información de messi";

// Defining an endpoint to handle incoming requests
app.post("/test", (req, res) => {
	// Extracting the user's message from the request body
	const message = req.body.message;
	// LLamando a la API de OpenAI
	openai
		.createCompletion({
			model: "text-davinci-003",
			// Agregamos a la conversación el mesansaje en cuestión
			prompt: conversationContextPrompt + message,
			temperature: 0.9,
			max_tokens: 150,
			top_p: 1,
			frequency_penalty: 0,
			presence_penalty: 0.6,
			stop: [" Human:", " AI:"],
		})
		.then((response) => {
			// Sending the response data back to the client
			res.send(response.data.choices);
		});
});

// Escuchamos en el puerto correspondiente
app.listen(3000, () => {
	console.log("Chatbot escuchando en el puerto 3000!");
});

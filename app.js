/*NO ANDA NADA SI PONES LOS SCRIPTS QUE MODIFIQUEN COSAS DEL EJS ACA NO SE PORQUE VAYA,
HAY Q PONERLOS EN EL INDEX.EJS LAMENTABLEMENTE, HAY Q PREGUNTARLE A ALGÚN PROFE O NO SE*/
// ok
/*YA ANDA LE PREGUNTE A CHAT GPT Y ME DIJO Q AGREGARA UNA LINEA DE CÓDIGO
AL SERVER Y FUNCA*/

let slider1 = document.getElementById("mySlider1");
let output1 = document.getElementById("sliderValue1");

// SLIDER 1
slider1.addEventListener("input", function () {
    output1.innerHTML = this.value;
});

output1.innerHTML = slider1.value;

let slider2 = document.getElementById("mySlider2");
let output2 = document.getElementById("sliderValue2");

// SLIDER 2
slider2.addEventListener("input", function () {
    output2.innerHTML = this.value;
});

output2.innerHTML = slider2.value;

let slider3 = document.getElementById("mySlider3");
let output3 = document.getElementById("sliderValue3");

// SLIDER 3
slider3.addEventListener("input", function () {
    output3.innerHTML = this.value;
});

output3.innerHTML = slider3.value;

let slider4 = document.getElementById("mySlider4");
let output4 = document.getElementById("sliderValue4");

// SLIDER 4
slider4.addEventListener("input", function () {
    output4.innerHTML = this.value;
});

output4.innerHTML = slider4.value;

let slider5 = document.getElementById("mySlider5");
let output5 = document.getElementById("sliderValue5");

// SLIDER 5
slider5.addEventListener("input", function () {
    output5.innerHTML = this.value;
});

output5.innerHTML = slider5.value;



//Lógica para que se guarden los valores modificados de los sliders y poder hacer que la IA de una respuesta de acuerdo a estos.
const saveValuesBtn = document.getElementById("save-values-btn");

// Función para enviar los valores de los sliders al servidor
function saveSliderValues() {
    // Obtener los valores de los sliders
    const value1 = parseFloat(slider1.value);
    const value2 = parseInt(slider2.value);
    const value3 = parseFloat(slider3.value);
    const value4 = parseFloat(slider4.value);
    const value5 = parseFloat(slider5.value);
    
    // Crea un objeto con los valores de los sliders
    const sliderValues = {
        value1,
        value2,
        value3,
        value4,
        value5
    };
    
    console.log("ya estan guardados")
    
    // Realiza una solicitud POST al servidor con los valores de los sliders
    fetch("/test", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(sliderValues)
    })
    .then(response => response.json())
    .then(data => {
        // Maneja la respuesta del servidor si es necesario
        console.log("Respuesta del servidor:", data);
    })
    .catch(error => {
        console.error("Error al enviar los valores de los sliders:", error);
    });
}

// Escucha el evento 'click' en el botón para guardar los valores
saveValuesBtn.addEventListener("click", saveSliderValues);

function mostrarParticipantes() {
    var cuadro = document.getElementById("cuadroParticipantes");
    cuadro.classList.toggle("oculto");
}

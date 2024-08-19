let data=[];
let div_principal = document.getElementById("principal");

async function llamarApi() {
    try{
        let resultado = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita');
        data = await resultado.json();
        console.log(data)
        renderInfo(data);
    }
    catch(error){
        console.log(error);
    }
}

function renderInfo(datos){
    for (let i=0;i<datos.drinks.length;i++){
        let bebida=datos.drinks[i];

        let carta=document.createElement("div");
        carta.classList.add("carta")

        let nombreBebida= document.createElement("h4");
        nombreBebida.innerHTML=bebida.strDrink
        nombreBebida.style.margin="0";
        nombreBebida.style.textAlign="center";
        nombreBebida.style.margin="5px";

        let imagen= document.createElement("img");
        imagen.src=`${bebida.strDrinkThumb}`

        let medidas = document.createElement("p");
        let cantidadIngredientes=0;
        contenido = '';


        for (let i=0;i<15;i++){     //15 es el máximo de ingredientes en la api
            if(bebida[`strIngredient${i}`] != null){
                cantidadIngredientes++
            }
        }

        for (let i = 1; i <= cantidadIngredientes; i++) {
            let medida = bebida[`strMeasure${i}`];
            let ingrediente = bebida[`strIngredient${i}`];

            if (medida && ingrediente) {
                contenido += `${medida} de ${ingrediente},<br>`;
            }
        }
        // Eliminar la última coma y el <br> si contenido no está vacío
        if (contenido.endsWith(",<br>")) {
            contenido = contenido.slice(0, -5); // -5 porque ",<br>" tiene 5 caracteres
        }

        medidas.innerHTML = `<b>Ingredientes:</b> <br> ${contenido}`;
        medidas.style.margin="5px"

        let preparacion= document.createElement("p");
        preparacion.innerHTML=`<b>Preparación:</b> <br> ${bebida.strInstructions}`
        preparacion.style.margin="5px";

        let tagSection = document.createElement("p")
        let tags=bebida.strTags
        if (!tags){
            tags="No tags"
        }

        tagSection.style.margin="5px"
        tagSection.innerHTML=`Tags: <br> ${tags}`;

        carta.appendChild(nombreBebida)
        carta.appendChild(imagen)
        carta.appendChild(medidas)
        carta.appendChild(preparacion)
        carta.appendChild(tagSection)
        
        div_principal.appendChild(carta)
    }
}

llamarApi();
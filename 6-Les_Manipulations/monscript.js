let dateJour = new Date(Date.now());
let dateJourFr = dateJour.toLocaleDateString('fr-FR')
let li = document.querySelector("#listeCourses li");
let titreH2 = document.querySelector("h2");
let myInput = document.querySelector("#myInput");
let btn = document.querySelector(".btn");
let liste = document.querySelector("#listeCourses");

titreH2.textContent = titreH2.textContent + " du " + dateJourFr;


li.addEventListener('click', ()=>{
  li.classList.toggle('itemCheck');
});

btn.addEventListener('click', addProduct);

function addProduct() {
let valeurSaisie = myInput.value;

    if (valeurSaisie === "") {
        alert("Erreur");
    } else {
        let nouvelElement = document.createElement("li");
        nouvelElement.textContent = valeurSaisie;

        nouvelElement.addEventListener('click', () => {
            nouvelElement.classList.toggle('itemCheck');
        });

        nouvelElement.addEventListener('dblclick', () => {
            nouvelElement.remove();
            alert("Produit supprimé");
        });

        liste.appendChild(nouvelElement);
        myInput.value = "";
    }

}

myInput.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        addProduct();
    }
});
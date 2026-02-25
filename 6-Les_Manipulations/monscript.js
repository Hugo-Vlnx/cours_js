let dateJour = new Date(Date.now());
let dateJourFr = dateJour.toLocaleDateString('fr-FR');
let titreH2 = document.querySelector("h2");
let myInput = document.querySelector("#myInput");
let btn = document.querySelector(".btn");
let liste = document.querySelector("#listeCourses");

titreH2.textContent = titreH2.textContent + " du " + dateJourFr;

btn.addEventListener('click', addProduct);

function addProduct() {
    let saisie = myInput.value.trim();

    if (saisie === "") {
        alert("Erreur de saisie");
    } else {
        let maj = saisie.charAt(0).toUpperCase() + saisie.slice(1).toLowerCase();
        
        let elementsListe = liste.querySelectorAll("li");
        let produitExistant = false;

        for (let i = 0; i < elementsListe.length; i++) {
            let texteElement = elementsListe[i].textContent;

            if (texteElement === maj || texteElement.startsWith(maj + " (x")) {
                produitExistant = true;
                
                if (texteElement === maj) {
                    elementsListe[i].textContent = maj + " (x2)";
                } else {
                    let quantiteActuelle = parseInt(texteElement.split("(x")[1]);
                    let nouvelleQuantite = quantiteActuelle + 1;
                    elementsListe[i].textContent = maj + " (x" + nouvelleQuantite + ")";
                }
                break;
            }
        }

        if (!produitExistant) {
            let nouvelElement = document.createElement("li");
            nouvelElement.textContent = maj;

            nouvelElement.addEventListener('click', () => {
                nouvelElement.classList.toggle('itemCheck');
            });

            nouvelElement.addEventListener('dblclick', () => {
                nouvelElement.remove();
                alert("Produit supprimé");
            });

            liste.appendChild(nouvelElement);
        }

        myInput.value = "";
    }
}

myInput.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        addProduct();
    }
});
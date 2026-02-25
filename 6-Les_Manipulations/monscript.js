let dateJour = new Date(Date.now());
let dateJourFr = dateJour.toLocaleDateString('fr-FR')
            
/* Toutes les variables */
let li = document.querySelector("#listeCourses li");
let titreH2 = document.querySelector("h2");
titreH2.textContent = titreH2.textContent + " du " + dateJourFr;
/* Tous les évènements */
li.addEventListener('click', ()=>{
  li.classList.toggle('itemCheck');
});
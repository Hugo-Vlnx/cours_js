
// function calculerAge(){
//     let born = parseInt(prompt("annee de naissance ???"))
//     let year = parseInt(prompt("annee de actuelle"))
//     let age = year - born;
//     alert(` vous avez ${age}`);
// }
// calculerAge();
const dateActuelle = new Date();
const year = dateActuelle.getFullYear();

const calculerAge = ()=>{
    let born = parseInt(prompt("annee de naissance ???"))
   
    let age = year - born;
    alert(` vous avez ${age}`);
}
calculerAge();
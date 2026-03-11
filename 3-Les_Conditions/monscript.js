// let number = 5;
// let text = '5';
// let isRainingToday = true;
// if(number == text){
//     console.log("true==")
// }
// else{
//     console.log("false ==");
// }
// if(number === text){
//     console.log("true===");
// }
// else{
//     console.log("false ===");
// }
// if(isRainingToday === true){
//     console.log("Where is my Umbrella");
// }




// let age =prompt("Quelle âge avez-vous ?");

// if(age<18 && age>0){
//     console.log(`L’utilisateur a ${age} an(s), il est mineur!` );
// }
// else if(age>=18 && age<62){
//      console.log(`L’utilisateur a ${age} an(s), il est majeur!` );
// }
// else{
//     console.log(`L’utilisateur a ${age} an(s), il est majeur mais aussi retraité !!` );
// }

let age = prompt("Quel âge avez-vous ?");

if (age === 18) {
    alert("Il vient d’être majeur");
} else if (age === 25) {
    alert("Il a un quart de siècle");
} else if (age === 50) {
    alert("Il a un demi-siècle");
} else if (age === 62) {
    alert("Il vient d’être à la retraite");
} else if (age === 100) {
    alert("Il vient d’être centenaire");
}
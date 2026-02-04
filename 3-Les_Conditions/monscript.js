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

let age =prompt("Quelle âge avez-vous ?");

if(age<18 && age>0){
    console.log(`L’utilisateur a ${age} an(s), il est mineur!` );
}
else if(age>=18 && age<62){
     console.log(`L’utilisateur a ${age} an(s), il est majeur!` );
}
else{
    console.log(`L’utilisateur a ${age} an(s), il est majeur mais aussi retraité !!` );
}
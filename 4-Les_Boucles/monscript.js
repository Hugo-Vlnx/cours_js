let i = 1;
let nbr = 0;

while (i<= 100){
    nbr =  nbr + i;
    i++;

}

console.log(nbr);
let tot =0;
let num = parseInt(prompt("saisir nombre"));
if(num > 0){
  do{
      tot= tot + num;
      num--;

  }while(num >=0)
}

console.log(`utilisateur ${tot}`);

let tableau = [0,1,2,3,4,5,6,7,8,9]
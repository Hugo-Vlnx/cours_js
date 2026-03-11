let btn = document.querySelector('#btnAjouter');
let saisie = document.querySelector('#nomInvite');
let liste = document.querySelector('#listeInvites');

btn.addEventListener('click', ()=>{
    let nom = saisie.value.trim();
    if(nom===""){
        alert("texte vide");
    
    }
    else{
        let invite = document.createElement('li');
        invite.textContent = nom;

        invite.addEventListener('click', ()=>{
            invite.classList.toggle('invite-confirme');
        })

        liste.appendChild(invite);
    }
})
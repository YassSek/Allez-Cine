// Get DOM Elements
let corp = document.getElementById('message')
let message = document.getElementsByClassName('modal')
const modal = document.getElementById('my-modal');
const modalBtn = document.getElementById('modal-btn');
const closeBtn = document.querySelectorAll('.close');
console.log(modal,corp,message)
// login et register DOM
const logBtn=document.getElementById('log-in')

const regBtn=document.getElementById('inscription')

const logModal=document.getElementById('login-modal')

const regModal=document.getElementById('regis-modal')
//EVENT
logBtn.addEventListener('click',openLogin); 
regBtn.addEventListener('click',openRegister);

// for(let btn of logBtn){
//     btn.addEventListener('click',openLogin); // queryselectorALL selectionne tout les element mais il faut parcourir les elements d'ou la boucle FOR OF qui va reagire a chaque element BTN 
//                                              // de l'element logBtn ( qui prends tout les selector de la class .btnConnexion) et va activer l'event listener
// }

// Events modal message
modalBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);


//open login & reigster
function openRegister(){
    regModal.style.display='block';  
}
function openLogin(){
    logModal.style.display='block';
}



// Open modal message
function openModal() {

    let lastName = document.getElementById('inputLastname').value;
    let firstName = document.getElementById('inputFirstname').value;
    let email = document.getElementById('inputEmail').value;
    let subject = document.getElementById('inputSubject').value;
    let textArea = document.getElementById('textarea').value;
    let phrase = "Bonjour " + lastName + "   " + firstName + "   Votre Email est:  " + email + "  Votre question porte sur  " + subject + " Voici votre message:   " + textArea;

    modal.style.display = 'block';
    corp.innerText = phrase;
}


// Close
for(let e of closeBtn){
    e.addEventListener('click',closeModal);
}

function closeModal() {

    modal.style.display = 'none';

    logModal.style.display = 'none';

    regModal.style.display = 'none';  
}

// Close If Outside Click
function outsideClick(e) {

    if (e.target == modal) {
        modal.style.display = 'none';
    }
    if(e.target ==logModal){
        logModal.style.display='none';
    }
    if(e.target ==regModal){
        regModal.style.display='none'; 
    }

}





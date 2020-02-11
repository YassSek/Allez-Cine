        

    document.getElementById("submit").addEventListener("click",(e)=>{
        e.preventDefault();

        let recap=document.getElementById('popup');
        let lastName = document.getElementById('inputLastname').value;
        let firstName = document.getElementById('inputFirstname').value;
        let email = document.getElementById('inputEmail').value;
        let subject = document.getElementById('inputSubject').value;
        let textArea = document.getElementById('textarea').value;
       
        console.log(recap)

         recap.innerHTML= "Bonjour "+lastName +" "+firstName + "</br>Votre Email est: "+email + "</br>Votre question porte sur "+ subject + "</br>Voici votre message: " + textArea;
        
        
    })


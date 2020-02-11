        //  document.getElementById("submit").addEventListener("click", (e) => {

        //     e.preventDefault();
        //     let recap = document.getElementById('popup');
        //     let lastName = document.getElementById('inputLastname').value;
        //     let firstName = document.getElementById('inputFirstname').value;
        //     let email = document.getElementById('inputEmail').value;
        //     let subject = document.getElementById('inputSubject').value;
        //     let textArea = document.getElementById('textarea').value;

        //     recap.innerText= "Bonjour "+lastName +" "+firstName + "</br>Votre Email est: "+email + "</br>Votre question porte sur "+ subject + "</br>Voici votre message: " + textArea;




        //  })


        // $('#myModal').on('shown.bs.modal', function () {




        // })

        // Get DOM Elements
        let corp = document.querySelector('.modal-body')
        const modal = document.querySelector('#my-modal');
        const modalBtn = document.querySelector('#modal-btn');
        const closeBtn = document.querySelector('.close');

        // Events
        modalBtn.addEventListener('click', openModal);
        closeBtn.addEventListener('click', closeModal);
        window.addEventListener('click', outsideClick);

        // Open
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
        function closeModal() {
            modal.style.display = 'none';
        }

        // Close If Outside Click
        function outsideClick(e) {
            if (e.target == modal) {
                modal.style.display = 'none';
            }
        }
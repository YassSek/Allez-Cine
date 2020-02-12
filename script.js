// MESSAGE COOKIES
// window.confirm("Nous utilisons des données non sensibles comme des cookies ou des identifiants électroniques pour afficher un contenu personnalisées, mesurer le nombre de visiteurs,ect. Cliquez sur le bouton pour donner votre consentement à ces opérations et profiter d'une expérience personnalisée.");
// $('.carousel').carousel()


// feature movies  
let trends=[]
const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
 
   
 
function fetchFilms(){//RECUPERE 2O FILMS avec leurs infos de base
   
    const fims= fetch("https://api.themoviedb.org/3/trending/movie/week?api_key=5c717347fca7ad27bbc4791dbc618e51", requestOptions)
    .then(response => response.json())
    .then(result => {
        Array.from(result.results).forEach( el=>{
            trends.push([el.id,el.title,el.release_date,el.poster_path,el.genre_ids])
            })
        AddGenre(trends)
    })
   
 
}
 
function AddGenre(arr){//Change les id de genre directement par les noms de genres
    genrebyid=[]
    let genre= fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=5c717347fca7ad27bbc4791dbc618e51&language=en-US", requestOptions)
    .then(response => response.json())
    .then(result => {
        Array.from(result.genres).forEach( el=>{
            genrebyid.push(el)
            })
        for(el in arr){
            for(e in (arr[el][4])){
                genre=genrebyid.find(x => x.id == arr[el][4][e])
                arr[el][4][e]=genre.name
            }
        }
        createCards(arr)
        // console.log(arr)
    })
}
 
function createCards(arr){
    let target = document.getElementById("target")
    let template = document.getElementById("tpl")
    for (ele of arr){
        let clone = document.importNode(template.content, true)
        // console.log(clone)
        //ID DU FILM
        let idfilm=clone.getElementById("card")
        idfilm.setAttribute("value",ele[0])
        //Titre du film
        let title = clone.querySelectorAll("h5")
        title[0].textContent = ele[1]
        //Poster du film
        let image=clone.querySelectorAll("img")
        image[0].setAttribute("src",'https://image.tmdb.org/t/p/w500'+ele[3])
        //Genres
        let genre = clone.querySelectorAll("p")
        genre[0].textContent = ele[4].join(', ')
        let date = clone.querySelectorAll("i")
        date[0].textContent = ele[2]
        target.appendChild(clone)
    }
}
 
 
fetchFilms()
document.getElementById("action").addEventListener('click',()=>{
    // console.log('ACTION')
    let cards=document.getElementsByClassName('cds')
    for(i=0;i<cards.length;i++){
        par=card[i].querySelectorAll("p")
        if(!par[0].textContent.includes('Action')){
            cards[i].style.display="none"
        }else{
            cards[i].style.display="initial"
        }
    }
})
document.getElementById("drama").addEventListener('click',()=>{
    // console.log('DRAMA')
    let cards=document.getElementsByClassName('cds')
    for(i=0;i<cards.length;i++){
        par=card[i].querySelectorAll("p")
        if(!par[0].textContent.includes('Drama')){
            cards[i].style.display="none"
        }else{
            cards[i].style.display="initial"
        }
    }
})

let trends=[]
let shows=6
const requestOptions = { // pour ne pas reecrire a chaque fetch la même methode
    method: 'GET',
    redirect: 'follow'
  };

    

function fetchFilms(){//RECUPERE 2O FILMS avec leurs infos de base
    
    const fims= fetch("https://api.themoviedb.org/3/trending/movie/week?api_key=5c717347fca7ad27bbc4791dbc618e51", requestOptions)
    .then(response => response.json())
    .then(result => {
        Array.from(result.results).forEach( el=>{ // resultS a été vu dans postman en ouvrant en json
            trends.push([el.id,el.title,el.release_date,el.poster_path,el.genre_ids]) // le tableau de tableau 
            })         // [0]id  [1]titre     [2]date   [3]images      [4]genres    
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
                genre=genrebyid.find(x => x.id == arr[el][4][e]) // stock les valeur numerale des genre en les cherchant avec find
                arr[el][4][e]=genre.name // remplace la valeur numerale trouvé par find par leur nom ecrit "dssfdf"
            } // boucle qui convertit la valeur du genre qui est un chiffre par son nom de genre correspondant
        }
        createCards(arr)
        
        // console.log(arr)
    })
}

function createCards(arr){
    let target = document.getElementById("target")
    let template = document.getElementById("tpl")
    let i=0
    for (ele of arr){
        let clone = document.importNode(template.content, true)
        if(i>=6){
            let disp=clone.querySelectorAll('div')
            disp[0].style.display='none'
        }
        i++
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



async function fetchTrailer(id){
    let res= await fetch("http://api.themoviedb.org/3/movie/"+id+"/videos?api_key=5c717347fca7ad27bbc4791dbc618e51", requestOptions)
    .then(response => response.json())
    .then(result => result)
    .catch(error => console.log('error', error));
    document.getElementById('iframeboy').setAttribute('src',"https://www.youtube.com/embed/"+res.results[0].key)
    let des= await fetch("http://api.themoviedb.org/3/movie/"+id+"?api_key=5c717347fca7ad27bbc4791dbc618e51", requestOptions)
    .then(response => response.json())
    .then(result => result)
    .catch(error => console.log('error', error));
    
    let casts= await fetch("http://api.themoviedb.org/3/movie/"+id+"/credits?api_key=5c717347fca7ad27bbc4791dbc618e51", requestOptions)
    .then(response => response.json())
    .then(result => result)
    .catch(error => console.log('error', error));
    document.getElementById('descr').textContent=des.overview
    document.getElementById('real').textContent=' '+casts.crew.find(x => x.job == 'Director').name
    document.getElementById('actors').textContent=' '+casts.cast[0].name+' ,'+casts.cast[1].name
    document.getElementById('reldate').textContent=' '+des.release_date
    setTimeout(function(){ document.getElementById('modalvid').style.display='block'}, 500)

}


document.getElementById("action").addEventListener('click',()=>{
    
    document.getElementById('showmore').style.display='none'
    document.getElementById('showless').style.display='none'
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
   
    document.getElementById('showmore').style.display='none'
    document.getElementById('showless').style.display='none'
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

document.getElementById("all").addEventListener('click',()=>{
    
    document.getElementById('showmore').style.display='initial'
    document.getElementById('showless').style.display='none'
    let cards=document.getElementsByClassName('cds')
    shows=6
    for(i=0;i<cards.length;i++){
        if(i<6){
            cards[i].style.display="initial";
        }else{
            cards[i].style.display="none";
        }
        
    }
})

document.getElementById("showmore").addEventListener('click',()=>{
    document.getElementById('showless').style.display='inline'
    let cards=document.getElementsByClassName('cds')
        for(i=shows;i<shows+6;i++){
            if(i<cards.length)
                cards[i].style.display="initial"
        }
        if(shows+6<cards.length){
            shows+=6
        }else if(shows<cards.length){
            shows+=cards.length-shows
        } 
    }
    )

document.getElementById("showless").addEventListener('click',()=>{
    let cards=document.getElementsByClassName('cds')
        if(shows>6){
            if(shows%6==0){
                for(j=shows;j>=shows-6;j--){
                    cards[j].style.display="none"
                }
                shows-=6
            }else{
                mod=shows%6
                for(x=shows-1;x>=shows-mod;x--){
                    cards[x].style.display="none"
                }
                shows-=mod
            }
            
        }
        if(shows<=6){
            document.getElementById('showless').style.display='none'
        }
})




setTimeout(function(){ Array.from(document.querySelectorAll('.card')).forEach(function(item) {
    item.addEventListener('click', function() {
      fetchTrailer(item.getAttribute('value'))
    });
     });; }, 1000)

async function fetchTrailerShop(id){
    let res= await fetch("http://api.themoviedb.org/3/movie/"+id+"/videos?api_key=5c717347fca7ad27bbc4791dbc618e51", requestOptions)
    .then(response => response.json())
    .then(result => result)
    .catch(error => console.log('error', error));
    document.getElementById('shopframe').setAttribute('src',"https://www.youtube.com/embed/"+res.results[0].key)

}


Array.from(document.querySelectorAll('.shoplist')).forEach(function(item) {item.addEventListener('click', function() {
        console.log('click')
      fetchTrailerShop(item.getAttribute('value'))
    })})

function closeModal() {
    document.getElementById('modalvid').style.display = 'none';
}

// Close If Outside Click
function outsideClick(e) {
    if (e.target == modalvid || e.target==colvid1 || e.target==colvid2) {
        document.getElementById('modalvid').style.display = 'none';
    }   
}

document.getElementById('closevideo').addEventListener('click',closeModal);
window.addEventListener('click', outsideClick);


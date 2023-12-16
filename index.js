const movieblc=document.getElementById("movieblock");
let page=1;
const previous_page=document.getElementById("prev");
const pagevalue=document.getElementById("page_value");
const next_page=document.getElementById("next");
let rating_bool=true;
let date_bool=false;
let search_bool=false;
let totalpages;
let search_item;
//let currentfunction;
if(page===1)
{
    previous_page.style.display="none";
}
pagevalue.innerHTML=`${page}`;
function nextclick(e)
{
    page++;
    //currentfunction();
    pagevalue.innerHTML=`${page}`;
    if(page===totalpages)
    {
        next_page.style.display="none";
    }
    if(page!==1)
    {
        previous_page.style.display="block";
    }
    if(rating_bool)
    {
        handlepromise();
    }
    else if(date_bool)
    {
        sortbydate();
    }
    else if(search_bool)
    {
        searchmovie();
    }
}
function prevclick()
{
    page--;
    pagevalue.innerHTML=`${page}`;
    if(page===1)
    {
        previous_page.style.display="none";
    }
    if(page<totalpages)
    {
        next_page.style.display="block";
    }
    if(rating_bool)
    {
        handlepromise();
    }
    else if(date_bool)
    {
        sortbydate();
    }
    else if(search_bool)
    {
        searchmovie();
    }
}
function handleallbtn()
{
    if(rating_bool)
    {
        handlepromise();
    }
    else if(date_bool)
    {
        sortbydate();
    }
    else if(search_bool)
    {
        searchmovie();
    }
}
function card(poster,rating,vote_count,id,favv)
{
    const newdiv=document.createElement("div");
    const img=document.createElement("img");
    const avg=document.createElement("p");
    const count=document.createElement("p");
    const icon=document.createElement("i");
    const span=document.createElement("span");
    icon.setAttribute("onclick","favfunc(event)");
    icon.className=favv;
    icon.setAttribute("value",id);
    //icon.className="freeicon";
    newdiv.className="card";
    img.setAttribute("src",poster);
    img.className="movieposter";
    avg.className="rating-flex"
    avg.innerText=rating;
    count.innerText=vote_count;
    span.append(icon);
    avg.append(span);
    newdiv.append(img);
    newdiv.append(avg);
    newdiv.append(count);
    movieblc.append(newdiv);

}
const favarr=[];
function favfunc(event)
{
    
    console.log(event.target.className);
    if(event.target.className==="fa-regular fa-heart fa-xl")
    {
        event.target.className="fa-solid fa-heart fa-xl";
        favarr.push(event.target.getAttribute("value"));
    }
    else
    {
        event.target.className="fa-regular fa-heart fa-xl"
        const rem=favarr.indexOf(event.target.getAttribute("value"));
        favarr.splice(rem,1);
    }
}
function reset()
{
    pagevalue.innerHTML=`${page}`;
    previous_page.style.display="none";
    next_page.style.display="block";
}
async function handlepromise()
{
    if(!rating_bool)
    {
        page=1;
        reset();
    }
    while(movieblc.firstChild)
    {
        movieblc.removeChild(movieblc.firstChild);
    }
    const res=await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=f531333d637d0c44abc85b3e74db2186&language=en-US&page=${page}`);
    const results=await res.json();
    console.log(favarr);
    const movielist=results.results;
    totalpages=results.total_pages;
    console.log(movielist,"hey");
    movielist.forEach(element => {
        //console.log(favarr.indexOf(element.id+''));
        if(favarr.indexOf(element.id+'')>-1)
        {
            card("https://image.tmdb.org/t/p/original/"+element.poster_path,element.vote_average,element.vote_count,element.id,"fa-solid fa-heart fa-xl");
        }
        else
        card("https://image.tmdb.org/t/p/original/"+element.poster_path,element.vote_average,element.vote_count,element.id,"fa-regular fa-heart fa-xl");
        
    });
    date_bool=false;
    rating_bool=true;
    search_bool=false;
}
handlepromise();
function favoriteHandler(e)
{
    while(movieblc.firstChild)
    {
        movieblc.removeChild(movieblc.firstChild);
    }
    favarr.forEach(val=>{
        fetch(`https://api.themoviedb.org/3/movie/${val}?api_key=f531333d637d0c44abc85b3e74db2186`).then((data)=>{
            data.json().then(data1=>{
                console.log(data1);
                card("https://image.tmdb.org/t/p/original/"+data1.poster_path,data1.vote_average,data1.vote_count,data1.id,"fa-solid fa-heart fa-xl")
            })
        })
    })
}
const accesstoken="Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NDA4ZGE4YTE2NTZkNjNmZmYyZjQwZTQwZTNiMmJiNSIsInN1YiI6IjY1MDQwMDUxNmEyMjI3MDBjM2I3ZGZlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.85r15wx6lm6UFbM8UB0J12Uwv8_L6eychwHX6ue6Op0";
const headers={
    Authorization:accesstoken,
    accept: "application/json"
}
function sortbydate()
{
    if(!date_bool)
    {
        page=1;
        reset();
    }
    const url=`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`;
    
    while(movieblc.firstChild)
    {
        movieblc.removeChild(movieblc.firstChild);
    }
    fetch(url,{headers}).then(data=>{
        data.json().then(data1=>{
            
            console.log(data1);
            data1.results.forEach(val=>{
                if(favarr.indexOf(val.id+'')>-1)
                {
                    card("https://image.tmdb.org/t/p/original/"+val.poster_path,val.vote_average,val.vote_count,val.id,"fa-solid fa-heart fa-xl");
                }
                else
                    card("https://image.tmdb.org/t/p/original/"+val.poster_path,val.vote_average,val.vote_count,val.id,"fa-regular fa-heart fa-xl");
            });
            totalpages=data1.total_pages;
        })
    });
    date_bool=true;
    rating_bool=false;
    search_bool=false;
}
const debounce=debouncing(searchmovie,500);
function debouncing(func,delay)
{
    let timer;
    return function(e)
    {
        clearTimeout(timer);
            timer=setTimeout(()=>{
                func(e);
            },delay);
    }
}
function searchmovie(e)
{
    if(!search_bool)
    {
        page=1;
        reset();
    }
    if(e)
    {
    search_item=e.target.value;
    }
    let url=`https://api.themoviedb.org/3/search/movie?query=${search_item}&page=${page}`;
    while(movieblc.firstChild)
    {
        movieblc.removeChild(movieblc.firstChild);
    }
    fetch(url,{headers}).then(data=>{
        data.json().then(data1=>{
            data1.results.forEach(val=>{
                if(favarr.indexOf(val.id+'')>-1)
                {
                    card("https://image.tmdb.org/t/p/original/"+val.poster_path,val.vote_average,val.vote_count,val.id,"fa-solid fa-heart fa-xl");
                }
                else
                    card("https://image.tmdb.org/t/p/original/"+val.poster_path,val.vote_average,val.vote_count,val.id,"fa-regular fa-heart fa-xl");
            });
            totalpages=data1.total_pages;
        })
    });
    date_bool=false;
    rating_bool=false;
    search_bool=true;

}


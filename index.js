const movieblc=document.getElementById("movieblock");
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
async function handlepromise()
{
    while(movieblc.firstChild)
    {
        movieblc.removeChild(movieblc.firstChild);
    }
    const res=await fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=f531333d637d0c44abc85b3e74db2186&language=en-US&page=1");
    const results=await res.json();
    console.log(favarr);
    const movielist=results.results;
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
function sortbydate(event)
{
    const accesstoken="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NDA4ZGE4YTE2NTZkNjNmZmYyZjQwZTQwZTNiMmJiNSIsInN1YiI6IjY1MDQwMDUxNmEyMjI3MDBjM2I3ZGZlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.85r15wx6lm6UFbM8UB0J12Uwv8_L6eychwHX6ue6Op0";
    const url="https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
    const headers={
        Authorization:' Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NDA4ZGE4YTE2NTZkNjNmZmYyZjQwZTQwZTNiMmJiNSIsInN1YiI6IjY1MDQwMDUxNmEyMjI3MDBjM2I3ZGZlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.85r15wx6lm6UFbM8UB0J12Uwv8_L6eychwHX6ue6Op0',
        accept: "application/json"
    }
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
            })
        })
    })

}


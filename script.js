
const fetch = require('node-fetch');
let output = document.getElementById("output");
let a=0;
let b=5;

fetch("https://newsapi.org/v2/everything?q=technology&apiKey=d96bcc2dc1134c25ac4ba72ea1532f16 ")
  .then(response => response.json())
  .then(data => render(data))

function render(data) {
  

  let news = ``;
  let changePage = ``;

  console.log(data)
  for (i = a; i <= b; i++) {

    news += `
   <div class="border-2 p-2 m-3 border-purple-500  flex-grow text-center rounded-xl bg-gray-400  shadow-lg ">
   <a href="${data.articles[i].url}" target="_blank"><h3 class="text-left text-black hover:underline p-3 pl-2  font-sans    text-xl" >${data.articles[i].title}</h3></a>
   <div class="flex flex-row  border-t-2 p-3 border-purple-500  ">
   <img src="${data.articles[i].urlToImage}" class="border-2 border-black rounded-xl " alt="" width="300" height="300">
   <p class="p-2  break-all text-black hover:text-gray-900 align-baseline  overflow-ellipsis  "> ${data.articles[i].description} </p>
   </div>
   </div>
  
   `

    output.innerHTML = news
  }
  
}

async function nextPage() {
  // output.scrollTop=0;

  a+=6;
  b+=6;
  let response = await fetch('https://newsapi.org/v2/everything?q=technology&apiKey=d96bcc2dc1134c25ac4ba72ea1532f16')
  let data = await response.json();
  let news = ``;
  let changePage = ``;
 
  for (i = a; i <= b; i++) {

    news += `
 <div class="border-2 p-2 m-3 border-purple-500  flex-grow text-center rounded-xl bg-gray-400  shadow-lg ">
 <a href="${data.articles[i].url}" target="_blank"><h3 class="text-left text-black hover:underline p-3 pl-2  font-sans    text-xl" >${data.articles[i].title}</h3></a>
 <div class="flex flex-row  border-t-2 p-3 border-purple-500  ">
 <img src="${data.articles[i].urlToImage}" class="border-2 border-black rounded-xl " alt="" width="300" height="300">
 <p class="p-2  break-all text-black hover:text-gray-900 align-baseline "> ${data.articles[i].description}</p>
 </div>
 </div>

 `
    output.innerHTML = news
  }
  

  
}

async function previousPage() {
  a=a-6;
  b=b-6;
  
  let response = await fetch('https://newsapi.org/v2/everything?q=technology&apiKey=d96bcc2dc1134c25ac4ba72ea1532f16')
  let data = await response.json();
  let news = ``;
  let changePage = ``;
 
  for (i = a; i <= b; i++) {

    news += `
 <div class="border-2 p-2 m-3 border-purple-500  flex-grow text-center rounded-xl bg-gray-400  shadow-lg ">
 <a href="${data.articles[i].url}" target="_blank"><h3 class="text-left text-black hover:underline p-3 pl-2  font-sans    text-xl" >${data.articles[i].title}</h3></a>
 <div class="flex flex-row  border-t-2 p-3 border-purple-500  ">
 <img src="${data.articles[i].urlToImage}" class="border-2 border-black rounded-xl " alt="" width="300" height="300">
 <p class="p-2  break-all text-black hover:text-gray-900 align-baseline "> ${data.articles[i].description}</p>
 </div>
 </div>

 `
    output.innerHTML = news
  }
  
  
 }


window.addEventListener("load", async () => {
  let divCarrossel = document.getElementById("divCarrossel");
  const options = {
    method: "GET",
    headers: {
      "Accept": "application/json",
    }
  }
  const respostaSeriesPopulares = await fetch("https://api.themoviedb.org/3/tv/popular?language=pt-BR&page=1&api_key=70f3df703672949b986e1d39817c515c", options);
  const resultadoSeriesPopulares = await respostaSeriesPopulares.json();
  const seriesPopulares = resultadoSeriesPopulares.results;

  let conteudo = "";

  for(let i = 0; i < seriesPopulares.length && i < 3; i++){
    conteudo += `
      <div class="carousel-item `;
    if(i == 0) conteudo += `active `;
       
    conteudo +=`img-fluid">`
    if(i == 0) conteudo += `<a href="serie.html">`;
    conteudo +=
          `<img
            src="https://image.tmdb.org/t/p/original/${seriesPopulares[i].backdrop_path}"
            class="d-block w-100"
            alt="..."
          />
          <div class="carousel-caption d-none d-md-block">
            <h1 class="font-weight-bold contorno">${seriesPopulares[i].name}</h1>
            <h4 class="font-weight-bold contorno">
              ${seriesPopulares[i].overview}
            </h4>
          </div>`
        if(i == 0) conteudo += `</a>`;
      conteudo += `</div>`;
  }
  divCarrossel.innerHTML = conteudo;
  
  
  
  
  conteudo = "";

  let divNovasSeries = document.getElementById("divNovasSeries");
  const respostaNovasSeries = await fetch("https://api.themoviedb.org/3/tv/on_the_air?language=pt-BR&page=1&api_key=70f3df703672949b986e1d39817c515c", options);
  const resultadoNovasSeries = await respostaNovasSeries.json();
  const novasSeries = resultadoNovasSeries.results;
  for(let i = 0; i < novasSeries.length; i++){
    conteudo += `
    <div class="card m-2">
    <a href="`;
    if(i == 0) conteudo += `serie.html`;
    conteudo += 
        `">
        <img
          src="https://image.tmdb.org/t/p/original/${novasSeries[i].poster_path}"
          class="card-img-top"
          alt="..."
        />
        <div class="card-body">
          <h4 class="card-text">${novasSeries[i].name}</h4>
        </div>
        </a>
      </div>`
  }
  divNovasSeries.innerHTML = conteudo;
  
  ;
})
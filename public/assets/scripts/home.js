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
    if(i == 0) conteudo += `<a href="detalhes.html">`;
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
    if(i == 0) conteudo += `detalhes.html`;
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
  
  conteudo = "";
  let divInfoUser = document.getElementById("infoUsuario");
  const informacaoUsuario = await fetch("http://localhost:3000/usuario/1", options);
  const usuario = await informacaoUsuario.json();
  conteudo += `
    <div class="row justify-content-evenly">
      <div class="ml-lg-5 col-8">
        <h2>Sobre</h2>
        <h5 class="text-justify">
          ${usuario.biografia}
        </h5>
      </div>
      <div class="col-3">
        <h2 class="mb-4">Autoria</h2>
        <div class="row">
          <img id="foto" class="ml-2" src="./assets/img/Foto.jpg" />
          <div id="autordesc" class="ml-4">
            <p>Nome: ${usuario.nome}</p>
            <p>Curso: ${usuario.curso}</p>
            <p>Email: ${usuario.email} </p>
          </div>
        </div>
        <h2 class="mt-4">
          Redes sociais:
          <a target="_blank" href="${usuario.facebook}"
            ><img class="icone m-1" src="./assets/img/fbicon.png"
          /></a>
          <a target="_blank" href="${usuario.twitter}"
            ><img class="icone m-1" src="./assets/img/tticon.png"
          /></a>
          <a target="_blank" href="${usuario.instagram}"
            ><img class="icone m-1" src="./assets/img/igicon.png"
          /></a>
        </h2>
      </div>
    </div>`;
    divInfoUser.innerHTML = conteudo;
    
    conteudo = "";
    let divFavoritas = document.getElementById("seriesFavoritas");
    const seriesFavoritas = await fetch(`http://localhost:3000/seriesFavoritas?idUsuario=${usuario.id}`)
    const seriesJson = await seriesFavoritas.json();

    for(let i = 0; i < seriesJson.length; i++){
      const respostaSerie = await fetch(`https://api.themoviedb.org/3/tv/${seriesJson[i].idTMDB}?language=pt-BR&api_key=70f3df703672949b986e1d39817c515c`)
      const serie = await respostaSerie.json();
      conteudo += `
        <div class="card m-2">
          <a href="">
            <img
              src="https://image.tmdb.org/t/p/original/${serie.poster_path}"
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <h4 class="card-text">${serie.name}</h4>
            </div>
          </a>
        </div>`
    }

    divFavoritas.innerHTML += conteudo;
});
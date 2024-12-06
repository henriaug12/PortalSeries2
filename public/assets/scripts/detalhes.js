window.addEventListener("load", async () => {
    const options = {
        method: "GET",
        headers: {
          "Accept": "application/json",
        }
    }
    let conteudo = "";
    let divResumo = document.getElementById("divResumo");
    let divElenco = document.getElementById("divElenco");
    let divEpisodios = document.getElementById("divEpisodios");
    let ulTemporadas = document.getElementById("ulTemporadas");

    const respostaSeries = await fetch("http://localhost:3000/seriesFavoritas/?idTMDB=30984",options);
    const seriesJson = await respostaSeries.json();

    const respostaBleach = await fetch(`https://api.themoviedb.org/3/tv/30984?language=pt-BR&api_key=70f3df703672949b986e1d39817c515c&append_to_response=season/1,season/2`)
    const detalhesBleach = await respostaBleach.json();
    
    conteudo += `
    <h1>${detalhesBleach.name}</h1>
      <div class="row fundo">
        <img id="cover" src="https://image.tmdb.org/t/p/original/o0NsbcIvsllg6CJX0FBFY8wWbsn.jpg" />
        <div class="centered">
          <h2>
            ${detalhesBleach.overview}
          </h2>
        </div>
        <div class="bottom-right">
          <a target="_blank" href="https://www.disneyplus.com/pt-br/series/bleach/6g48QKlgQdWK"
          >
            <img class="icone2 m-1" src="./assets/img/disney.png" />
          </a>
        </div>
      </div>
      <div class="row mt-3">
        <div class="ml-auto mr-5">
            <input type="checkbox" class="escondido" id="adicionarLista" `;
    if(seriesJson.length > 0){
        conteudo += `checked`;
    }  
    conteudo += `
        />
            <label class="btnAdicionar" for="adicionarLista">`;
    if(seriesJson.length > 0){
        conteudo +=`Adicionado`;
    }
    else conteudo += `Adicionar às Minhas Séries`;
    conteudo +=`</label>
        </div>
      </div>
      `;
    divResumo.innerHTML = conteudo;
    conteudo = "";
    const respostaElenco = await fetch("https://api.themoviedb.org/3/tv/30984/credits?language=pt-BR&api_key=70f3df703672949b986e1d39817c515c")
    const elencoJson = await respostaElenco.json();
    const elenco = elencoJson.cast;
    for(let i = 0; i < elenco.length; i++) {
        conteudo += `
            <div class="card m-2 ml-3">
                <a href="" target="_blank">
                    <img
                    src="https://image.tmdb.org/t/p/original/${elenco[i].profile_path}"
                    class="card-img-top"
                    alt="..."
                    />
                    <div class="card-body">
                    <h4 class="card-text">${elenco[i].name}: ${elenco[i].character}</h4>
                    </div>
                </a>
            </div>
        `
    }
    divElenco.innerHTML = conteudo;

    conteudo = "";
    for(let i = 0; i < detalhesBleach["season/1"].episodes.length; i++){
        conteudo += `<div class="card m-2">
          <a href="">
            <img src="https://image.tmdb.org/t/p/original/${detalhesBleach["season/1"].episodes[i].still_path}.jpg" class="card-img-top" alt="..." />
            <div class="card-body">
              <h4 class="card-text">EP ${detalhesBleach["season/1"].episodes[i].episode_number}: ${detalhesBleach["season/1"].episodes[i].name}</h4>
              <p>${detalhesBleach["season/1"].episodes[i].runtime}min</p>
              <h5>${detalhesBleach["season/1"].episodes[i].overview}</h5>
            </div>
          </a>
        </div>`
    }
    divEpisodios.innerHTML += conteudo;

    conteudo = "";
    for(let i = 1; i <= detalhesBleach.number_of_seasons; i++){
        conteudo += `<li><a id="${i}" class="btnsTemporadas dropdown-item">Temporada ${i}</a></li>`
    }
    ulTemporadas.innerHTML = conteudo;

    let btnsTemporadas = document.querySelectorAll(".btnsTemporadas");
    btnsTemporadas.forEach(btn => {
        btn.addEventListener("click", () => {
            trocarTemporada(btn, detalhesBleach);
        })
    });

    let btnAdicionar = document.getElementById("adicionarLista");
    btnAdicionar.addEventListener("click", ()=> {
        adicionarSerie(seriesJson);
    })

});

function trocarTemporada(btn, detalhesBleach){
    let divEpisodios = document.getElementById("divEpisodios");
    let nomeTemporada = document.getElementById("btnNomeTemporada");

    nomeTemporada.innerHTML = `Temporada ${btn.id}`;

    if(btn.id == 1){
        conteudo = "";
        for(let i = 0; i < detalhesBleach["season/1"].episodes.length; i++){
            conteudo += `
                <div class="card m-2">
                    <a href="">
                        <img src="https://image.tmdb.org/t/p/original/${detalhesBleach["season/1"].episodes[i].still_path}.jpg" class="card-img-top" alt="..." />
                        <div class="card-body">
                        <h4 class="card-text">EP ${detalhesBleach["season/1"].episodes[i].episode_number}: ${detalhesBleach["season/1"].episodes[i].name}</h4>
                        <p>${detalhesBleach["season/1"].episodes[i].runtime}min</p>
                        <h5>${detalhesBleach["season/1"].episodes[i].overview}</h5>
                        </div>
                    </a>
                </div>`
        }
        divEpisodios.innerHTML = conteudo;
    }
    else if(btn.id == 2) {
        conteudo = "";
        for(let i = 0; i < detalhesBleach["season/2"].episodes.length; i++){
            if(detalhesBleach["season/2"].episodes[i].runtime !=null) {
                conteudo += `
                    <div class="card m-2">
                        <a href="">
                            <img src="https://image.tmdb.org/t/p/original/${detalhesBleach["season/2"].episodes[i].still_path}.jpg" class="card-img-top" alt="..." />
                            <div class="card-body">
                            <h4 class="card-text">EP ${detalhesBleach["season/2"].episodes[i].episode_number}: ${detalhesBleach["season/2"].episodes[i].name}</h4>
                            <p>${detalhesBleach["season/2"].episodes[i].runtime}min</p>
                            <h5>${detalhesBleach["season/2"].episodes[i].overview}</h5>
                            </div>
                        </a>
                    </div>`
            }
        }
        divEpisodios.innerHTML = conteudo;
    }
}

async function adicionarSerie(seriesJson) {
    if(seriesJson.length == 0){
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idTMDB: 30984,
                idUsuario: 1
            })
        }
        try{
            const response = await fetch("http://localhost:3000/seriesFavoritas/", options);
            alert("Série favoritada com sucesso");
            location.reload();
        }
        catch(err){
            console.log(err);
            alert("Houve um erro");
        }
    }
    else {
        const options = {
            method: "DELETE",
            headers: {
              "Accept": "application/json",
            }
        }
        try{
            const response = await fetch(`http://localhost:3000/seriesFavoritas/${seriesJson[0].id}`, options);
            alert("Série desfavoritada com sucesso");
            location.reload();
        }
        catch(err){
            console.log(err);
            alert("Houve um erro");
        }
    }
}
window.addEventListener("load", async () => {
    let divSeries = document.getElementById("divSeries");
    let btnPesquisar = document.getElementById("btnPesquisar");
    let inputPesquisa = document.getElementById("inputPesquisa");
    btnPesquisar.addEventListener("click", (event)=>{
      event.preventDefault();
      pesquisarSeries();
    })
    inputPesquisa.addEventListener("keypress", (event)=>{
      if(event.key === "Enter") {
        pesquisarSeries();
      }
    })
    pesquisarSeries();
});

async function pesquisarSeries(){
    let inputPesquisa = document.getElementById("inputPesquisa");
    let url;
    if(inputPesquisa.value == ""){
      url = "https://api.themoviedb.org/3/tv/popular?language=pt-BR&page=1&api_key=70f3df703672949b986e1d39817c515c";
    }
    else url = `https://api.themoviedb.org/3/search/tv?query=${inputPesquisa.value}&include_adult=false&language=pt-BR&page=1&api_key=70f3df703672949b986e1d39817c515c`;
    let conteudo = "";
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MGYzZGY3MDM2NzI5NDliOTg2ZTFkMzk4MTdjNTE1YyIsIm5iZiI6MTczMzQyMTMyNy4zMzEsInN1YiI6IjY3NTFlOTBmYWI2Y2MzYTRjOGZjNjhhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nl-r96vBKiZukybDDHdKXK2lRMH4bvsvlvyYE4ZGX0o'
      }
    };
    const respostaSeriesPopulares = await fetch(url, options);
    const resultadoSeriesPopulares = await respostaSeriesPopulares.json();
    const series = resultadoSeriesPopulares.results;
    let divSeries = document.getElementById("divSeries");
    for(let i = 0; i < series.length; i++) {
      conteudo += `
          <div class="card m-2">
              <a href="serie.html"><img
                  src="https://image.tmdb.org/t/p/original/${series[i].poster_path}"
                  class="card-img-top"
                  alt="..."
                />
                <div class="card-body">
                  <h4 class="card-text">${series[i].name}</h4>
                </div>
              </a>
          </div>`;
  }
    divSeries.innerHTML = conteudo;
}
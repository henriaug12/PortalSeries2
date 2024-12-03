window.addEventListener("load", () => {
    let divNovasSeries = document.getElementById("divNovasSeries");
    divNovasSeries.innerHTML += `
    <div class="card m-2">
        <a href="serie.html">
          <img
          src="../assets/img/ricknmorty.jpg"
          class="card-img-top"
          alt="..."
          />
          <div class="card-body">
            <h4 class="card-text">Rick & Morty: Temporada 7</h4>
          </div>
        </a>
    </div>`
    
    ;
})
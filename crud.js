let id = 0;
let lista_filmes = [];

document.querySelector("#salvar").addEventListener("click", cadastrar);

window.addEventListener("load", () => {
    lista_filmes = JSON.parse(localStorage.getItem("lista_filmes")) || [];
    lista_filmes.forEach((filme) => {
        document.querySelector("#filmes").innerHTML += gerarCard(filme);
    });
});

function cadastrar() {
    const modal = new bootstrap.Modal(document.querySelector("#exampleModal"));
    // const modal = bootstrap.Modal.getInstance(document.querySelector("#exampleModal"));
    console.log("Cadastrar");
    let titulo = document.querySelector("#titulo").value;
    let genero = Array.from(document.querySelectorAll("#genero input[type='checkbox']:checked")).map(checkbox => checkbox.value);
    let nota = document.querySelector("#nota").value;
    let sinopse = document.querySelector("#sinopse").value;
    let elenco = document.querySelector("#elenco").value;
    let visto = false
    console.log(titulo, genero, nota, sinopse, elenco);

    const filme = {
        id: Date.now(),
        titulo,
        genero,
        nota,
        sinopse,
        elenco,
        visto
    };
    if (filme.titulo.length === 0) {
        document.querySelector("#titulo").classList.add("is-invalid");
        return;
    }
    lista_filmes.push(filme);

    document.querySelector("#filmes").innerHTML += gerarCard(filme);

    document.querySelector("#titulo").value = "";

    salvar()

    modal.hide();
}

function salvar(){
    localStorage.setItem("lista_filmes", JSON.stringify(lista_filmes));
}


function apagar(botao, id) {
    botao.parentNode.parentNode.remove();
    deleteCard(id);
}

function concluir(id){
    let filme_encontrado = lista_filmes.find((filme) => {
        console.log(id)

        return filme.id == id
    })
    filme_encontrado.visto = true
    console.log(filme_encontrado.visto)
    salvar()
}


document.querySelector("#busca").addEventListener("keyup", () =>{
    lista_filmes = JSON.parse(localStorage.getItem("lista_filmes")) || []
    const titulo = document.querySelector("#busca").value
    lista_filmes = lista_filmes.filter(filme => filme.titulo.includes(titulo))
    } );
    

document.querySelector("#concluidas").addEventListener("click", () =>{
lista_filmes = JSON.parse(localStorage.getItem("lista_filmes")) || []
lista_filmes = lista_filmes.filter(filme => filme.visto)
} );



function gerarCard(filme) {
    const status = (filme.visto) ? "visto" : ""
    return `<div class="col-12 col-md-6 col-lg-3" id="${filme.id}">
                <div class="card">
                    <div class="card-header">
                        ${filme.titulo}
                    </div>
                    <div class="card-body">
                        <p class="card-text">${filme.sinopse}</p>
                        <p>
                            ${filme.genero.map(genre => `<span class="badge bg-warning">${genre}</span>`).join(' ')}
                        </p>
                        <a href="#" onClick="concluir( ${filme.id})" class="btn btn-success" ${status})>
                            <i class="bi bi-check-lg"></i>
                        </a>
                        <a href="#" onClick="apagar(this, ${filme.id})" class="btn btn-danger" >
                            <i class="bi bi-trash"></i>
                        </a>
                    </div>
                </div>
            </div>`;
}

function deleteCard(id) {
    lista_filmes = lista_filmes.filter(filme => filme.id !== id);
    salvar();
}

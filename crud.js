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
    console.log("Cadastrar");
    let titulo = document.querySelector("#titulo").value;
    let genero = Array.from(document.querySelectorAll("#genero input[type='checkbox']:checked")).map(checkbox => checkbox.value);
    let nota = document.querySelector("#nota").value;
    let sinopse = document.querySelector("#sinopse").value;
    let elenco = document.querySelector("#elenco").value;
    console.log(titulo, genero, nota, sinopse, elenco);

    const filme = {
        id: Date.now(),
        titulo,
        genero,
        nota,
        sinopse,
        elenco
    };
    if (filme.titulo.length === 0) {
        document.querySelector("#titulo").classList.add("is-invalid");
        return;
    }
    lista_filmes.push(filme);

    document.querySelector("#filmes").innerHTML += gerarCard(filme);

    document.querySelector("#titulo").value = "";

    localStorage.setItem("lista_filmes", JSON.stringify(lista_filmes));

    modal.hide();
}

function apagar(botao, id) {
    botao.parentNode.parentNode.remove();
    deleteCard(id);
}

function gerarCard(filme) {
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
                        <a href="#" class="btn btn-success">
                            <i class="bi bi-check-lg"></i>
                        </a>
                        <a href="#" class="btn btn-danger" onClick="apagar(this, ${filme.id})">
                            <i class="bi bi-trash"></i>
                        </a>
                    </div>
                </div>
            </div>`;
}

function deleteCard(id) {
    lista_filmes = lista_filmes.filter(filme => filme.id !== id);
    localStorage.setItem("lista_filmes", JSON.stringify(lista_filmes));
}

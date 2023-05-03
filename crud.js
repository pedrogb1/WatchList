document.querySelector("#salvar").addEventListener("click", cadastrar)

function cadastrar(){
    console.log("Cadastrar")
    let titulo  = document.querySelector("#titulo").value
    let genero  = document.querySelector("#genero").value
    let nota  = document.querySelector("#nota").value
    let sinopse  = document.querySelector("#sinopse").value
    let elenco  = document.querySelector("#elenco").value
    console.log(titulo, genero, nota, sinopse, elenco)

    const filme = {
        titulo,
        genero,
        nota,
        sinopse,
        elenco,
        
    }

    document.querySelector("#filmes").innerHTML += gerarCard(filme)
}



function gerarCard(filme){
    return `<div class="col-12 col-md-6 col-lg-3">
                <div class="card">
                    <div class="card-header">
                        ${filme.titulo}
                    </div>
                    <div class="card-body">
                        <p class="card-text">${filme.sinopse}</p>
                        <p>
                            <span class="badge text-bg-warning">${filme.genero}</span>
                            <span class="badge text-bg-warning">Romance</span>
                            <span class="badge text-bg-warning">Drama</span>
                        </p>
                        <a href="#" class="btn btn-success">
                            <i class="bi bi-check-lg"></i>
                        </a>
                        <a href="#" class="btn btn-danger">
                            <i class="bi bi-trash"></i>
                        </a>
                    </div>
                </div> <!-- card -->
            </div> <!-- col -->`
}
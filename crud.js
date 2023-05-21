let lista_filmes = [];

document.querySelector("#salvar").addEventListener("click", cadastrar);

window.addEventListener("load", () => {
    lista_filmes = JSON.parse(localStorage.getItem("lista_filmes")) || [];
    lista_filmes.forEach((filme) => {
        document.querySelector("#filmes").innerHTML += gerarCard(filme);
    });

    const generos = document.querySelectorAll(".genero");
    generos.forEach((genero) => {
        genero.addEventListener("click", () => {
            const termoGenero = genero.dataset.genero;
            const filmesFiltrados = lista_filmes.filter(filme => filme.genero.includes(termoGenero));

            const filtroAplicado = document.querySelector("#filtro-aplicado");
            filtroAplicado.textContent = `Filtrando por: ${termoGenero}`;

            const filmesContainer = document.querySelector("#filmes");
            filmesContainer.innerHTML = "";

            filmesFiltrados.forEach(filme => {
                filmesContainer.innerHTML += gerarCard(filme);
            });
        });
    });
});

function cadastrar() {
    const modal = new bootstrap.Modal(document.querySelector("#exampleModal"));

    let titulo = document.querySelector("#titulo").value;
    let genero = [...document.querySelectorAll("#genero input[type='checkbox']:checked")].map(checkbox => checkbox.value);
    let nota = document.querySelector("#nota").value;
    let sinopse = document.querySelector("#sinopse").value;
    let elenco = document.querySelector("#elenco").value;
    let visto = false;

    const filme = {
        id: Date.now(),
        titulo,
        genero,
        nota,
        sinopse,
        elenco,
        visto
    };

    const editarId = document.querySelector("#salvar").dataset.id;
    if (editarId) {
        // Edição do filme existente
        const filmeExistente = lista_filmes.find(filme => filme.id == editarId);
        if (filmeExistente) {
            filme.id = editarId; // Mantém o mesmo ID do filme
            const index = lista_filmes.indexOf(filmeExistente);
            lista_filmes[index] = filme;
        }
    } else {
        // Novo filme
        lista_filmes.push(filme);
    }

    // Limpar campos do formulário
    document.querySelector("#titulo").value = "";
    document.querySelectorAll("#genero input[type='checkbox']:checked").forEach(checkbox => {
        checkbox.checked = false;
    });
    document.querySelector("#nota").value = "5";
    document.querySelector("#sinopse").value = "";
    document.querySelector("#elenco").value = "";

    salvar();
    modal.hide();

    exibirFilmes();
}

function exibirFilmes() {
    const filmesContainer = document.querySelector("#filmes");
    filmesContainer.innerHTML = "";

    lista_filmes.forEach(filme => {
        filmesContainer.innerHTML += gerarCard(filme);
    });
}

function salvar() {
    localStorage.setItem("lista_filmes", JSON.stringify(lista_filmes));
}

function apagar(botao, id) {
    botao.parentNode.parentNode.remove();
    deleteCard(id);
}


function concluir(id) {
    let filme_encontrado = lista_filmes.find((filme) => {
        console.log(id)
        return filme.id == id
    })
    filme_encontrado.visto = true
    console.log(filme_encontrado.visto)
    salvar()
}

document.querySelector("#busca").addEventListener("keyup", () => {
    const termoBusca = document.querySelector("#busca").value.trim();
    const regex = new RegExp(termoBusca, "i"); // Expressão regular case-insensitive

    lista_filmes = JSON.parse(localStorage.getItem("lista_filmes")) || [];
    const filmesFiltrados = lista_filmes.filter(filme => regex.test(filme.titulo));

    // Limpar a exibição HTML anterior
    const filmesContainer = document.querySelector("#filmes");
    filmesContainer.innerHTML = "";

    // Gerar e adicionar cards para os filmes filtrados
    filmesFiltrados.forEach(filme => {
        filmesContainer.innerHTML += gerarCard(filme);
    });
});


document.querySelector("#concluidas").addEventListener("click", () => {
    lista_filmes = JSON.parse(localStorage.getItem("lista_filmes")) || [];
    const filmesVistos = lista_filmes.filter(filme => filme.visto);

    const filmesContainer = document.querySelector("#filmes");
    filmesContainer.innerHTML = "";

    filmesVistos.forEach(filme => {
        filmesContainer.innerHTML += gerarCard(filme);
    });
});

document.querySelector("#home").addEventListener("click", () => {
    lista_filmes = JSON.parse(localStorage.getItem("lista_filmes")) || [];

    const filmesContainer = document.querySelector("#filmes");
    filmesContainer.innerHTML = "";

    lista_filmes.forEach(filme => {
        filmesContainer.innerHTML += gerarCard(filme);
    });

    const filtroAplicado = document.querySelector("#filtro-aplicado");
    filtroAplicado.textContent = "Nenhum filtro aplicado";
});

document.querySelector("#nao-vistos").addEventListener("click", () => {
    lista_filmes = JSON.parse(localStorage.getItem("lista_filmes")) || [];
    const filmesNaoVistos = lista_filmes.filter(filme => !filme.visto);

    const filmesContainer = document.querySelector("#filmes");
    filmesContainer.innerHTML = "";

    filmesNaoVistos.forEach(filme => {
        filmesContainer.innerHTML += gerarCard(filme);
    });

    const filtroAplicado = document.querySelector("#filtro-aplicado");
    filtroAplicado.textContent = "Filtrando por: Não Vistos";
});




function gerarCard(filme) {
    const status = filme.visto ? "visto" : "";
    return `
        <div class="col-12 col-md-6 col-lg-3" id="${filme.id}">
            <div class="card">
                <div class="card-header">
                    ${filme.titulo}
                </div>
                <div class="card-body">
                    <p class="card-text">${filme.sinopse}</p>
                    <p>
                        ${filme.genero
            .map(genre => `<span class="badge bg-warning genero genero-clicavel" data-genero="${genre}">${genre}</span>`)
            .join(' ')}
                    </p>
                    <a href="#" onClick="concluir(${filme.id})" class="btn btn-success ${status}">
                        <i class="bi bi-check-lg"></i>
                    </a>
                    <a href="#" onClick="apagar(this, ${filme.id})" class="btn btn-danger">
                        <i class="bi bi-trash"></i>
                    </a>
                    <button class="btn btn-primary btn-editar" onclick="editarCard(${filme.id})">
                        Editar
                    </button>
                </div>
            </div>
        </div>`;
}

function deleteCard(id) {
    lista_filmes = lista_filmes.filter(filme => filme.id !== id);
    salvar();
}

function editarCard(id) {
    const filmeEncontrado = lista_filmes.find(filme => filme.id === id);

    // Verificar se o filme foi encontrado
    if (filmeEncontrado) {
        // Preencher os campos do formulário com os dados do filme
        document.querySelector("#titulo").value = filmeEncontrado.titulo;
        document.querySelectorAll("#genero input[type='checkbox']").forEach(checkbox => {
            checkbox.checked = filmeEncontrado.genero.includes(checkbox.value);
        });
        document.querySelector("#nota").value = filmeEncontrado.nota;
        document.querySelector("#sinopse").value = filmeEncontrado.sinopse;
        document.querySelector("#elenco").value = filmeEncontrado.elenco;

        // Atualizar o ID do filme no botão "Salvar" para identificar a edição
        document.querySelector("#salvar").dataset.id = id;

        // Abrir o modal de edição
        const modal = new bootstrap.Modal(document.querySelector("#exampleModal"));
        modal.show();
    }
}
// =========================
// DADOS DO DICIONÁRIO (MVP)
// =========================

import { dicionario } from "./dados.js";


// =========================
// ELEMENTOS DO DOM
// =========================

const campoBusca = document.getElementById("campo-busca");
const botaoBuscar = document.getElementById("btn-buscar");
const areaResultado = document.getElementById("resultado");
const listaPalavras = document.getElementById("lista");

// =========================
// FUNÇÕES
// =========================

// Normaliza texto (remove acentos e deixa minúsculo)
function normalizarTexto(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[^a-z]/g, "");
}

// Exibe resultado da busca
function mostrarResultado(item) {
  areaResultado.innerHTML = `
    <h2>${item.palavra}</h2>
    ${
      item.midia
        ? `<img src="${item.midia}" alt="Sinal em Libras para ${item.palavra}">`
        : `<p><em>Imagem do sinal em desenvolvimento</em></p>`
    }
    <p>${item.descricao}</p>
  `;
}


// Mensagem quando não encontrar
function mostrarNaoEncontrado() {
  areaResultado.innerHTML = `
    <p>❌ Palavra não encontrada no dicionário.</p>
    <p>Tente outra palavra.</p>
  `;
}

// Função de busca
function buscarPalavra() {
  const termo = normalizarTexto(campoBusca.value);

  if (!termo) {
    areaResultado.innerHTML = "<p>Digite uma palavra para buscar.</p>";
    return;
  }

  const resultado = dicionario.find(item =>
    normalizarTexto(item.palavra) === termo
  );

  if (resultado) {
    mostrarResultado(resultado);
  } else {
    mostrarNaoEncontrado();
  }
}

// =========================
// LISTA DE PALAVRAS
// =========================

function carregarLista() {
  dicionario.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.palavra;

    li.addEventListener("click", () => {
      mostrarResultado(item);
    });

    listaPalavras.appendChild(li);
  });
}

// =========================
// EVENTOS
// =========================

botaoBuscar.addEventListener("click", buscarPalavra);

campoBusca.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    buscarPalavra();
  }
});

// =========================
// INICIALIZAÇÃO
// =========================

carregarLista();

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
// FUNÇÕES UTILITÁRIAS
// =========================

// Normaliza texto (remove acentos, espaços extras e deixa minúsculo)
function normalizarTexto(texto) {
  return texto
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[^a-z]/g, "");
}

// =========================
// FUNÇÕES DE EXIBIÇÃO
// =========================

// Exibe o resultado encontrado
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

// Exibe mensagem quando não encontrar
function mostrarNaoEncontrado() {
  areaResultado.innerHTML = `
    <p>❌ Palavra não encontrada no dicionário.</p>
    <p>Tente outra palavra.</p>
  `;
}

// Exibe mensagem inicial
function mostrarMensagemInicial() {
  areaResultado.innerHTML = `
    <p>🔎 Digite uma palavra ou selecione uma da lista abaixo.</p>
  `;
}

// =========================
// FUNÇÃO DE BUSCA
// =========================
function buscarPalavra() {
  const termoDigitado = campoBusca.value;

  if (!termoDigitado.trim()) {
    mostrarMensagemInicial();
    return;
  }

  const termoNormalizado = normalizarTexto(termoDigitado);

  const resultado = dicionario.find(item =>
    normalizarTexto(item.palavra) === termoNormalizado
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
  listaPalavras.innerHTML = "";

  dicionario.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.palavra;

    li.addEventListener("click", () => {
      campoBusca.value = item.palavra;
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
mostrarMensagemInicial();

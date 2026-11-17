// WHATSAPP DA CAFETERIA
// Coloque DDI + DDD + número, somente números.
const WHATSAPP_DA_LOJA = "COLOQUE_O_NUMERO_AQUI";

const SENHA_ADMIN = "cafeDAmilla883982";
const CHAVE_PRODUTOS = "cafeDaMillaProdutos_v1";

// PRODUTOS DO CARDÁPIO

const produtosIniciais = [
  {id:1,categoria:"Salgados fitness",nome:"Coxinha fit de macaxeira com frango",preco:8},
  {id:2,categoria:"Salgados fitness",nome:"Coxinha fit de macaxeira com carne de sol",preco:9},
  {id:3,categoria:"Salgados fitness",nome:"Pastel de grão-de-bico com frango cremoso",preco:8},
  {id:4,categoria:"Salgados fitness",nome:"Pastel de grão-de-bico recheado com carne de sol",preco:9},
  {id:5,categoria:"Salgados fitness",nome:"Empada fit de frango",preco:8},
  {id:6,categoria:"Salgados fitness",nome:"Empada fit de carne de sol",preco:9},
  {id:7,categoria:"Salgados fitness",nome:"Empada fit de palmito e queijo",preco:9},
  {id:8,categoria:"Salgados fitness",nome:"Sanduíche natural",preco:15},
  {id:9,categoria:"Salgados fitness",nome:"Pão artesanal (sob encomenda)",preco:null},
  {id:10,categoria:"Salgados fitness",nome:"Macaxeira • Batata-doce • Jerimum",preco:25},

  {id:11,categoria:"Bolos funcionais",nome:"Bolo pequeno",preco:25},
  {id:12,categoria:"Bolos funcionais",nome:"Bolo médio",preco:38},

  {id:13,categoria:"Sobremesas saudáveis",nome:"Brownie de pote — Doce de leite",preco:20},
  {id:14,categoria:"Sobremesas saudáveis",nome:"Brownie de pote — Ganache 70%",preco:20},
  {id:15,categoria:"Sobremesas saudáveis",nome:"Brownie de pote — Morangos e ganache",preco:22},
  {id:16,categoria:"Sobremesas saudáveis",nome:"Cocada cremosa",preco:20},
  {id:17,categoria:"Sobremesas saudáveis",nome:"Cookies funcionais — 2 unidades",preco:12},
  {id:18,categoria:"Sobremesas saudáveis",nome:"Cookie red velvet com gotas de chocolate branco",preco:15},
  {id:19,categoria:"Sobremesas saudáveis",nome:"Cookie FUDGE — 10 unidades",preco:18},
  {id:20,categoria:"Sobremesas saudáveis",nome:"Brownie na marmita",preco:15},
  {id:21,categoria:"Sobremesas saudáveis",nome:"Fatia de prestígio gelado",preco:25},
  {id:22,categoria:"Sobremesas saudáveis",nome:"Delícia de abacaxi sem açúcar",preco:20},

  {id:23,categoria:"Congelados",nome:"Mini coxinhas — 4 unidades / 200 g",preco:18},
  {id:24,categoria:"Congelados",nome:"Pão de queijo — 5 unidades",preco:15}
];

const categorias = [
  "Salgados fitness",
  "Bolos funcionais",
  "Sobremesas saudáveis",
  "Congelados"
];

let produtos = carregarProdutos();

// CARREGAR PRODUTOS

function carregarProdutos() {
  try {
    const salvo = localStorage.getItem(CHAVE_PRODUTOS);

    return salvo
      ? JSON.parse(salvo)
      : [...produtosIniciais];

  } catch {
    return [...produtosIniciais];
  }
}

// SALVAR ALTERAÇÕES

function salvarProdutos() {
  localStorage.setItem(
    CHAVE_PRODUTOS,
    JSON.stringify(produtos)
  );
}

// FORMATO DOS PREÇOS

function dinheiro(valor) {
  return valor === null || valor === ""
    ? '<span class="sem-preco">Consulte disponibilidade</span>'
    : Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
      });
}

// MOSTRAR CARDÁPIO

function renderizarCardapio() {

  const cardapio = document.getElementById("cardapio");
  const atalhos = document.getElementById("atalhosCategorias");

  cardapio.innerHTML = "";
  atalhos.innerHTML = "";

  categorias.forEach((categoria, index) => {

    const itens = produtos.filter(
      p => p.categoria === categoria
    );

    if (!itens.length) return;

    const id = "categoria-" + index;

    const link = document.createElement("a");

    link.href = "#" + id;
    link.textContent = categoria;

    atalhos.appendChild(link);

    const secao = document.createElement("section");

    secao.className = "grupo-cardapio";
    secao.id = id;

    const titulo = document.createElement("h3");

    titulo.className = "titulo-categoria";
    titulo.textContent = categoria;

    const lista = document.createElement("div");

    lista.className = "itens";

    itens.forEach(produto => {

      const linha = document.createElement("div");

      linha.className = "item";

      const nome = document.createElement("span");

      nome.className = "nome-item";
      nome.textContent = produto.nome;

      const preco = document.createElement("span");

      preco.className = "preco-item";
      preco.innerHTML = dinheiro(produto.preco);

      linha.append(nome, preco);

      lista.appendChild(linha);

    });

    secao.append(titulo, lista);

    cardapio.appendChild(secao);

  });

  if (!cardapio.children.length) {
    cardapio.innerHTML =
      "<p>Nenhum produto cadastrado no momento.</p>";
  }

}

// CABINE DE COMANDOS

document.getElementById("abrirAdmin").addEventListener("click", () => {

  document.getElementById("modalAdmin")
    .classList.remove("escondido");

});

document.getElementById("fecharAdmin").addEventListener("click", fecharAdmin);

function fecharAdmin() {

  document.getElementById("modalAdmin")
    .classList.add("escondido");

}

// LOGIN

document.getElementById("entrarAdmin").addEventListener("click", () => {

  const senha = document.getElementById("senhaAdmin").value;

  if (senha === SENHA_ADMIN) {

    document.getElementById("telaLogin")
      .classList.add("escondido");

    document.getElementById("conteudoAdmin")
      .classList.remove("escondido");

    renderizarListaAdmin();

  } else {

    document.getElementById("erroSenha").textContent =
      "Senha incorreta. Tente novamente.";

  }

});

// LISTAR PRODUTOS NA CABINE

function renderizarListaAdmin() {

  const lista = document.getElementById("listaAdmin");

  lista.innerHTML = "";

  produtos.forEach(p => {

    const linha = document.createElement("div");

    linha.className = "admin-item";

    const info = document.createElement("div");

    info.className = "admin-item-info";

    const nome = document.createElement("strong");

    nome.textContent = p.nome;

    const detalhe = document.createElement("small");

    detalhe.textContent =
      `${p.categoria} • ${
        p.preco == null
          ? "Sob consulta"
          : dinheiro(p.preco).replace(/<[^>]*>/g, "")
      }`;

    info.append(nome, detalhe);

    // EDITAR

    const editar = document.createElement("button");

    editar.className = "acao editar";
    editar.textContent = "Editar";

    editar.addEventListener("click", () => {
      prepararEdicao(p.id);
    });

    // EXCLUIR

    const excluir = document.createElement("button");

    excluir.className = "acao excluir";
    excluir.textContent = "Excluir";

    excluir.addEventListener("click", () => {

      if (confirm(`Excluir "${p.nome}" do cardápio?`)) {

        produtos = produtos.filter(x => x.id !== p.id);

        salvarProdutos();

        renderizarCardapio();
        renderizarListaAdmin();

      }

    });

    linha.append(info, editar, excluir);

    lista.appendChild(linha);

  });

}

// LIMPAR FORMULÁRIO

function limparFormularioProduto() {

  document.getElementById("formProduto").reset();

  document.getElementById("produtoId").value = "";

  document.getElementById("salvarProduto").textContent =
    "Adicionar produto";

  document.getElementById("cancelarEdicao")
    .classList.add("escondido");

}

// PREPARAR EDIÇÃO

function prepararEdicao(id) {

  const p = produtos.find(x => x.id === id);

  if (!p) return;

  document.getElementById("produtoId").value = p.id;

  document.getElementById("nomeProduto").value = p.nome;

  document.getElementById("categoriaProduto").value =
    p.categoria;

  document.getElementById("precoProduto").value =
    p.preco ?? "";

  document.getElementById("salvarProduto").textContent =
    "Salvar alterações";

  document.getElementById("cancelarEdicao")
    .classList.remove("escondido");

  document.getElementById("nomeProduto").focus();

}

// ADICIONAR OU EDITAR PRODUTOS

document.getElementById("formProduto")
  .addEventListener("submit", e => {

    e.preventDefault();

    const id = document.getElementById("produtoId").value;

    const nome = document.getElementById("nomeProduto")
      .value.trim();

    const categoria = document.getElementById("categoriaProduto")
      .value;

    const valor = document.getElementById("precoProduto").value;

    const preco = valor === "" ? null : Number(valor);

    if (!nome || (preco !== null &&
        (!Number.isFinite(preco) || preco < 0))) {
      return;
    }

    if (id) {

      produtos = produtos.map(p =>
        p.id === Number(id)
          ? { ...p, nome, categoria, preco }
          : p
      );

    } else {

      produtos.push({
        id: Date.now(),
        nome,
        categoria,
        preco
      });

    }

    salvarProdutos();

    limparFormularioProduto();

    renderizarCardapio();

    renderizarListaAdmin();

  });

// CANCELAR EDIÇÃO

document.getElementById("cancelarEdicao")
  .addEventListener("click", limparFormularioProduto);

// SAIR DA CABINE

document.getElementById("sairAdmin")
  .addEventListener("click", () => {

    document.getElementById("senhaAdmin").value = "";

    document.getElementById("telaLogin")
      .classList.remove("escondido");

    document.getElementById("conteudoAdmin")
      .classList.add("escondido");

    fecharAdmin();

  });

// ENTREGA

const formEntrega = document.getElementById("formEntrega");

document.getElementById("mostrarEntrega")
  .addEventListener("click", () => {

    formEntrega.classList.remove("escondido");

    formEntrega.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  });

document.getElementById("fecharEntrega")
  .addEventListener("click", () => {

    formEntrega.classList.add("escondido");

  });

// VERIFICAR HORÁRIO

const horario = document.getElementById("horarioEntrega");

horario.addEventListener("change", validarHorario);

function validarHorario() {

  const valor = horario.value;

  const permitido =
    valor &&
    (
      (valor >= "11:00" && valor <= "12:20") ||
      (valor >= "14:00" && valor <= "17:00")
    );

  document.getElementById("mensagemHorario").textContent =
    valor && !permitido
      ? "Entregas não disponíveis pra esse horário. Escolha um dos horários disponíveis."
      : "";

  return Boolean(permitido);

}

// ENVIAR PEDIDO

formEntrega.addEventListener("submit", e => {

  e.preventDefault();

  if (!validarHorario()) {

    document.getElementById("mensagemHorario").textContent =
      "Entregas não disponíveis pra esse horário.";

    return;

  }

  const nome = document.getElementById("nomeCliente").value.trim();

  const telefone = document.getElementById("telefoneCliente").value.trim();

  const endereco = document.getElementById("enderecoCliente").value.trim();

  const hora = horario.value;

  if (!nome || !telefone || !endereco) return;

  if (!/^\d{10,13}$/.test(WHATSAPP_DA_LOJA)) {

    alert(
      "Configure o WhatsApp da cafeteria no início do arquivo script.js."
    );

    return;

  }

  const mensagem =
    `Olá! Quero fazer um pedido para entrega no Café da Milla.\n\n` +
    `Nome: ${nome}\n` +
    `Telefone: ${telefone}\n` +
    `Endereço: ${endereco}\n` +
    `Horário desejado: ${hora}`;

  const link =
    `https://wa.me/${WHATSAPP_DA_LOJA}?text=${encodeURIComponent(mensagem)}`;

  window.open(link, "_blank");

});

// INICIAR CARDÁPIO

renderizarCardapio();
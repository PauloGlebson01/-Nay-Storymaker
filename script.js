const form = document.getElementById("formDepoimento");
const lista = document.getElementById("listaDepoimentos");

// Função para salvar todos os depoimentos no LocalStorage
function salvarDepoimentos() {
  const depoimentos = [];
  document.querySelectorAll("#listaDepoimentos .depoimento").forEach(div => {
    const nome = div.querySelector("strong").textContent.replace(":", "");
    const mensagem = div.querySelector("span").textContent;
    depoimentos.push({ nome, mensagem });
  });
  localStorage.setItem("depoimentos", JSON.stringify(depoimentos));
}

// Função para criar e exibir um depoimento
function adicionarDepoimento(nome, mensagem) {
  const novoDepoimento = document.createElement("div");
  novoDepoimento.classList.add("depoimento");
  novoDepoimento.innerHTML = `
    <div>
      <strong>${nome}:</strong> <span>${mensagem}</span>
    </div>
    <button class="excluir">Excluir</button>
  `;

  // Evento do botão excluir com animação
  novoDepoimento.querySelector(".excluir").addEventListener("click", () => {
    novoDepoimento.classList.add("excluir-anim");
    novoDepoimento.addEventListener("transitionend", () => {
      lista.removeChild(novoDepoimento);
      salvarDepoimentos();
    });
  });

  lista.appendChild(novoDepoimento);

  // Efeito de deslize + fade-in
  requestAnimationFrame(() => {
    novoDepoimento.classList.add("show");
    // Scroll automático para o último depoimento
    lista.scrollTop = lista.scrollHeight;
  });
}

// Carregar depoimentos do LocalStorage ao iniciar
document.addEventListener("DOMContentLoaded", () => {
  const depoimentosSalvos = JSON.parse(localStorage.getItem("depoimentos")) || [];
  depoimentosSalvos.forEach(item => {
    adicionarDepoimento(item.nome, item.mensagem);
  });
});

// Evento de envio do formulário
form.addEventListener("submit", function(e) {
  e.preventDefault();

  const nome = document.getElementById("nomeDepoente").value.trim();
  const mensagem = document.getElementById("mensagemDepoente").value.trim();

  if (nome && mensagem) {
    adicionarDepoimento(nome, mensagem);
    salvarDepoimentos();
    form.reset();
  } else {
    alert("Por favor, preencha pelo menos o nome e a mensagem.");
  }
});

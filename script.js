let dados = [];

fetch("dados.json")
    .then(r => r.json())
    .then(j => dados = j);

const busca = document.getElementById("busca");
const resultados = document.getElementById("resultados");

busca.addEventListener("input", () => {
    const q = busca.value.trim().toLowerCase();
    resultados.innerHTML = "";

    if (q.length === 0) return;

    const filtrado = dados.filter(item =>
        item.cidade.toLowerCase().includes(q) ||
        item.codigo.toLowerCase().includes(q)
    ).sort((a, b) => a.cidade.localeCompare(b.cidade));

    filtrado.forEach(item => {
        const linha = document.createElement("div");
        linha.className = "linha";

        linha.innerHTML = `
            <div class="cidade">${item.cidade}</div>
            <i class="bi bi-clipboard copy-btn" onclick="copiar('${item.cidade}')"></i>
            <div class="codigo">${item.codigo}</div>
            <i class="bi bi-clipboard copy-btn" onclick="copiar('${item.codigo}')"></i>
        `;

        resultados.appendChild(linha);
    });
});

function copiar(texto) {
    navigator.clipboard.writeText(texto);
}

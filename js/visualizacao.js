const backendUrl = "http://localhost:3000/enviar-mensagem";

async function enviarMensagemAlerta() {
    const mensagem = {
        numero: "5575983477825", // Número correto com o "9"
        mensagem: "⚠️ Alerta: Detecção de movimento incomum na sala!",
      };
      
  try {
    const resposta = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mensagem),
    });

    const dados = await resposta.json();
    console.log("Mensagem enviada com sucesso:", dados);
  } catch (erro) {
    console.error("Erro ao enviar mensagem:", erro);
  }
}

// Função para simular o envio de mensagem ao clicar em um botão
document.getElementById("enviarAlerta").addEventListener("click", () => {
  enviarMensagemAlerta();
});

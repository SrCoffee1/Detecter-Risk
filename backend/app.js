const express = require("express");
const wppconnect = require("@wppconnect-team/wppconnect");

const app = express();
app.use(express.json());

// Inicia a instância do WPPConnect
wppconnect
  .create()
  .then((client) => {
    console.log("WPPConnect está pronto!");

    // Endpoint para enviar mensagens
    app.post("/enviar-mensagem", async (req, res) => {
      const { numero, mensagem } = req.body;

      // Adiciona o formato internacional ao número, se necessário
      const numeroFormatado = numero.includes("@c.us") ? numero : `${numero}@c.us`;

      try {
        const resposta = await client.sendText(numeroFormatado, mensagem);
        console.log("Mensagem enviada:", resposta);
        res.status(200).json({ success: true, data: resposta });
      } catch (erro) {
        console.error("Erro ao enviar mensagem:", erro);
        res.status(500).json({ success: false, error: erro.message });
      }
    });
  })
  .catch((erro) => {
    console.error("Erro ao iniciar o WPPConnect:", erro);
  });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

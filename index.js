const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

// Rota raiz
app.get('/', (req, res) => {
    res.send(`Bem-vindo ao servidor de exemplo! </br> Use /fetch?url=<URL> para testar a vulnerabilidade SSRF.`);
});
//Fim da Rota raiz


// Rota vulnerável a SSRF
app.get('/fetch', async (req, res) => {
    const url = req.query.url;
    
    if (!url) {
        return res.status(400).send('Parâmetro URL não fornecido');
    }

    try {
        // Vulnerabilidade: nenhuma validação na URL antes de fazer a requisição
        const response = await axios.get(url);
        res.send({
            url: url,
            status: response.status,
            data: response.data
        });
    } catch (error) {
        res.status(500).send(`Erro ao acessar a URL: ${error.message}`);
    }
});

//Fim da Rota vulnerável

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
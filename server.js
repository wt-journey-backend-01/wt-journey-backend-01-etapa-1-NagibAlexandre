const express = require('express')
const path = require('path');
const fs = require('fs');
const app = express();

const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
})

app.get('/sugestao', (req, res) => {
    const { nomeUser, nomePrato, ingredientes } = req.query;

    res.send(`
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Sugestão Recebida</title>
            <link rel="stylesheet" href="/css/style.css">
        </head>
        <body>
            <div class="container">
                <h1>Olá, ${nomeUser.charAt(0).toUpperCase() + nomeUser.slice(1)}! 😀</h1>
                <p>Sua sugestão de <strong>${nomePrato}</strong> foi registrada com sucesso.</p>
                <p>Ingredientes sugeridos: ${ingredientes}</p>
                <br>
                <p>Agradecemos pela sugestão, ela será avaliada pelos nossos chef's 👩‍🍳👨‍🍳</p>
                <a href="/" class="btn-pagina">Retornar</a>
            </div>
        </body>
        </html>
    `);
})

app.get('/contato', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/contato.html'))
})

app.post('/contato', (req, res) => {
    const { nome, email, assunto, mensagem } = req.body;

    res.send(`
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Contato Recebido</title>
            <link rel="stylesheet" href="/css/style.css">
        </head>
        <body>
            <div class="container">
                <h1>🍔 Mensagem recebida com sucesso!</h1>

                <p>Olá <strong>${nome}</strong>,</p>

                <p>Recebemos sua mensagem com o assunto: <strong>${assunto}</strong> e queremos agradecer por entrar em contato com a equipe <strong>DevBurger</strong>!</p>

                <p>📩 <strong>Email:</strong> ${email}<br>
                💬 <strong>Mensagem:</strong> ${mensagem}</p>

                <p>Nosso time de atendimento irá avaliar sua mensagem com todo carinho e te responderemos o mais breve possível.</p>

 

                <br>
                <a href="/" class="btn-pagina">Voltar</a>
            </div>
        </body>
        </html>
    `);
})

app.get('/api/lanches', (req, res) => {
    fs.readFile(path.join(__dirname, 'public/data/lanches.json'), 'utf8', (_, data) => {
        res.json(JSON.parse(data));
    });
});

app.use((req, res) => {
    res.status(404).send(`
        <!DOCTYPE html>
        <html lang="pt-br">

        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>404 - Página não encontrada</title>
            <link rel="stylesheet" href="/css/style.css" />
        </head>

        <body>
            <div class="container" style="text-align:center;">
                <img src="images/404.png" alt="Erro 404" id="img404" />
                <h1>404 - Página não encontrada</h1>
                <p class="center-text">Ops! A página que você tentou acessar não existe. 😕</p>
                <a href="/" class="btn-pagina">Voltar</a>
            </div>
        </body>
        </html>
  `);
});


app.listen(PORT, () => {
    console.log(`Servidor da DevBurger rodando em http://localhost:${PORT}`);
});
const express = require('express')
const path = require('path');
const app = express();

const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
})

app.get('/sugestao', (req, res) => {
    const { nome, ingredientes } = req.query;

    res.send(`
        <h1> Olá ${nome}! </h1>
        <p> Sua sugestão foi regristrada. </p>
        <p> Você sugeriu: ${ingredientes}.</p>
        `);
})

app.get('/contato', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/contato.html'))
})

app.post('/contato', (req, res) => {
    const { nome, email, assunto, mensagem } = req.body;

    res.send(`
        nome: ${nome}
        email: ${email}
        assunto: ${assunto}
        mensagem: ${mensagem}

        <a href="/">Retornar</a>
        `);
})

app.get('/api/lanches', (req, res) => {
    res.send(
        [
            {
                "id": 1,
                "nome": "DevBurger Clássico",
                "ingredientes": "Pão brioche, Carne 150g, Queijo cheddar, Alface americana, Tomate fresco, Molho especial"
            },
            {
                "id": 2,
                "nome": "Burger de Bacon",
                "ingredientes": "Pão australiano, Carne 180g, Queijo prato, Bacon crocante, Cebola caramelizada, Molho barbecue"
            },
            {
                "id": 3,
                "nome": "Commit Veggie",
                "ingredientes": "Pão integral, Burger de grão de bico, Queijo vegano, Rúcula, Tomate seco, Maionese de ervas"
            }
        ]
    )
})

app.listen(PORT, () => {
    console.log(`Servidor da DevBurger rodando em http://localhost:${PORT}`);
});
const express = require('express');
const exphbs = require('express-handlebars');
const pool = require('./db/conn');

const port = 3000;
const app = express();

app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());

app.use(express.static('public'));

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('home');
});

app.post('/books/insertbook', (req, res) => {
    const title = req.body.title;
    const pageqty = req.body.pageqty;

    const sql = `INSERT INTO books (??, ??) VALUES (?,?)`;
    const data = ['title', 'pageqty', title, pageqty];

    pool.query(sql,data,function(err){
        if (err) {
            console.log(err);
            // Encerra o processo do Node.js com um código de saída não zero
            process.exit(1);
        }
        res.redirect('/?message=Livro%20cadastrado!');
    })
});

app.get('/books', (req, res) => {
    const sql = "SELECT * FROM books";

    pool.query(sql, function(err, data){
        if (err) {
            console.log(err);
            // Encerra o processo do Node.js com um código de saída não zero
            process.exit(1);
        }
        const books = data;
        
        console.log(books);

        res.render('books', {books})
    });

});

app.get('/books/:id', (req, res) => {
    const id = req.params.id;

    const sql = `SELECT * FROM books WHERE ?? = ?`;
    const data = ['id', id];

    pool.query(sql,data, function(err,data){
        if (err) {
            console.log(err);
            // Encerra o processo do Node.js com um código de saída não zero
            process.exit(1);
        }

        const book = data[0];

        res.render('book', {book})
    });
});

app.get('/books/edit/:id', (req, res) => {
    const id = req.params.id;

    const sql = `SELECT * FROM books WHERE ?? = ?`;
    const data = ['id', id];

    pool.query(sql,data, function(err,data){
        if (err) {
            console.log(err);
            // Encerra o processo do Node.js com um código de saída não zero
            process.exit(1);
        }

        const book = data[0];

        // Aqui passamos a variável 'message' como parte dos dados que serão enviados ao template
        res.render('editbook', {book, message: req.query.message});
    });
});

app.post('/books/updatebooks', (req, res) => {
    const id = req.body.id;
    const title = req.body.title;
    const pageqty = req.body.pageqty;

    const sql = `UPDATE books SET ?? = ?, ?? = ? WHERE ?? = ?`;
    const data = ['title', title, 'pageqty', pageqty, 'id', id];

    pool.query(sql,data,function(err){
        if (err) {
            console.log(err);
            // Encerra o processo do Node.js com um código de saída não zero
            process.exit(1);
        };

        res.redirect('/books?message=Livro%20alterado!');
    });
});

app.post('/books/remove/:id', function(req, res){
    const id = req.params.id;

    const sql = `DELETE FROM books WHERE ?? = ?`;
    const data = ['id', id];

    pool.query(sql,data,function(err){
        if (err) {
            console.log(err);
            // Encerra o processo do Node.js com um código de saída não zero
            process.exit(1);
        };
        
        res.redirect('/books?message=Livro%20deletado!');
    });

});

app.listen(port, function(err){
    if (err) {
        console.log(err);
        // Encerra o processo do Node.js com um código de saída não zero
        process.exit(1);
    }
    
    console.log(`Conectado a porta: ${port}`);
});

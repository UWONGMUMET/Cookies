import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
const port = 3000;

app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/set-cookies', (req, res) => {
    const { name = 'defaultName', value = 'defaultValue', maxAge = 5000 } = req.query;
    res.cookie(name, value, {
        maxAge: parseInt(maxAge, 10),
        httpOnly: true,
        secure: false,
        domain: 'localhost',
    });
    res.send(`Cookie '${name}' telah diset!`);
});

app.get('/get-cookies', (req, res) => {
    const cookies = req.cookies;
    if (Object.keys(cookies).length === 0) {
        return res.status(404).send('Tidak ada cookie yang ditemukan');
    }
    res.send(cookies);
});
 
app.get('/delete-cookies', (req, res) => {
    const { name } = req.query;
    if (!name) {
        return res.status(400).send('Nama cookie diperlukan untuk dihapus');
    }
    res.clearCookie(name);
    res.send(`Cookie '${name}' telah dihapus.`);
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
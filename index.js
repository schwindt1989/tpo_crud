const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: "root",
    database: 'empleados_db'
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Ruta para crear un nuevo empleado
app.post('/empleados', (req, res) => {
    const empleado = { name: req.body.name, salario: req.body.salario };
    const sql = 'INSERT INTO empleados SET ?';
    db.query(sql, empleado, (err, result) => {
        if (err) throw err;
        res.send('Empleado creado...');
    });
});

// Ruta para obtener todos los empleados
app.get('/empleados', (req, res) => {
    const sql = 'SELECT * FROM empleados';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Ruta para obtener un empleado por ID
app.get('/empleados/:id', (req, res) => {
    const sql = `SELECT * FROM empleados WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// Ruta para actualizar un empleado
app.put('/empleados/:id', (req, res) => {
    const newEmpleado = req.body;
    const sql = `UPDATE empleados SET name = '${newEmpleado.name}', salario = '${newEmpleado.salario}' WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('Empleado actualizado...');
    });
});

// Ruta para eliminar un empleado
app.delete('/empleados/:id', (req, res) => {
    const sql = `DELETE FROM empleados WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('Empleado eliminado...');
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});

const express = require('express');
const app = express();

const PORT = 8000;
const {Client, Pool} = require('pg');

app.use(express.json());

const pool = new Pool({
    host: "localhost",
    user: "isaiasnunogalindo",
    port: 5432,
    password: "",
    database: "petshop"
})


app.route('/pets').get(getAllPets).post(createPet) // gets all pets and creates a pet

app.route('/pets/:id').get(getPet).put(updatePet).delete(deletePet) // gets, updates, and delete a specific pet



app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
})




async function getAllPets(req, res) {  // gets all of the pets
    try {
        const {rows} = await pool.query('SELECT * FROM pets ORDER BY id')
        res.send(rows)
    } catch (err) {
        res.status(500)
        res.json(err)
    }
}

async function createPet(req, res) {
    try {
        let query = {
            text: 'INSERT INTO pets(age, name, kind) VALUES($1, $2, $3)',
            values: [req.body.age, req.body.name, req.body.kind]
        }
        await pool.query(query)
        res.json({
            message: `New pet of ${req.body.kind} has been added`
        })

    } catch (err) {
        res.status(500)
        res.json(err)
    }
}

async function getPet(req, res) {
    try {
        const {rows} = await pool.query(`SELECT * FROM pets WHERE id = ${req.params.id}`)          
       if (!rows[0]) {
           return res.status(404).json({ msg: "Pet not found." });
         }
       res.send(rows[0])
   } catch (err) {
       res.status(500)
       res.json(err)
   }
}

async function updatePet(req, res){
    try {        
        let query = {
            text: `UPDATE pets SET age = $1, name = $2, kind = $3 WHERE id = $4`,
            values: [req.body.age, req.body.name, req.body.kind, req.params.id]
        }
        await pool.query(query)
        const id = req.params.id;
        res.json({
            message: `pet ${id} has been updated`
        })

    } catch (err) {
        res.status(500)
        res.json(err)
    }
}

async function deletePet (req, res) {
    try {
        const id = req.params.id; 
        const {rows} = await pool.query(`SELECT * FROM pets WHERE id = ${id}`)
        if(!rows[0]){
            return res.status(404).json({ msg: "Pet not found." });
        }
        await pool.query(`DELETE FROM pets WHERE id = ${id}`)
        res.json({
            message: `pet ${id} has been deleted`
        })
    } catch (err) {
        res.status(500)
        res.json(err)
    }
}





// app.get('/pets', async (req, res) => {
//     try {
//         const {rows} = await pool.query('SELECT * FROM pets ORDER BY id')
//         res.send(rows)
//     } catch (err) {
//         res.status(500)
//         res.json(err)
//     }
// })
// app.post('/pets', async (req, res) => {  // create a pet
//     try {
//         let query = {
//             text: 'INSERT INTO pets(age, name, kind) VALUES($1, $2, $3)',
//             values: [req.body.age, req.body.name, req.body.kind]
//         }
//         const {rows} = await pool.query(query)
//         res.json({
//             message: `New pet of ${req.body.kind} has been added`
//         })

//     } catch (err) {
//         res.status(500)
//         res.json(err)
//     }
// })

//     .get (async (req, res) => {   // get a specific pet 
//     try {
//          const {rows} = await pool.query(`SELECT * FROM pets WHERE id = ${req.params.id}`)          
//         if (!rows[0]) {
//             return res.status(404).json({ msg: "Pet not found." });
//           }
//         res.send(rows[0])
//     } catch (err) {
//         res.status(500)
//         res.json(err)
//     }
// })
// .put(async (req, res) => {  // edit one: param of ID
//     try {
        
//         let query = {
//             text: `UPDATE pets SET age = $1, name = $2, kind = $3 WHERE id = $4`,
//             values: [req.body.age, req.body.name, req.body.kind, req.params.id]
//         }

//         const {rows} = await pool.query(query)
//         //await pool.query(`SELECT * FROM pets ORDER BY id ASC`)

//         const id = req.params.id;
//         res.json({
//             message: `pet ${id} has been updated`
//         })

//     } catch (err) {
//         res.status(500)
//         res.json(err)
//     }
// })
// .delete(async (req, res) => {   // delete pet
//     try {
//         const id = req.params.id; 
//         const {rows} = await pool.query(`DELETE FROM pets WHERE id = ${id}`)
        
//         res.json({
//             message: `pet ${id} has been deleted`
//         })
//     } catch (err) {
//         res.status(500)
//         res.json(err)
//     }
// })

//   pool.query(`SELECT * FROM pets`, (err, res) => {
//     if(!err){
//         console.log(res.rows)
//     } else {
//         console.log(err.message)
//     }
//     pool.end()
//   })





//   const client = new Client({
//     host: "localhost",
//     user: "isaiasnunogalindo",
//     port: 5432,
//     password: "",
//     database: "petshop"
// })  
// client.connect();

// client.query(`SELECT * FROM pets`, (err, res) => {
//     if(!err){
//         console.log(res.rows)
//     } else {
//         console.log(err.message)
//     }
//     client.end;
// })

// client.query(`INSERT INTO pets (age, name, kind) VALUES (4, 'bill', 'cow')`, (err, res) => {
//     if(!err){
//         console.log(res.rows)
//     } else {
//         console.log(err.message)
//     }
//     client.end;
// })
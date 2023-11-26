const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: "localhost",
    user: 'root',
    password: 'Naruto1', // no compartir
    database: 'cartdb',
    connectionLimit: 5
});


async function insertIntoToken(conn, id, token){
    let addedProduct = await conn.query(`SELECT product FROM ${token} WHERE product = ?`, [id])

    if(addedProduct.length == 0){
        conn.query(`INSERT INTO ${token} (product)VALUE(${id})`)
    }
}

const postCartItem = async (id, token)=>{
    let conn;
    try{
        conn = await pool.getConnection();
        const rows = await conn.query(`SHOW TABLES LIKE '${token}'`)
        if(rows.length == 0){
            const createTableQuery = `
                CREATE TABLE ${token}(
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    product INT
                )
            `
            await conn.query(createTableQuery);
            await insertIntoToken(conn, id, token)
        }else{
            await insertIntoToken(conn, id, token)
        }
        return true
    }catch(error){
        console.log(error);
        return false
    }finally{
        if(conn){
            conn.release()
        }
    }
}

const getCartItems = async (token)=>{
    let conn;
    try{
        conn = await pool.getConnection();
        rows = await conn.query(`SELECT product FROM ${token}`);
        console.log(rows);
        return rows;
    }catch(error){
        console.log(error);
        return false;
    }finally{
        if(conn){
            conn.release()
        }
    }
}

const deleteCartItem = async (id, token)=>{
    let conn;
    try{
        conn = await pool.getConnection();
        rows = await conn.query(`DELETE FROM ${token} WHERE product = ${id}`);
        return true
    }catch{
        return false
    }finally{
        if(conn){
            conn.release();
        }
    }
}

module.exports = {
    postCartItem,
    getCartItems,
    deleteCartItem
}
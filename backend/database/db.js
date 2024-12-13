
import  mysql from 'mysql';

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'ars',
};

const db = mysql.createPool(dbConfig);

export const executeQuery  = (query, params) => { 
    return new Promise((resolve, reject) => { 
        db.query(query, params, (e, results) => {
            if (e) {
                console.log("Query error:", e);
                return reject(e);
            }
            resolve(results);
        });
    });
};


export default executeQuery;

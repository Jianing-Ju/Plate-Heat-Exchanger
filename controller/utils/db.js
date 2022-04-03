import { createPool } from "mysql";
const pool = createPool({
    host: "us-cdbr-east-05.cleardb.net",
    user: "bb1b355d0e0280",
    password: "984f1405",
    database: "heroku_a420b86963381b8",
    connectionLimit: 10
})
// const pool = createPool({
//     host: "localhost",
//     user: "root",
//     password: "Olivia@03",
//     database: "db_PHE",
//     connectionLimit: 10
// })


export function query(sql, args){
    return new Promise((resolve, reject)=>{
        pool.getConnection((err, con)=>{
            if (err){
                return reject(err);
            }
            con.query(sql, args, (err, res)=>{
                con.release();
                if (err){
                    return reject(err);
                }
                return resolve(res);
            });
        });
    })
}

export function parse(result){
    return JSON.parse((JSON.stringify(result)));
}

export function now(){
    const d = new Date();
    if (!process.env.PORT){
        d.setHours(d.getHours()+8);
    }
    
    return d.toISOString().slice(0, 19).replace("T", " ");
}
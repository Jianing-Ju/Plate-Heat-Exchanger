import { createPool } from "mysql";
const pool = createPool({
    host: "localhost",
    user: "root",
    password: "Olivia@03",
    database: "db_PHE",
    connectionLimit: 10
})

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
    d.setHours(d.getHours()+8);
    return d.toISOString().slice(0, 19).replace("T", " ");
}
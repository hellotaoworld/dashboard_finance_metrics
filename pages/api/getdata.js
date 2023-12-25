import mysql from "mysql2/promise";

// create the connection to database
const connection = mysql.createConnection({
    host: 'aws.connect.psdb.cloud',
    user: 'z6ldayr6v0vcwapadq3r',
    database: 'web_application'
});

export default function handler(req, res) {
    res.status(200).json({ name: "John Doe" });

}
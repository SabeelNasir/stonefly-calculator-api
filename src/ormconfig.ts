import "./lib/env"
import path from 'path';
const entityPath = path.resolve(__dirname + "/models/entities/*.js");
console.log("entity path", entityPath);
const OrmConfig: any = {
    "type": "mysql",
    "host": process.env.APP_DB_HOST || "localhost",
    "port": Number(process.env.APP_DB_PORT) || 3306,
    "username": process.env.APP_DB_USER || "root",
    // "password": process.env.APP_DB_PASS || "",
    "database": process.env.APP_DB_NAME || "stonefly_db",
    "logging": false,
    "entities": [
        entityPath
    ],
    cache: {
        type: "database",
        tableName: "query-result-cache",
        duration: 100000
    },
    pool: {
        max: 100,
        min: 10
    }
}

const OrmConfigProd: any = {
    "type": "mysql",
    "host": process.env.APP_DB_HOST || "localhost",
    "port": Number(process.env.APP_DB_PORT) || 3306,
    "username": process.env.APP_DB_USER || "root",
    "password": process.env.APP_DB_PASS || "",
    "database": process.env.APP_DB_NAME || "stonefly_db",
    "logging": false,
    "entities": [
        entityPath
    ],
    cache: {
        type: "database",
        tableName: "query-result-cache",
        duration: 100000
    },
    pool: {
        max: 100,
        min: 10
    }
}

export default process.env.NODE_ENV == 'development' ? OrmConfig : OrmConfigProd;
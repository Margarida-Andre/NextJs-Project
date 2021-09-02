import { MongoClient, Db } from 'mongodb';

//ler variáveis de ambiente ".env.local"
let uri = process.env.MONGODB_URI;
let dbName = process.env.MONGODB_DB;
//variáveis de chache
let cachedClient: MongoClient;
let cachedDb : Db;

if(!uri){
    throw new Error(
        'Por favor, defina a variável de ambiente MONGODB_URI dentro de .env.local'
    )
}

if(!dbName){
    throw new Error(
        'Por favor, defina a variável de ambiente MONGODB_DB dentro de .env.local'
    )
}

export async function connectToDatabase() {
    if(cachedClient && cachedDb){
        return {
            client: cachedClient, db: cachedDb
        }
    }

    const client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    const db = await client.db(dbName);

    cachedClient = client;
    cachedDb = db;

    return {client, db};
}

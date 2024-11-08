import { MongoClient, ServerApiVersion } from "mongodb";

let db;
export const mongodb = async () => {
    if (db) return db;
    try {
        const uri = `mongodb+srv://${process.env.NEXT_PUBLIC_MONGODB_USER}:${process.env.NEXT_PUBLIC_MONGODB_PASS}@cluster0.gphdl2n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
        const client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });
        db = client.db('queora');
        console.log(process.env.NEXT_PUBLIC_MONGODB_USER)
        return db;
    } catch (error) {
        console.log(error);
    }
}
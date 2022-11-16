import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("Instacats");

    if (req.method === 'POST') {
        try {
            const user = req.body
            const post = await db.collection('users').insertOne(user).then(result => {
                res.status(201).json(result.ops[0])
            })
            res.json(post)
        } catch (error) {
            console.error(error)
        }
    } else if (req.method === 'GET') {
        try {
            const users = await db
                .collection("users")
                .find({})
                .sort()
                .limit(10)
                .toArray();

            res.json(users);
        } catch (e) {
            console.error(e);
        }
    }
};
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("Instacats");
    if (req.method === 'POST') {
        try {
            const post = req.body
            const myPost = await db.collection('posts').insertOne(post).then(result => {
                res.status(201).json(result.ops[0])
            })
            res.json(myPost)
        } catch (error) {
            console.error(error)
        }
    } else if (req.method === 'GET') {
        try {
            const posts = await db
                .collection("posts")
                .toArray();

            res.json(posts);
        } catch (e) {
            console.error(e);
        }
    }
}

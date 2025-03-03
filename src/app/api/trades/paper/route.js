import clientPromise from "@/mongodb";


export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("trades");
    const trades = await db.collection("paper").find({}).toArray();
    return Response.json(trades);
  } catch (e) {
    console.error(e);
  }
}
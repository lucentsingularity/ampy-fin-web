import clientPromise from "@/mongodb";


export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("trading_simulator");
    const trades = await db.collection("rank").find({}).toArray();
    return Response.json(trades);
  } catch (e) {
    console.error(e);
  }
}
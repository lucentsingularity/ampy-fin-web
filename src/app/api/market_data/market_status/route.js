import clientPromise from "@/mongodb";


export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("market_data");
    const trades = await db.collection("market_status").find({}).toArray();
    return Response.json(trades);
  } catch (e) {
    console.error(e);
  }
}
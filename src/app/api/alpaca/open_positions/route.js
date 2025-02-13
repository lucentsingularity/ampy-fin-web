import clientPromise from "@/mongodb";


export async function GET(request, { params }) {
  try {
    const req = await fetch(`https://paper-api.alpaca.markets/v2/positions`, {
      headers: {
        'APCA-API-KEY-ID': process.env.APCA_API_KEY_ID,
        'APCA-API-SECRET-KEY': process.env.APCA_API_KEY_SECRET,
        'accept': 'application/json',
      },
    })
    const data = await req.json()
    return Response.json(data);
  } catch (e) {
    console.error(e);
  }
}
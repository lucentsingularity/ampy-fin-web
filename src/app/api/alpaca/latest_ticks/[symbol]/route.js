import clientPromise from "@/mongodb";


export async function GET(request, { params }) {
  try {
    const symbol = (await params).symbol
    const searchParams = request.nextUrl.searchParams
    const timeframe = searchParams.get('timeframe') || '2Min'
    const limit = searchParams.get('limit') || '720'
    const req = await fetch(`https://data.alpaca.markets/v2/stocks/bars?start=2024-01-03T00:00:00Z&symbols=${symbol}&timeframe=${timeframe}&limit=${limit}&adjustment=raw&feed=sip&sort=desc`, {
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
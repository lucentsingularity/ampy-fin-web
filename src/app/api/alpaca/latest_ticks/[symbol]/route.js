import clientPromise from "@/mongodb";


export async function GET(request, { params }) {
  try {
    const symbol = (await params).symbol
    const searchParams = request.nextUrl.searchParams
    const timeframe = searchParams.get('timeframe') || '2Min' // Available: 2Min, 15Min, 1Hour, 3Hour, 1Day
    const limit = searchParams.get('limit') || '720'
    const currentTime = new Date();
    const startTime = new Date(currentTime.getTime() - (limit * 2 * 60 * 1000));
    const startTimeISO = startTime.toISOString();
    const req = await fetch(`https://data.alpaca.markets/v2/stocks/bars?start=${startTimeISO}&symbols=${symbol}&timeframe=${timeframe}&adjustment=raw&feed=sip&sort=desc`, {
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
import clientPromise from "@/mongodb";


export async function GET(request, { params }) {
  try {
    const symbol = (await params).symbol
    const searchParams = request.nextUrl.searchParams
    const timeframe = searchParams.get('timeframe') || '2min' // Available: 2Min, 15Min, 1Hour, 3Hour, 1Day
    const timeframes = {
      '2min': { frame: 'Day', startTime: new Date(new Date().getTime() - (2 * 60 * 1000 * 720)) },
      '15min': { frame: 'Week', startTime: new Date(new Date().getTime() - (15 * 60 * 1000 * 672)) },
      '1hour': { frame: 'Month', startTime: new Date(new Date().getTime() - (60 * 60 * 1000 * 720)) },
      '3hour': { frame: '3Month', startTime: new Date(new Date().getTime() - (3 * 60 * 60 * 1000 * 720)) },
      '1day': { frame: 'Year', startTime: new Date(new Date().getTime() - (24 * 60 * 60 * 1000 * 365)) },
    }
    const startTimeISO = timeframes[timeframe].startTime.toISOString();
    const req = await fetch(`https://data.alpaca.markets/v2/stocks/bars?start=${startTimeISO}&symbols=${symbol}&timeframe=${timeframe}&limit=1000&adjustment=raw&feed=sip&sort=desc`, {
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
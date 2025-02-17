
export async function GET(request, { params }) {
  try {
    const symbol = (await params).symbol
    const req = await fetch(`https://data.alpaca.markets/v2/stocks/bars/latest?symbols=${symbol}&feed=sip`, {
      headers: {
        'APCA-API-KEY-ID': process.env.APCA_API_KEY_ID,
        'APCA-API-SECRET-KEY': process.env.APCA_API_KEY_SECRET,
        'accept': 'application/json',
      },
    })
    const data = await req.json()
    return Response.json(data['bars'][symbol]);
  } catch (e) {
    console.error(e);
  }
}
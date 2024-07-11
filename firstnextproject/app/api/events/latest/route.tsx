import { NextResponse } from "next/server";
import { eventCollection } from "../route";

export async function GET() {
	const lastEvent = await eventCollection.find().sort({ _id: -1 }).limit(1).toArray();
	console.log(lastEvent);
	return new NextResponse(JSON.stringify(lastEvent), { status: 200 })
}

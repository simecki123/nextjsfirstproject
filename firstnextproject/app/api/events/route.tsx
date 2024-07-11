import { MongoClient, Collection } from "mongodb";
const uri = process.env.CONNECTION_STRING || "";
const client = new MongoClient(uri);
client.connect();
export const eventCollection: Collection = client.db("KavaApp").collection("brewEvents");

export async function GET() {
	try {
		const events = eventCollection.find();
		for await (const event of events) {
			console.log(event);
		}
		return Response.json({ message: 'Database seeded successfully' });
	} catch (error) {
		return Response.json({ error }, { status: 500 });
	}
}


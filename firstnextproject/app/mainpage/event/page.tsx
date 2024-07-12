import EndEventButton from "./end-event-button";
import OrderEvent from "./order-component";

export default function EventPage() {

  const orders = [1, 2, 3];

  const orderComps = orders.map(value => (
    <OrderEvent key={value} />
  ))

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="bg-stone-200 rounded-xl px-12 py-6 mx-4 my-4">
        <h1 className="text-6xl font-bold">Orders</h1>
      </div>
      {orders &&
        orderComps}
      <EndEventButton />
    </div>
  )
}


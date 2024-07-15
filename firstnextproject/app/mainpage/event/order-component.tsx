export default function OrderEvent( {order}: any) {
  return (
    <div className="bg-stone-200 rounded-xl px-12 py-6 mx-4 my-4">
      <p className="text-2xl">Type: {order.type} </p>
      <p className="text-2xl">Suggar: {order.sugarQuantity}</p>
      <p className="text-2xl">Milk: {order.milkQuantity}</p>
    </div>
  )
}

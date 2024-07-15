export default function OrderEvent({ order }: any) {
  return (
    <div className="bg-stone-200 rounded-xl px-12 py-6 mx-4 my-4">
      <div className="flex items-center">
        <img src="/coffeImage.png" className="mb-4" width={40} height={24}></img>
        <p className="text-2xl ml-2">{order.type} </p>
      </div>
      <div className="flex items-center mb-4">
        <img src="/sugar-cube.png" width={40} height={24}></img>
        <p className="text-2xl ml-2">{order.sugarQuantity}</p>
      </div>
      <div className="flex items-center">
        <img src="/milk-carton.png" width={40} height={24}></img>
        <p className="text-2xl ml-2">{order.milkQuantity}</p>
      </div>
    </div>
  )
}

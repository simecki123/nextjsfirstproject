import { getUserById } from "@/app/api/api";
import { cookies } from "next/headers";
import { Order } from "@/app/mainpage/event/page"

interface User {
  firstName: string;
  lastName: string;
  sub: string;
  userId: string;
}

interface OrderEventProps {
  order: Order;
}

export default async function OrderEvent({ order }: OrderEventProps) {
  const cookieStore = cookies();
  const tokenCookie = cookieStore.get('token');
  const response = await getUserById(tokenCookie?.value, order.userId);
  const user: User = response.data;

  return (
    <div className="bg-stone-200 rounded-xl px-12 py-6 mx-4 my-4">
      <div className="flex items-center">
        <p className="text-2xl ml-2">Order for {user.firstName} </p>
      </div>
      <div className="flex items-center">
        <img src="/coffeImage.png" className="mb-4" width={40} height={24} alt="Coffee" />
        <p className="text-2xl ml-2">{order.type} </p>
      </div>
      <div className="flex items-center mb-4">
        <img src="/sugar-cube.png" width={40} height={24} alt="Sugar" />
        <p className="text-2xl ml-2">{order.sugarQuantity}</p>
      </div>
      <div className="flex items-center">
        <img src="/milk-carton.png" width={40} height={24} alt="Milk" />
        <p className="text-2xl ml-2">{order.milkQuantity}</p>
      </div>
    </div>
  )
}
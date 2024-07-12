import CoffeeTypeComponent from "@/app/components/brew_components/coffe-type-components";
import { useParams } from "next/navigation";

export default function ChooseCoffee() {

  return (
    <div className="flex items-center justify-center h-screen">
      <CoffeeTypeComponent />
    </div>
  )
}

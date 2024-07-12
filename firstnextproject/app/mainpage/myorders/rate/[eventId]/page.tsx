import RateCoffee from "@/app/components/rating_components/rate-component";

export default function RatePage({params}:
  {
    params: {eventId: number}
  }
) {
  return (
    <div className="flex h-screen justify-center items-center">
      <RateCoffee coffeeOrderId={params.eventId} />
    </div>
  )
}

'use client'

export default function EndEventButton() {
  return (
    <div className="bg-stone-200 cursor-pointer hover:scale-105 transition
      rounded-xl py-6 px-6 mb-44" onClick={() => console.log('this will end the event')}>
      <p className="text-4xl">end</p>
    </div>
  )
}

'use client'
import { useState } from "react"
import Modal from "../Modal"
import BrewComponent from "../brew/BrewComponent";

export default function ReadyToBrewButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="shadow hover:shadow-lg transform hover:scale-105
            p-4 bg-stone-300 transition duration-300 rounded-2xl cursor-pointer mb-96"
        onClick={() => setIsModalOpen(true)}>
        <div className='flex items-center'>
          <h1 className="text-2xl font-bold">Ready for brewing</h1>
          <img src="/coffeImage.png" width={50} height={30} className="mb-4 ml-4 mr-4" alt="Coffee" />
          <h1 className="text-2xl font-bold">?</h1>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <BrewComponent />
      </Modal>
    </>
  )
}

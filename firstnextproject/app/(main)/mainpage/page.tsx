import CurrentlyBrewingUsers from "@/app/components/mainpage/CurrentlyBrewingUsers";
import ReadyToBrewButton from "@/app/components/mainpage/ReadyToBrewButton";

export default function MainPage() {

  return (
    <div className='flex h-screen flex-col justify-end items-center'>
      <ReadyToBrewButton />
      <CurrentlyBrewingUsers />
    </div>
  );
}



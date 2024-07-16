import ReadyToBrewButton from '../components/mainpage-components/ReadyToBrewButton';
import CurrentlyBrewingUsers from '../components/mainpage-components/CurrentlyBrewingUsers';

export default function MainPage() {

  return (
    <div className='flex h-screen flex-col justify-end items-center'>
      <ReadyToBrewButton />
      <CurrentlyBrewingUsers />
    </div>
  );
}

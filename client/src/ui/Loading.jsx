import { PulseLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div className="w-full h-full bg-black/80 absolute top-0 left-0 flex flex-col gap-4 items-center justify-center">
      <PulseLoader color="#ffffff" size={15} />
      <p className="text-white text-2xl font-bold tracking-widest">
        Loading...
      </p>
    </div>
  );
};

export default Loading;
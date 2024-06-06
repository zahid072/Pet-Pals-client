import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CardSkeleton = () => {
  return (
    <div className="grid lg:grid-cols-3 w-full md:grid-cols-2 grid-cols-1 gap-7 justify-items-center max-w-7xl lg:mx-auto mx-2">
      <div className="w-full">
        <Skeleton baseColor="#929191fe" height={400} className=" mt-5" />
      </div>
      <div className="w-full">
        <Skeleton baseColor="#929191fe" height={400} className=" mt-5" />
      </div>
      <div className="w-full">
        <Skeleton baseColor="#929191fe" height={400} className=" mt-5" />
      </div>
     
    </div>
  );
};

export default CardSkeleton;

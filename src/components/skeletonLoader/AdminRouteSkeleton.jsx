import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AdminRouteSkeleton = () => {
  return (
    <div className="lg:max-w-5xl w-full">
      <Skeleton baseColor="#929191fe" height={60} className="" />
      <div className="space-y-5">
        <div>
          <Skeleton baseColor="#dad0d0fe" height={50} className="" />
        </div>
        <div>
          <Skeleton baseColor="#dad0d0fe" height={50} className="" />
        </div>
        <div>
          <Skeleton baseColor="#dad0d0fe" height={50} className="" />
        </div>
        <div>
          <Skeleton baseColor="#dad0d0fe" height={50} className="" />
        </div>
        <div>
          <Skeleton baseColor="#dad0d0fe" height={50} className="" />
        </div>
      </div>
    </div>
  );
};

export default AdminRouteSkeleton;

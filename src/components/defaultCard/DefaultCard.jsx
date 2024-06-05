import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import TimeStamp from "../timeStamp/TimeStamp";
import { Link } from "react-router-dom";
import { FaRegClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlinePermContactCalendar } from "react-icons/md";

const DefaultCard = ({ pet }) => {
  return (
    <Card className="w-full max-w-md rounded mx-auto">
      <CardHeader shadow={false} floated={false} className="h-64">
        <img
          src={pet?.image}
          alt={pet?.petName}
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody className="w-full">
        <div className="mb-2 flex items-center justify-between">
          <Typography color="blue-gray" className="font-medium text-2xl">
            {pet?.petName}
          </Typography>
          <Typography
            color="blue-gray"
            className="font-medium flex items-center gap-1"
          >
            <FaRegClock />
            <TimeStamp timestamp={pet?.timestamp} />
          </Typography>
        </div>
        <Typography color="blue-gray" className="font-medium my-2 flex items-center gap-1">
          <MdOutlinePermContactCalendar />
          {pet?.petAge}
        </Typography>
        <Typography
          color="blue-gray"
          className="font-medium flex items-center gap-1"
        >
          <FaLocationDot />
          {pet?.location}
        </Typography>
        <Typography
          variant="small"
          color="gray"
          className="font-normal opacity-80 mt-3"
        >
          {pet?.shortDescription}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Link to={`/petDetails/${pet?._id}`}>
          <Button
            ripple={false}
            fullWidth={true}
            className="bg-deep-orange-500 text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
          >
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default DefaultCard;

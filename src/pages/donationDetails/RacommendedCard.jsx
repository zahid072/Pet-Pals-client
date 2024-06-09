import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import TimeStamp from "../../components/timeStamp/TimeStamp";
import { Link } from "react-router-dom";

const RecommendedCard = ({ campaign }) => {
  return (
    <Card className="w-full max-w-[48rem] flex-row">
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 md:w-2/5 w-full relative shrink-0 md:rounded-b-none md:rounded-bl-xl rounded-b-none  md:rounded-tr-none md: md:h-auto h-72"
      >
        <h4 className="text-xl font-medium p-2 rounded-r absolute top-5 left-0 bg-deep-orange-400/70 text-white">
          Add Donation
        </h4>
        <img
          src={campaign?.image}
          alt="card-image"
          className="w-full h-full object-cover"
        />
      </CardHeader>
      <CardBody className="w-full">
        <div className="mb-4 flex justify-between items-center">
          <Typography className="text-2xl font-semibold">
            {campaign?.petName}
          </Typography>
          <Typography
            id="take"
            className="mb-4 flex justify-between items-center"
          >
            <TimeStamp timestamp={campaign?.timestamp} />
          </Typography>
        </div>
        <Typography color="blue-gray" className="mb-2">
          You can donate maximum: ${campaign?.userCanDonate}
        </Typography>
        <Typography color="gray" className=" mb-8 font-normal">
          Max Donation Amount: ${campaign?.maxAmount}
        </Typography>
        {/* <Typography
                    color="gray"
                    className=" font-normal flex gap-2 items-center flex-wrap"
                  >
                    Campaign ends in: <DaysLeft timestamp={camp?.lastDate} />
                  </Typography> */}
        <div>
          <Link to={`/donationDetails/${campaign?._id}`} className="inline-block">
            <Button variant="button" className="flex  items-center gap-2">
              Donate Now
            </Button>
          </Link>
        </div>
      </CardBody>
    </Card>
  );
};

export default RecommendedCard;

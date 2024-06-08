import { Spinner } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';

const calculateTimeLeft = (timestamp) => {
    const now = new Date();
    const lastTime = new Date(timestamp);

    const diff = lastTime - now; // Difference between future date and now in milliseconds

    if (diff <= 0) {
        return 'Date has passed';
    }

    const seconds = Math.floor(diff / 1000) % 60;
    const minutes = Math.floor(diff / (1000 * 60)) % 60;
    const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    return `${days}d ${hours}h ${minutes}m ${seconds}s left`;
};

const DaysLeft = ({ timestamp }) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(timestamp));

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeLeft(calculateTimeLeft(timestamp));
        }, 1000);

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [timestamp]);

    if (!timestamp) {
        return <Spinner className='size-2' />;
    }

    return (
        <div>
            {timeLeft}
        </div>
    );
};

export default DaysLeft;

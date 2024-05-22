import dayjs from "dayjs";
import { useEffect, useState } from "react";

const DateTime = () => {
  const [shiftNo, setShiftNo] = useState(1);
  const [today, setToday] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setToday(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center">
      <h1 className="text-[1vw]">
        {dayjs(today).format("DD/MM/YYYY HH:mm UTC+7")}
        {/* {today.toString()} */}
      </h1>
    </div>
  );
};

export default DateTime;

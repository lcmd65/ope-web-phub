import { useEffect, useState } from "react";

const Clock = () => {
  const [time, setTime] = useState<string>("00:00:00");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      setTime(`${hours}:${minutes}:${seconds}`);
    };

    // Update the time every second
    const intervalId = setInterval(updateTime, 1000);

    // Initial update
    updateTime();

    // Clean up the interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1 className="text-[1.2vw]">{time}</h1>
    </div>
  );
};

export default Clock;

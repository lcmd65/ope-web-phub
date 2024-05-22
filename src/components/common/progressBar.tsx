import color from "styles/enums/color";
import { IBatchStatus } from "types/response/dashboard/IBatchStatus";

const StepProgressBar = (props: { progressData: IBatchStatus[] }) => {
  const progressData = props.progressData ?? [];
  const numSegments = 17;
  const minutesPerSegment = 30;

  // Function to convert hours and minutes to "hh:mm" format
  const formatTime = (hours: number, minutes: number) => {
    const formattedHours = hours.toString().padStart(2, "0");

    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes}`;
  };

  // Function to get the hour since the shift started
  const hourSinceStartShift = (hour: number) => {
    if (hour >= 22) return hour - 22;
    if (hour >= 14) return hour - 14;
    if (hour >= 6) return hour - 6;

    // If hour is less than 6, it means that the shift started yesterday
    return hour + 2;
  };

  // Function to group the progress data into 5-minute intervals
  const groupProgressData = () => {
    const groupedData = Array(96).fill(null);

    progressData.forEach((item) => {
      const logTime = new Date(item.log_time);
      const minutes = hourSinceStartShift(logTime.getHours()) * 60 + logTime.getMinutes();
      const segmentIndex = Math.floor(minutes / 5);

      if (segmentIndex >= 0 && segmentIndex < 96) {
        // if (item.value > 100) {
        if (item.value > 50) {
          groupedData[segmentIndex] = true; // Represents green segment
        } else {
          groupedData[segmentIndex] = false; // Represents error segment
        }
      }
    });

    return groupedData;
  };
  const timeLine = () => {
    const timeLine = Array(numSegments).fill(null);
    const index = progressData.findIndex((item) => item !== null);
    const now = index >= 0 ? new Date(progressData[index].log_time) : new Date();
    const hour = now.getHours();
    const shiftStartAt = hour >= 22 ? 22 : hour >= 14 ? 14 : hour >= 6 ? 6 : 22;

    for (let i = 0; i < numSegments; i++) {
      const segmentHour = (shiftStartAt + Math.floor(i / 2)) % 24;
      const segmentMinutes = (i % 2) * minutesPerSegment;
      timeLine[i] = formatTime(segmentHour, segmentMinutes);
    }
    return timeLine;
  };
  function convertNullToPrevious(arr: (boolean | null)[]) {
    //find the last non-null element by reversing the array, then find the index of the first non-null element
    var lastNonNullIndex = 0;
    try {
      if (
        arr
          .slice()
          .reverse()
          .findIndex((item) => item !== null) === -1
      ) {
        return arr;
      }
      lastNonNullIndex =
        arr.length -
        1 -
        arr
          .slice()
          .reverse()
          .findIndex((item) => item !== null);
    } catch (e) {
      lastNonNullIndex = 0;
    }
    let previousValue = false; // Set the initial previousValue to false if the first element is null
    for (let i = 0; i <= lastNonNullIndex; i++) {
      if (arr[i] !== null) {
        // If the current element is not null, update the previousValue and continue
        previousValue = arr[i]!;
      } else {
        // If the current element is null, update it with the previous non-null value
        arr[i] = previousValue;
      }
    }
    return arr;
  }
  const tempArray = groupProgressData();
  const timeLineData = timeLine();

  const groupedProgressData = convertNullToPrevious(tempArray ?? []);

  return (
    <div className="w-full">
      <div className="flex justify-between">
        {timeLineData.map((time, index) => (
          <h1
            style={{
              fontSize: "16px",
            }}
            key={index}
          >
            {time}
          </h1>
        ))}
      </div>
      <div style={{ display: "flex", backgroundColor: color.lightBlue, width: "100%", marginBottom: "6px" }}>
        {groupedProgressData.map((isGreen, index) => (
          <div
            key={index}
            style={{
              width: `${100 / 96}%`,
              backgroundColor: isGreen === null ? color.lightBlue : isGreen ? color.green : color.error,
              height: "40px",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default StepProgressBar;

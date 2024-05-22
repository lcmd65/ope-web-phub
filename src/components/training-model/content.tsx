import { DatePicker } from "antd";
import dayjs from "dayjs";
import useTrainingModelTable from "hooks/training-model/useTrainingModelTable";
import color from "styles/enums/color";
import HistoryTrainingModelTable from "./trainingModelHistoryTable";

const TrainingModelHistoryContent = () => {
  const { RangePicker } = DatePicker;

  const {
    dataLogTrainTable,
    dateEnd,
    dateStart,
    loading,
    columns,
    openDetailSampleModal,
    dateFormat,
    setDateEnd,
    setDateStart,
    setOpenDetailSampleModal,
  } = useTrainingModelTable();

  return (
    <div
      style={{
        backgroundColor: color.white,
        width: "100%",
      }}
      className="flex flex-col gap-4 py-4"
    >
      <div className="px-[30%]">
        <RangePicker
          style={{
            marginBottom: 0,
            display: "flex",
          }}
          defaultValue={[dayjs(dateStart, dateFormat), dayjs(dateEnd, dateFormat)]}
          format={dateFormat}
          size="large"
          onChange={(date, dateString) => {
            if (!date) return;
            else {
              setDateStart(dayjs(date[0]));
              setDateEnd(dayjs(date[1]));
            }
          }}
        />
      </div>
      <HistoryTrainingModelTable
        columns={columns}
        data={dataLogTrainTable}
        loading={loading}
        openDetailSampleModal={openDetailSampleModal}
        setOpenDetailSampleModal={setOpenDetailSampleModal}
      />
    </div>
  );
};

export default TrainingModelHistoryContent;

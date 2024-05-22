import { Pagination } from "antd";
import LoadingIndicator from "components/dashBoard/LoadingIndicator";
import { Dayjs } from "dayjs";
import { Dispatch, SetStateAction, useState } from "react";
import { IDataInfoCUCMixer } from "types/response/info-CUC/IInfoCUC";
import InfoCUCByMixerTable from "./table/infoCUCByMixerTable";

type Props = {
  loading?: boolean;
  startDate: Dayjs;
  dataInfoCUCMixer: IDataInfoCUCMixer[];
  listCUCStatusDelete: any;
  setListCUCStatusDelete: any;
  onDeleteCUCSchedule: (mixerId: string, CUCScheduleIdList: React.Key[]) => void;
  setReload: Dispatch<SetStateAction<boolean>>;
};

const CUCStatusContent = (props: Props) => {
  const { loading, dataInfoCUCMixer, startDate } = props;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(1);
  const onChangePage = (page: number, pageSize: number) => {
    setStartIndex((page - 1) * pageSize);
    setEndIndex(page * pageSize - 1);
  };

  return (
    <div className="w-full">
      {loading && <LoadingIndicator />}
      <div
        className="gap-5 relative grid grid-cols-2 py-4"
        style={
          loading
            ? {
                filter: "blur(3px)",
                pointerEvents: "none",
              }
            : {}
        }
      >
        {dataInfoCUCMixer?.map((item, index) => (
          <div
            className={index >= startIndex && index <= endIndex ? "flex flex-col items-center" : "hidden"}
            key={index}
          >
            <InfoCUCByMixerTable
              mixerId={item.mixerId}
              mixerName={item.mixerName}
              dataTable={item.data.map((item) => ({
                ...item,
                key: item._id,
              }))}
              startDate={startDate}
              listCUCStatusDelete={props.listCUCStatusDelete}
              setListCUCStatusDelete={props.setListCUCStatusDelete}
              onDeleteCUCSchedule={props.onDeleteCUCSchedule}
              setReload={props.setReload}
            />
          </div>
        ))}
      </div>
      {dataInfoCUCMixer?.length > 0 && (
        <div className="flex justify-center items-center my-4">
          <Pagination
            defaultCurrent={1}
            defaultPageSize={2}
            total={dataInfoCUCMixer?.length}
            pageSizeOptions={[2, 5, 10]}
            showSizeChanger={true}
            onChange={onChangePage}
          />
        </div>
      )}
    </div>
  );
};

export default CUCStatusContent;

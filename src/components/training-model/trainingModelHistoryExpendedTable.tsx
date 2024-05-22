import { Table, TableColumnsType } from "antd";
import useTrainingModelExpendedTable from "hooks/training-model/useTrainingModelExpendedTable";
import { ISignalTrainInfo } from "types/response/training-model/ITrainingModelResponse";
import DetailNumberSampleByCUCModal from "./detailNumberSampleByCUCModal";

type Props = {
  dataSource: ISignalTrainInfo[];
};

const TrainingModelHistoryExpendedTable = (props: Props) => {
  const { dataSource } = props;
  const { openDetailSampleModal, dataDetailSample, setOpenDetailSampleModal, setDataDetailSample } =
    useTrainingModelExpendedTable();
  const columns: TableColumnsType<ISignalTrainInfo> = [
    { title: "Type", dataIndex: "type" },
    {
      title: "Number sample",
      render: (value: ISignalTrainInfo) => {
        return (
          <a
            onClick={() => {
              setDataDetailSample(value.number_samples_by_cuc);
              setOpenDetailSampleModal(true);
            }}
          >
            {value.number_samples}
          </a>
        );
      },
    },
    { title: "RMSE", dataIndex: "rmse" },
    { title: "ID file", dataIndex: "file" },
  ];

  return (
    <>
      <Table columns={columns} dataSource={dataSource} pagination={false} />
      <DetailNumberSampleByCUCModal
        open={openDetailSampleModal}
        setOpen={setOpenDetailSampleModal}
        dataSource={dataDetailSample}
      />
    </>
  );
};

export default TrainingModelHistoryExpendedTable;

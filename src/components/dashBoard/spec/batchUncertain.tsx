import { Progress } from "antd";
import { ColumnsType } from "antd/es/table";
import color from "styles/enums/color";
import { BatchNoUncertain, IBatchUncertain } from "types/response/dashboard/IBatchUncertain";
import { roundTo2Digits } from "utilities/function/roundTo2Digits";
import BatchNoUncertainTextWithModal from "./batchNoWithModal";
import DataTable from "./dataTable";

const columnsPH: ColumnsType<BatchNoUncertain> = [
  {
    title: "Uncertain Batch No. - PH",
    dataIndex: "batchNo",
    render: (_, item) => {
      return <BatchNoUncertainTextWithModal item={item} />;
    },
    align: "center",
    width: "70%",
  },
];

const columnsVis: ColumnsType<BatchNoUncertain> = [
  {
    title: "Uncertain Batch No. - VIS",
    dataIndex: "batchNo",
    render: (_, item) => {
      return <BatchNoUncertainTextWithModal item={item} />;
    },
    align: "center",
    width: "70%",
  },
];

const columnsAd: ColumnsType<BatchNoUncertain> = [
  {
    title: "Uncertain Batch No. - AD",
    dataIndex: "batchNo",
    render: (_, item) => {
      return <BatchNoUncertainTextWithModal item={item} />;
    },
    align: "center",
    width: "70%",
  },
];

const BatchUncertain = (props: { batchUncertain?: IBatchUncertain }) => {
  const uncertain = "Uncertain";
  const { batchUncertain } = props;
  //
  const uncertainPhBatch: (BatchNoUncertain | null)[] =
    batchUncertain?.batch_no_uncertain?.filter((item) => {
      if (item.ph_status === uncertain) {
        return item;
      } else {
        return null;
      }
    }) ?? [];

  const uncertainVisBatch: (BatchNoUncertain | null)[] =
    batchUncertain?.batch_no_uncertain?.filter((item) => {
      if (item.vis_status === uncertain) {
        return item;
      } else {
        return null;
      }
    }) ?? [];

  const uncertainAdBatch: (BatchNoUncertain | null)[] =
    batchUncertain?.batch_no_uncertain?.filter((item) => {
      if (item.ad_status === uncertain) {
        return item;
      } else {
        return null;
      }
    }) ?? [];

  const uncertainPhBatchPercent =
    (((batchUncertain?.batch_no_uncertain?.length ?? 0) - (uncertainPhBatch?.length ?? 0)) /
      (batchUncertain?.batch_no_uncertain?.length ?? 1)) *
    100;
  const uncertainVisBatchPercent =
    (((batchUncertain?.batch_no_uncertain?.length ?? 0) - (uncertainVisBatch?.length ?? 0)) /
      (batchUncertain?.batch_no_uncertain?.length ?? 1)) *
    100;
  const uncertainAdBatchPercent =
    (((batchUncertain?.batch_no_uncertain?.length ?? 0) - (uncertainAdBatch?.length ?? 0)) /
      (batchUncertain?.batch_no_uncertain?.length ?? 1)) *
    100;
  let locale = {
    emptyText: " - ",
  };

  return (
    <div className="items-center w-full">
      <div className="flex justify-center w-full gap-4 py-1">
        <div className="w-1/4">
          <Progress
            strokeLinecap="butt"
            type="circle"
            className="flex items-center justify-center h-full"
            percent={uncertainPhBatchPercent}
            size={90}
            strokeWidth={10}
            format={(percent) => `${roundTo2Digits(percent ?? 0)}%`}
            strokeColor={color.green}
            trailColor={color.error}
          />
        </div>
        <div className="w-3/4 h-full">
          <DataTable columns={columnsPH} data={uncertainPhBatch} scroll={{ y: 100 }} locale={locale}></DataTable>
        </div>
      </div>
      <div className="flex justify-center w-full gap-4 py-1">
        <div className="w-1/4">
          <Progress
            strokeLinecap="butt"
            type="circle"
            className="flex items-center justify-center w-full h-full"
            percent={uncertainVisBatchPercent}
            size={90}
            strokeWidth={10}
            format={(percent) => `${roundTo2Digits(percent ?? 0)}%`}
            strokeColor={color.green}
            trailColor={color.error}
          />
        </div>
        <div className="w-3/4 h-full">
          <DataTable columns={columnsVis} data={uncertainVisBatch} scroll={{ y: 100 }} locale={locale}></DataTable>
        </div>
      </div>
      <div className="flex justify-center w-full gap-2 py-1">
        <div className="w-1/4">
          <Progress
            strokeLinecap="butt"
            type="circle"
            className="flex items-center justify-center w-full h-full"
            percent={uncertainAdBatchPercent}
            size={90}
            strokeWidth={10}
            format={(percent) => `${roundTo2Digits(percent ?? 0)}%`}
            strokeColor={color.green}
            trailColor={color.error}
          />
        </div>
        <div className="w-3/4 h-full">
          <DataTable columns={columnsAd} data={uncertainAdBatch} scroll={{ y: 100 }} locale={locale}></DataTable>
        </div>
      </div>
    </div>
  );
};

export default BatchUncertain;

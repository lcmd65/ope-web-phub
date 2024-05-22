import { DeleteOutlined, DownloadOutlined, MenuOutlined } from "@ant-design/icons";
import { DndContext } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { Dayjs } from "dayjs";
import useCUCMixerStatusTable from "hooks/status-CUC/useCUCMixerStatustable";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import { exportMasterData } from "services/excel/excel_services";
import color from "styles/enums/color";
import { IInfoCUCMixer, IListCUCStatusDelete } from "types/response/info-CUC/IInfoCUC";
import Endpoints from "utilities/enums/Endpoint";
import ImportCUCScheduleModal from "../modal/importCUCScheduleModal";
import ImportMixerWeightModal from "../modal/importMixerWeightModal";

type Props = {
  mixerId: string;
  mixerName: string;
  startDate: Dayjs;
  dataTable: IInfoCUCMixer[];
  listCUCStatusDelete: IListCUCStatusDelete[];
  setListCUCStatusDelete: (value: SetStateAction<IListCUCStatusDelete[]>) => void;
  onDeleteCUCSchedule: (mixerId: string, CUCScheduleIdList: React.Key[]) => void;
  setReload: Dispatch<SetStateAction<boolean>>;
};

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  "data-row-key": string;
}

const InfoCUCByMixerTable = (props: Props) => {
  const {
    dataTableSource,
    rowSelection,
    CUCScheduleDeleteRemain,
    selectedRowKeys,
    isErrorUpdateIndex,
    onDragStatusCard,
  } = useCUCMixerStatusTable({
    mixerId: props.mixerId,
    dataTable: props.dataTable,
    listCUCStatusDelete: props.listCUCStatusDelete,
    setListCUCStatusDelete: props.setListCUCStatusDelete,
    setReload: props.setReload,
  });
  useEffect(() => {
    if (isErrorUpdateIndex) {
      toast.error("Change index failed!");
    }
  }, [isErrorUpdateIndex]);
  const columns: ColumnsType<IInfoCUCMixer> = [
    {
      title: "STT",
      dataIndex: "serial",
    },
    {
      title: "Code CUC",
      key: "CUCCode",
      render: (value: IInfoCUCMixer) => {
        return <p>{value.CUCCode ? value.CUCCode : value.CUCCodeActual}</p>;
      },
    },
    {
      title: "Batch No",
      dataIndex: "BatchNo",
      key: "BatchNo",
    },
    {
      title: "Status",
      render: (value: IInfoCUCMixer) => {
        let status = "";
        if (value.status != "ACTIVE") {
          switch (String(value.status)) {
            case "DONE": {
              status = "Hoàn thành";
              break;
            }
            case "DOING": {
              status = "Đang chạy";
              break;
            }
            case "ACTIVE" || "null": {
              status = "Kế hoạch";
              break;
            }
          }
        }

        return <p>{status}</p>;
      },
    },
    {
      title: "Sort",
      key: "sort",
    },
  ];

  const Row = ({ children, ...props }: RowProps) => {
    const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } = useSortable({
      id: props["data-row-key"],
    });
    const style: React.CSSProperties = {
      ...props.style,
      transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
      transition,
      ...(isDragging ? { position: "relative" } : {}),
    };

    return (
      <tr {...props} ref={setNodeRef} style={style} {...attributes}>
        {React.Children.map(children, (child) => {
          if ((child as React.ReactElement).key === "sort") {
            return React.cloneElement(child as React.ReactElement, {
              children: (
                <MenuOutlined
                  rev={undefined}
                  ref={setActivatorNodeRef}
                  style={{ touchAction: "none", cursor: "move" }}
                  {...listeners}
                />
              ),
            });
          }
          return child;
        })}
      </tr>
    );
  };

  return (
    <div className="flex flex-col gap-2 justify-center bg-[#FFFFFF] p-4 rounded-2xl border-solid border-[#b4b9bc]">
      <div className="flex justify-between">
        <h1 className="text-[1.2vw] text-[#000000]">Mixer {props.mixerName}</h1>
        <div className="flex gap-2 ">
          <Button
            icon={<DeleteOutlined rev={undefined} className="flex items-center" />}
            size="middle"
            style={{ backgroundColor: !CUCScheduleDeleteRemain ? color.gray : color.error, color: color.white }}
            disabled={!CUCScheduleDeleteRemain}
            onClick={() => {
              props.onDeleteCUCSchedule(props.mixerId, selectedRowKeys);
            }}
          >
            Delete{" "}
            {typeof CUCScheduleDeleteRemain == "number" && CUCScheduleDeleteRemain
              ? `(${CUCScheduleDeleteRemain})`
              : ""}
          </Button>
          <ImportCUCScheduleModal currentMixerId={props.mixerId} setReload={props.setReload} />
          <ImportMixerWeightModal currentMixerId={props.mixerId} setReload={props.setReload} />
          <Button
            size="middle"
            icon={<DownloadOutlined rev={undefined} className="flex items-center" />}
            style={{ backgroundColor: color.green }}
            onClick={() => {
              exportMasterData(Endpoints.EXCEL.CUC_CODE_SCHEDULE, `CUC Code Schedule Mixer ${props.mixerName}`, {
                mixer_id: props.mixerId,
                start_time: props.startDate.toISOString(),
              });
            }}
          >
            Export excel
          </Button>
        </div>
      </div>
      <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragStatusCard}>
        <SortableContext items={dataTableSource.map((i) => i.key)} strategy={verticalListSortingStrategy}>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={dataTableSource}
            pagination={{ pageSize: 12 }}
            components={{
              body: {
                row: Row,
              },
            }}
            scroll={{ y: "100vh" }}
          />
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default InfoCUCByMixerTable;

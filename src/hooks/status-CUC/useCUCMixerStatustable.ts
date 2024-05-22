import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { putUpdateCUCSchedule } from "services/status-CUC/statusCUCService";
import { IInfoCUCMixer, IListCUCStatusDelete } from "types/response/info-CUC/IInfoCUC";
type Props = {
  mixerId: string;
  dataTable: IInfoCUCMixer[];
  listCUCStatusDelete: IListCUCStatusDelete[];
  setListCUCStatusDelete: (value: SetStateAction<IListCUCStatusDelete[]>) => void;
  setReload: Dispatch<SetStateAction<boolean>>;
};

const useCUCMixerStatusTable = (props: Props) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [CUCScheduleDeleteRemain, setCUCScheduleDeleteRemain] = useState<any>(0);
  const [dataTableSource, setDataTableSource] = useState(props.dataTable);
  const [isErrorUpdateIndex, setIsErrorUpdateIndex] = useState(false);

  //select row table
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
    const dataRemoveSelectMixer = props.listCUCStatusDelete.filter(
      (item: IListCUCStatusDelete) => item.mixerId !== props.mixerId,
    );
    props.setListCUCStatusDelete([
      ...dataRemoveSelectMixer,
      { mixerId: props.mixerId, CUCStatusId: newSelectedRowKeys },
    ]);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  useEffect(() => {
    setCUCScheduleDeleteRemain(
      props.listCUCStatusDelete.filter((item: IListCUCStatusDelete) => item.mixerId === props.mixerId)[0]?.CUCStatusId
        .length,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.listCUCStatusDelete]);

  //drag row table
  useEffect(() => {
    setDataTableSource(props.dataTable);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.dataTable]);
  const onDragStatusCard = async ({ active, over }: DragEndEvent) => {
    const oldIndex = active.data.current?.sortable.index;
    const newIndex = over?.data.current?.sortable.index;
    setIsErrorUpdateIndex(false);
    if (active.id !== over?.id) {
      setDataTableSource((previous) => {
        const activeIndex = previous.findIndex((i) => i.key === active.id);
        const overIndex = previous.findIndex((i) => i.key === over?.id);
        return arrayMove(previous, activeIndex, overIndex);
      });
      if (oldIndex > newIndex) {
        await putUpdateCUCSchedule({ serial: newIndex + 1, CUCCode: "" }, String(active.id))
          .then((resUpdate) => {
            if (!resUpdate.error) {
              for (let i = newIndex; i < oldIndex; i++) {
                const updateIndexOtherItem = async () => {
                  await putUpdateCUCSchedule(
                    { serial: i + 2, CUCCode: props.dataTable[i].CUCCode },
                    String(props.dataTable[i]._id),
                  ).then((res) => {
                    if (res.error) {
                      setIsErrorUpdateIndex(true);
                    }
                  });
                };
                updateIndexOtherItem();
              }
            } else {
              setIsErrorUpdateIndex(true);
            }
          })
          .finally(() => {
            props.setReload((prev) => !prev);
          });
      } else {
        await putUpdateCUCSchedule({ serial: newIndex + 1, CUCCode: "" }, String(active.id))
          .then((resUpdate) => {
            if (!resUpdate.error) {
              for (let i = oldIndex + 1; i <= newIndex; i++) {
                const updateIndexOtherItem = async () => {
                  await putUpdateCUCSchedule(
                    { serial: i, CUCCode: props.dataTable[i].CUCCode },
                    String(props.dataTable[i]._id),
                  ).then((res) => {
                    if (res.error) {
                      setIsErrorUpdateIndex(true);
                    }
                  });
                };
                updateIndexOtherItem();
              }
            } else {
              setIsErrorUpdateIndex(true);
            }
          })
          .finally(() => {
            props.setReload((prev) => !prev);
          });
      }
    }
  };

  return {
    rowSelection,
    dataTableSource,
    CUCScheduleDeleteRemain,
    selectedRowKeys,
    isErrorUpdateIndex,
    onDragStatusCard,
  };
};

export default useCUCMixerStatusTable;

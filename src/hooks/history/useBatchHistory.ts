import { useEffect, useState } from "react";
import { getBatchHistoryList } from "services/history/history";
import { IBatch } from "types/response/history/Ibatch";

export function useBatchHistory(mixer_id: string) {
  const [batchHistoryList, setBatchHistoryList] = useState<IBatch[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    if (mixer_id) {
      getBatchHistoryList([mixer_id])
        .then((res) => {
          setBatchHistoryList(res.data);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mixer_id]);

  return {
    batchHistoryList,
    setBatchHistoryList,
    loading,
  };
}

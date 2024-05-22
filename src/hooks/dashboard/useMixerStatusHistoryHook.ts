import { useEffect, useState } from "react";
import { getMixerStatusHistory } from "services/dashboard/dashboard";
import { IBatchStatus } from "types/response/dashboard/IBatchStatus";

export function useMixerStatusHistoryHook(mixerId: string | undefined) {
  const [mixerStatusList, setMixerStatusList] = useState<IBatchStatus[]>([]);

  useEffect(() => {
    if (mixerId) {
      getMixerStatusHistory(mixerId).then((res) => {
        setMixerStatusList(res.data);
      });
      const interval = setInterval(() => {
        getMixerStatusHistory(mixerId).then((res) => {
          setMixerStatusList(res.data);
        });
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [mixerId]);

  return { mixerStatusList, setMixerStatusList };
}

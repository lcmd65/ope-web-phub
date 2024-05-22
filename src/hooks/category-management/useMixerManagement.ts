import { useEffect, useState } from "react";
import { getAllMixerManagementList } from "services/category-management/mixer_management";
import { IMixerManagement } from "types/response/category-management/mixer";

export function useMixerManagement() {
  const [loading, setLoading] = useState<boolean>(false);
  const [mixerList, setMixerList] = useState<IMixerManagement[]>([]);

  useEffect(() => {
    setLoading(true);
    getAllMixerManagementList()
      .then((res) => {
        const sortedMixerList = res.data.sort((a, b) => {
          return parseInt(a.name) - parseInt(b.name);
        });
        setMixerList(sortedMixerList);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { mixerList, setMixerList, loading };
}

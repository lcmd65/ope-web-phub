import { useEffect, useState } from "react";
import { getAllMixerList } from "services/dashboard/dashboard";
import { IMixerResponse } from "types/response/dashboard/IMixerResponse";

export function useMixerListHook() {
  const [mixerList, setMixerList] = useState<IMixerResponse[]>([]);
  const [mixer, setMixer] = useState<IMixerResponse>();

  useEffect(() => {
    getAllMixerList().then((res) => {
      const sortedMixerList = res.data.sort((a, b) => {
        return parseInt(a.name) - parseInt(b.name);
      });
      setMixerList(sortedMixerList);
      setMixer(sortedMixerList[0]);
    });
  }, []);

  return { mixerList, setMixerList, mixer, setMixer };
}

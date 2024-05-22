import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { getAllCategoryManagementList } from "services/category-management/category_management";
import { getAllMixerList } from "services/dashboard/dashboard";
import { ICategoryManagement } from "types/response/category-management/category";
import { IMixerResponse } from "types/response/dashboard/IMixerResponse";

const useExportBatchPage = () => {
  // loading state
  const [isLoading, setIsLoading] = useState(false);

  //filter state
  const dateFormat = "YYYY/MM/DD";
  const [endDate, setEndDate] = useState<Dayjs>(dayjs());
  const [startDate, setStartDate] = useState<Dayjs>(dayjs().subtract(7, "day"));

  //data state
  const [mixerList, setMixerList] = useState<IMixerResponse[]>([]);
  const [mixer, setMixer] = useState<IMixerResponse>();
  const [categoryList, setCategoryList] = useState<ICategoryManagement[]>([]);
  const [category, setCategory] = useState<ICategoryManagement>();

  //onChange filter function
  const onSelectorChangeMixer = (item: any) => {
    setMixer(mixerList.find((mixer) => mixer.mixer_id === item));
  };

  const onSelectorChangeCategory = (item: any) => {
    setCategory(categoryList.find((category) => category.id === item));
  };

  const callAPI = async () => {
    setIsLoading(true);
    const [dataMixerList, dataCategoryList] = await Promise.all([
      getAllMixerList(),
      getAllCategoryManagementList(),
    ]).finally(() => {
      setIsLoading(false);
    });

    if (dataMixerList) {
      const sortedMixerList = dataMixerList.data.sort((a, b) => {
        return parseInt(a.name) - parseInt(b.name);
      });
      setMixerList(sortedMixerList);
    }

    if (dataCategoryList) {
      setCategoryList(dataCategoryList.data);
    }
  };

  useEffect(() => {
    callAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    dateFormat,
    mixerList,
    categoryList,
    mixer,
    category,
    startDate,
    endDate,
    isLoading,
    setMixer,
    onSelectorChangeMixer,
    onSelectorChangeCategory,
    setMixerList,
    setEndDate,
    setStartDate,
    setIsLoading,
  };
};

export default useExportBatchPage;

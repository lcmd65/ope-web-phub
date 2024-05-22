import { useEffect, useState } from "react";
import { getAllMixerCategoryManagementList } from "services/category-management/mixer_category_management";
import { IMixerCategoryManagement } from "types/response/category-management/mixer_category";

export function useMixerCategoryManagement() {
  const [loading, setLoading] = useState<boolean>(false);

  const [mixerCategoryList, setMixerCategoryList] = useState<IMixerCategoryManagement[]>([]);

  useEffect(() => {
    setLoading(true);
    getAllMixerCategoryManagementList()
      .then((res) => {
        const sortedMixerCategory = res.data.sort((a, b) => {
          return parseInt(a.mixer_name) - parseInt(b.mixer_name);
        });
        setMixerCategoryList(sortedMixerCategory);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { mixerCategoryList, setMixerCategoryList, loading };
}

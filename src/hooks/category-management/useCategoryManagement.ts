import { useEffect, useState } from "react";
import { getAllCategoryManagementList } from "services/category-management/category_management";
import { ICategoryManagement } from "types/response/category-management/category";

export function useCategoryManagement() {
  const [loading, setLoading] = useState<boolean>(false);
  const [categoryList, setCategoryList] = useState<ICategoryManagement[]>([]);
  useEffect(() => {
    setLoading(true);
    getAllCategoryManagementList()
      .then((res) => {
        setCategoryList(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return { categoryList, setCategoryList, loading };
}

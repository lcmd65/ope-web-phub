import { useEffect, useState } from "react";
import { getAllPhManagementList } from "services/category-management/ph_management";
import { IPHManagement } from "types/response/category-management/ph";

export function usePhManagement() {
  const [loading, setLoading] = useState<boolean>(false);
  const [phList, setPhList] = useState<IPHManagement[]>([]);

  useEffect(() => {
    setLoading(true);
    getAllPhManagementList()
      .then((res) => {
        setPhList(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { phList, setPhList, loading };
}

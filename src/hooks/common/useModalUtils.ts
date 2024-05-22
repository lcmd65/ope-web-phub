import { useState } from "react";

const useModalUtils = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return {
    open,
    confirmLoading,
    setConfirmLoading,
    showModal,
    handleCancel,
  };
};

export default useModalUtils;

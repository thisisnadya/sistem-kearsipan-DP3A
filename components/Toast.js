import { Toast } from "primereact/toast";
import { useEffect, useRef } from "react";

export default function ToastMessage() {
  const toast = useRef(null);

  useEffect(() => {
    toast.current.show({
      severity: "info",
      summary: "Info",
      detail: "Message Content",
    });
  }, []);
  return <Toast ref={toast} />;
}

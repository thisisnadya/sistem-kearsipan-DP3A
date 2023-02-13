import { Toast } from "primereact/toast";
import { useEffect, useRef } from "react";

export default function ToastMessage({ severity, summary, detail }) {
  const toast = useRef(null);

  useEffect(() => {
    toast.current.show({
      severity,
      summary,
      detail,
    });
  }, []);
  return <Toast ref={toast} />;
}

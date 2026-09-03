import { useEffect } from "react";
import { toast } from "sonner";
import { Toaster } from "cv-butler";

// Toaster only renders a toast after `toast()` is called imperatively, so
// this preview triggers one on mount to show the real visual output.
export function SuccessToast() {
  useEffect(() => {
    toast.success("ATS score ready. 2 action(s) left today.");
  }, []);
  return (
    <div style={{ width: 320, height: 80 }}>
      <Toaster />
    </div>
  );
}

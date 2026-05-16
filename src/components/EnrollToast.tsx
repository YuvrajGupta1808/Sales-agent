import { CheckCircle2, X } from "lucide-react";

type EnrollToastProps = {
  visible: boolean;
  onClose: () => void;
};

export function EnrollToast({ visible, onClose }: EnrollToastProps) {
  if (!visible) {
    return null;
  }

  return (
    <div className="enroll-toast" role="status">
      <CheckCircle2 size={22} />
      <div>
        <strong>Added to learning bag</strong>
        <span>Checkout is ready when you are.</span>
      </div>
      <button onClick={onClose} type="button" aria-label="Dismiss notification">
        <X size={18} />
      </button>
    </div>
  );
}

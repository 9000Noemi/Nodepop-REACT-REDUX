//Componente para manejar el mensaje de confirmación

interface ConfirmationDialogProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  message,
  onConfirm,
  onCancel,
  loading = false,
}) => {
  return (
    <div className="confirmation-overlay">
      <div className="confirmation-box">
        <p>{message}</p>
        <div className="confirmation-buttons">
          <button onClick={onConfirm} disabled={loading}>
            Yes, Confirm
          </button>
          <button onClick={onCancel} disabled={loading}>
            No, Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;

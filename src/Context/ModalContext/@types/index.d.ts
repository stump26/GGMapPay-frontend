type IModal = React.ReactElement;

interface IModalContext {
  modalContent?: IModal;
  updateModalContent?: React.Dispatch;
  isVisible: boolean;
  toggleVisible: () => void;
}

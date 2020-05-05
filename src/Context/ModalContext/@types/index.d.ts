type IModal = React.ReactElement;

interface IModalContext {
  modalContent?: IModal;
  updateModalContent?: React.Dispatch;
  isModalVisible: boolean;
  setModalVisible?: (target: boolean) => void;
}

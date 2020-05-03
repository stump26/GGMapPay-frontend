type IModal = React.ReactElement;

interface IModalContext {
  modal?: IModal;
  setModal?: React.Dispatch;
  isVisible: boolean;
  toggleVisible: () => void;
}

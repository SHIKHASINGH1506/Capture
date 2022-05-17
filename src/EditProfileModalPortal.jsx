import ReactDOM from "react-dom";
import { EditProfileModal } from 'features';

const EditProfileModalPortal = () => {
  return ReactDOM.createPortal(<EditProfileModal />, document.getElementById('post-modal'));
}

export { EditProfileModalPortal };
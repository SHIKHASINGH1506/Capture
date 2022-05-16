import ReactDOM from "react-dom";
import {PostModal} from 'features';

const PostModalPortal = () => {
  return ReactDOM.createPortal(<PostModal/>, document.getElementById('post-modal'));
}

export {PostModalPortal};
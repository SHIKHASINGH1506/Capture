import { useState } from "react";

export const useLoading = () => {
  const [loadingState, setLoadingState] = useState({
    likeLoading: false,
    bookmarkLoading: false,
  });

  const loadingStateHandler = (loadingType, state) => {;
    setLoadingState(
      prevState => ({
        ...prevState,
        [loadingType]: state,
      })
    )
  }
  return {loadingState, loadingStateHandler}
}

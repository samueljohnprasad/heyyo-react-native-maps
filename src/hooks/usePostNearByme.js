import { useSelector } from 'react-redux';

function usePostNearByme() {
  const postNearByme = useSelector((store) => store.postsSlice.postNearByme);
  return postNearByme;
}

export default usePostNearByme;

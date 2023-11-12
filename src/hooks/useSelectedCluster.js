import { useSelector } from 'react-redux';
import usePostNearByme from './usePostNearByme';

const useSelectedCluster = () => {
  const postsNearMe = usePostNearByme();
  const selectedCluster = useSelector(
    (store) => store.postsSlice.selectedCluster,
  );

  return selectedCluster !== -1 ? postsNearMe[selectedCluster] || [] : [];
};

export default useSelectedCluster;

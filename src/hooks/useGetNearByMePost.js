import { useDispatch, useSelector } from 'react-redux';
import { getNearByMePost } from '../store/thunk';

const useGetNearByMePost = () => {
  const dispatch = useDispatch();
  const latitude = useSelector(
    (store) => store.map.userCurrentLocation.latitude,
  );
  const longitude = useSelector(
    (store) => store.map.userCurrentLocation.longitude,
  );

  const getNearByMePosts = (distance = 10000) => {
    dispatch(getNearByMePost({ latitude, longitude, distance }));
  };
  return getNearByMePosts;
};

export default useGetNearByMePost;

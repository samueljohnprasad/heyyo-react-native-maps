/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
const clusteringThreshold = 20;

export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;
  return distance;
};

export const addCoordinateToClusters = (coordinate, clusters) => {
  const newClusters = [...clusters];
  const clusterToUpdate = newClusters.find((cluster) =>
    cluster.some(
      (existingPost) =>
        calculateDistance(
          coordinate.location.coordinates[1],
          coordinate.location.coordinates[0],
          existingPost.location.coordinates[1],
          existingPost.location.coordinates[0],
        ) <= clusteringThreshold,
    ),
  );

  if (clusterToUpdate) {
    clusterToUpdate.unshift(coordinate);
  } else {
    clusters.push([coordinate]);
  }
  return clusters;
};

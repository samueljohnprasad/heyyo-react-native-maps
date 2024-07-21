/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */

import { getPreciseDistance } from 'geolib';

/* eslint-disable operator-linebreak */
export const clusteringThreshold = 20;

export const addCoordinateToClusters = (coordinate, clusters) => {
  const newClusters = [...clusters];
  const clusterToUpdate = newClusters.find((cluster) =>
    cluster.some(
      (existingPost) =>
        getPreciseDistance(
          {
            latitude: coordinate.location.coordinates[1],
            longitude: coordinate.location.coordinates[0],
          },

          {
            latitude: existingPost.location.coordinates[1],
            longitude: existingPost.location.coordinates[0],
          },
          0.1,
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

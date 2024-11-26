
// origin: routes[0].legs[0].startLocation.latLng,
// destination: routes[0].legs[0].endLocation.latLng,
// distance: routes[0].distanceMeters,
// distanceText: routes[0].localizedValues.distance.text,
// duration: routes[0].duration,
// durationText: routes[0].localizedValues.duration.text,
// routeResponse: routes
// options: drivers.map((driver) => ({
//   id: driver.id,
//   name: driver.name,
//   description: driver.description,
//   vehicle: driver.car,
//   review: {
//     rating: driver.ratings.reduce((acc, rating) => acc + rating.value, 0) / driver.ratings.length,
//     comment: driver.ratings[0].description,
//   },
//   value: Number((driver.tax / 100) * (route.distance / 1000)),
// }))

export interface EstimateResponseDto {
  origin: {
    latitude: number;
    longitude: number;
  };
  destination: {
    latitude: number;
    longitude: number;
  };
  distance: number;
  distanceText: string;
  duration: string;
  routeResponse: unknown;
  options: {
    id: number;
    name: string;
    description: string;
    vehicle: string;
    review: {
      rating: number;
      comment: string;
    };
    value: number;
  }[];
}

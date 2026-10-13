export const ARCSEC_PER_RADIAN = 180 * 3600 / Math.PI;
export const AU_PER_PARSEC = ARCSEC_PER_RADIAN;
export function parallaxState(distancePc: number, month: number, latitudeDeg = 0) {
  const theta = month * Math.PI / 6, beta = latitudeDeg * Math.PI / 180;
  const earth = { x: Math.cos(theta), y: Math.sin(theta), z: 0 };
  const distanceAU = distancePc * AU_PER_PARSEC;
  // Fixed star longitude 90 degrees; east and north form its tangent-plane basis.
  const along = distanceAU - earth.y * Math.cos(beta);
  const east = -earth.x, north = earth.y * Math.sin(beta);
  return {
    earth,
    eastArcsec: Math.atan2(east, along) * ARCSEC_PER_RADIAN,
    northArcsec: Math.atan2(north, along) * ARCSEC_PER_RADIAN,
    parallaxArcsec: 1 / distancePc,
    exactQuadratureArcsec: Math.atan(1 / distanceAU) * ARCSEC_PER_RADIAN,
    latitudeRad: beta,
  };
}

const turf = require('@turf/turf');

function calculateArea(corners) {
  const coords = corners.map(c => [c.lng, c.lat]);
  coords.push(coords[0]); // polygon close karna zaroori hai
  const polygon = turf.polygon([coords]);
  return turf.area(polygon); // square meters mein
}

function calculatePerimeter(corners) {
  let total = 0;
  for (let i = 0; i < corners.length; i++) {
    const from = turf.point([corners[i].lng, corners[i].lat]);
    const next = corners[(i + 1) % corners.length];
    const to = turf.point([next.lng, next.lat]);
    total += turf.distance(from, to, { units: 'meters' });
  }
  return total;
}

function convertUnits(sqMeters) {
  return {
    sqFeet: +(sqMeters * 10.7639).toFixed(2),
    sqYards: +(sqMeters * 1.19599).toFixed(2),
    acres: +(sqMeters * 0.000247105).toFixed(4),
    hectares: +(sqMeters * 0.0001).toFixed(4)
  };
}

module.exports = { calculateArea, calculatePerimeter, convertUnits };

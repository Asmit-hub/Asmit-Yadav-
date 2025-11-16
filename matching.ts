import type { Request, MatchResult } from "@shared/schema";

function getDistanceFromLatLonInKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return Math.round(d * 10) / 10; // Round to 1 decimal
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

function calculateETA(distanceKm: number): string {
  // Assume average speed of 30 km/h in city
  const hours = distanceKm / 30;
  const minutes = Math.round(hours * 60);
  
  if (minutes < 60) {
    return `${minutes} min`;
  } else {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hrs}h ${mins}min` : `${hrs}h`;
  }
}

export function findNearestRequest(
  donationLat: number,
  donationLon: number,
  requests: Request[],
  maxDistanceKm: number = 5
): MatchResult | null {
  const activeRequests = requests.filter((r) => r.status === "active");
  
  if (activeRequests.length === 0) {
    return null;
  }

  let nearest: MatchResult | null = null;
  let minDistance = Infinity;

  for (const request of activeRequests) {
    const distance = getDistanceFromLatLonInKm(
      donationLat,
      donationLon,
      request.latitude,
      request.longitude
    );

    if (distance <= maxDistanceKm && distance < minDistance) {
      minDistance = distance;
      nearest = {
        request,
        distance,
        eta: calculateETA(distance),
      };
    }
  }

  return nearest;
}

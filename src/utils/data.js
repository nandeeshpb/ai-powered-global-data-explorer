// City coordinates for globe points
export const cities = [
  { name: 'New York', lat: 40.7128, lng: -74.0060, temp: 22 },
  { name: 'London', lat: 51.5074, lng: -0.1278, temp: 15 },
  { name: 'Tokyo', lat: 35.6762, lng: 139.6503, temp: 28 },
  { name: 'Sydney', lat: -33.8688, lng: 151.2093, temp: 24 },
  { name: 'Dubai', lat: 25.2048, lng: 55.2708, temp: 38 },
  { name: 'Paris', lat: 48.8566, lng: 2.3522, temp: 17 },
  { name: 'Singapore', lat: 1.3521, lng: 103.8198, temp: 30 },
  { name: 'Mumbai', lat: 19.0760, lng: 72.8777, temp: 32 },
  { name: 'São Paulo', lat: -23.5505, lng: -46.6333, temp: 26 },
  { name: 'Cape Town', lat: -33.9249, lng: 18.4241, temp: 20 },
  { name: 'Moscow', lat: 55.7558, lng: 37.6173, temp: 8 },
  { name: 'Los Angeles', lat: 34.0522, lng: -118.2437, temp: 25 },
];

// Flight routes (arcs)
export const flights = [
  { from: 'New York', to: 'London' },
  { from: 'London', to: 'Tokyo' },
  { from: 'Dubai', to: 'Singapore' },
  { from: 'Sydney', to: 'Los Angeles' },
  { from: 'Paris', to: 'Mumbai' },
  { from: 'Tokyo', to: 'São Paulo' },
  { from: 'Moscow', to: 'Cape Town' },
  { from: 'Singapore', to: 'New York' },
];

// Convert lat/lng to 3D position
export const latLngToVector3 = (lat, lng, radius = 1) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return [
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  ];
};

// Chart data
export const weatherChartData = [
  { time: '00:00', temp: 18, humidity: 65 },
  { time: '04:00', temp: 16, humidity: 70 },
  { time: '08:00', temp: 20, humidity: 60 },
  { time: '12:00', temp: 26, humidity: 50 },
  { time: '16:00', temp: 28, humidity: 45 },
  { time: '20:00', temp: 23, humidity: 55 },
  { time: '24:00', temp: 19, humidity: 62 },
];

export const flightStats = [
  { name: 'Mon', flights: 4200, delays: 320 },
  { name: 'Tue', flights: 4500, delays: 280 },
  { name: 'Wed', flights: 4800, delays: 410 },
  { name: 'Thu', flights: 5100, delays: 380 },
  { name: 'Fri', flights: 5800, delays: 520 },
  { name: 'Sat', flights: 6200, delays: 450 },
  { name: 'Sun', flights: 5400, delays: 390 },
];
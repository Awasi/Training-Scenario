import fs from "node:fs/promises";
import path from "node:path";

const gtfsDir = path.resolve("gtfs_vta");
const outputPath = path.resolve("gtfs-data.js");

function parseCsv(text) {
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (quoted) {
      if (char === '"' && next === '"') {
        value += '"';
        index += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        value += char;
      }
    } else if (char === '"') {
      quoted = true;
    } else if (char === ",") {
      row.push(value);
      value = "";
    } else if (char === "\n") {
      row.push(value);
      rows.push(row);
      row = [];
      value = "";
    } else if (char !== "\r") {
      value += char;
    }
  }

  if (value || row.length) {
    row.push(value);
    rows.push(row);
  }

  const [headers, ...dataRows] = rows;
  return dataRows.filter((dataRow) => dataRow.length === headers.length).map((dataRow) => {
    return Object.fromEntries(headers.map((header, index) => [header, dataRow[index]]));
  });
}

async function readGtfsCsv(fileName) {
  const text = await fs.readFile(path.join(gtfsDir, fileName), "utf8");
  return parseCsv(text);
}

function routeMode(routeType) {
  if (routeType === "0") return "light rail";
  if (routeType === "3") return "bus";
  return "transit";
}

function routeDisplay(route) {
  const prefix = route.route_short_name ? `Route ${route.route_short_name}` : route.route_id;
  return `${prefix} ${route.route_long_name}`.trim();
}

function pickRepresentativeTrip(routeTrips) {
  const byDirection = new Map();
  for (const trip of routeTrips) {
    if (!byDirection.has(trip.direction_id)) {
      byDirection.set(trip.direction_id, trip);
    }
  }
  return Array.from(byDirection.values()).slice(0, 2);
}

const [feedInfoRows, routeRows, stopRows, tripRows, stopTimeRows] = await Promise.all([
  readGtfsCsv("feed_info.txt"),
  readGtfsCsv("routes.txt"),
  readGtfsCsv("stops.txt"),
  readGtfsCsv("trips.txt"),
  readGtfsCsv("stop_times.txt"),
]);

const stopsById = new Map(stopRows.map((stop) => [stop.stop_id, stop]));
const tripsByRoute = new Map();
for (const trip of tripRows) {
  if (!tripsByRoute.has(trip.route_id)) tripsByRoute.set(trip.route_id, []);
  tripsByRoute.get(trip.route_id).push(trip);
}

const stopTimesByTrip = new Map();
for (const stopTime of stopTimeRows) {
  if (!stopTimesByTrip.has(stopTime.trip_id)) stopTimesByTrip.set(stopTime.trip_id, []);
  stopTimesByTrip.get(stopTime.trip_id).push(stopTime);
}

const routes = routeRows.map((route) => {
  const representativeTrips = pickRepresentativeTrip(tripsByRoute.get(route.route_id) || []);
  const directions = representativeTrips.map((trip) => {
    const stopTimes = (stopTimesByTrip.get(trip.trip_id) || []).sort((a, b) => Number(a.stop_sequence) - Number(b.stop_sequence));
    const stopNames = stopTimes.map((stopTime) => stopsById.get(stopTime.stop_id)?.stop_name).filter(Boolean);
    const firstStop = stopNames[0] || "";
    const lastStop = stopNames[stopNames.length - 1] || "";
    const sampleStops = stopNames.filter((_, index) => index === 0 || index === stopNames.length - 1 || index % Math.max(1, Math.floor(stopNames.length / 4)) === 0).slice(0, 6);
    return {
      headsign: trip.trip_headsign,
      directionId: trip.direction_id,
      firstStop,
      lastStop,
      sampleStops,
      stopCount: stopNames.length,
    };
  });

  return {
    id: route.route_id,
    shortName: route.route_short_name,
    longName: route.route_long_name,
    mode: routeMode(route.route_type),
    url: route.route_url,
    color: route.route_color,
    textColor: route.route_text_color,
    display: routeDisplay(route),
    directions,
  };
});

const routeByShortName = Object.fromEntries(routes.filter((route) => route.shortName).map((route) => [route.shortName.replace(/^Rapid\s+/i, ""), route]));
const routeById = Object.fromEntries(routes.map((route) => [route.id, route]));
const feedInfo = feedInfoRows[0] || {};

const snapshot = {
  sourceUrl: "https://gtfs.vta.org/gtfs_vta.zip",
  generatedAt: new Date().toISOString(),
  feedInfo: {
    publisher: feedInfo.feed_publisher_name,
    url: feedInfo.feed_publisher_url,
    language: feedInfo.feed_lang,
    startDate: feedInfo.feed_start_date,
    endDate: feedInfo.feed_end_date,
    version: feedInfo.feed_version,
    contactEmail: feedInfo.feed_contact_email,
  },
  routeCount: routes.length,
  stopCount: stopRows.length,
  routes,
  routeByShortName,
  routeById,
};

await fs.writeFile(outputPath, `window.gtfsData = ${JSON.stringify(snapshot, null, 2)};\n`, "utf8");
console.log(`Wrote ${outputPath} with ${routes.length} routes and ${stopRows.length} stops.`);

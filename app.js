const customers = [
  {
    name: "Maya Chen",
    age: 34,
    riderType: "Daily commuter",
    fare: "Monthly pass on mobile wallet",
    communication: "Direct, detail-oriented",
    context: "Needs to reach work before a shift handoff",
  },
  {
    name: "Luis Alvarez",
    age: 47,
    riderType: "Occasional rider",
    fare: "Stored-value card",
    communication: "Patient but easily overwhelmed by conflicting information",
    context: "Traveling with two children to a medical appointment",
  },
  {
    name: "Denise Morgan",
    age: 69,
    riderType: "Senior rider",
    fare: "Reduced fare card",
    communication: "Polite, cautious, asks for confirmation",
    context: "Returning from a downtown appointment during evening service",
  },
  {
    name: "Ari Patel",
    age: 22,
    riderType: "Student",
    fare: "Student pass",
    communication: "Fast-paced, uses app screenshots as evidence",
    context: "Trying to make a connection to campus before an exam",
  },
  {
    name: "Renee Brooks",
    age: 41,
    riderType: "Paratransit customer",
    fare: "Prepaid paratransit account",
    communication: "Clear about needs, frustrated when dignity is not centered",
    context: "Coordinating a return trip after a clinic visit",
  },
];

const vtaSurvey = {
  source: "VTA Multi-Topic Rider Survey, conducted February 28 - April 17, 2024; total n = 2,391.",
  riderFrequency: [
    ["Daily rider", 39.9],
    ["Weekly rider", 31.6],
    ["Rides a few times a month", 14.5],
    ["Rides a few times a year", 11.3],
    ["Rides less than yearly", 2.3],
  ],
  riderSegment: [
    ["High frequency rider", 22.5],
    ["Medium frequency rider", 53.8],
    ["Low frequency rider", 21.2],
    ["Potential future rider", 2.4],
  ],
  fareCategory: [
    ["Adult fare", 79.8],
    ["Senior fare", 9.3],
    ["Disabled/Medicare RTC fare", 5.9],
    ["Youth fare", 2.6],
    ["Fare category not shared", 2.3],
  ],
  payment: [
    ["Physical Clipper card", 58.7],
    ["Clipper mobile card", 27.4],
    ["Cash or coins", 23.3],
    ["SmartPass", 10.9],
    ["Credit card", 6.5],
    ["Ticket vending machine", 6.1],
    ["VTA paper pass", 4.4],
  ],
  tripReason: [
    ["Work, business appointments, or looking for work", 57.4],
    ["Fun, recreation, or social events", 36.4],
    ["Shopping or errands", 30.1],
    ["Special events", 25.5],
    ["School, education, or training", 25.1],
    ["Medical or healthcare appointments", 17.8],
    ["Airport", 13.6],
    ["Social services", 9.4],
  ],
  infoSource: [
    ["VTA website", 51.9],
    ["Transit smartphone app", 35.4],
    ["VTA online timetable", 26.9],
    ["Station announcements or digital displays", 21],
    ["Printed timetable", 15.2],
    ["Google, Apple, or trip-planning maps", 9],
    ["Email", 7.1],
  ],
  vehicleAccess: [
    ["Has vehicle access at home", 55],
    ["No vehicle access at home", 40.9],
    ["Vehicle access not shared", 4.1],
  ],
  commonRoutes: [
    ["Route 22", 29],
    ["Route 23", 18.1],
    ["Route 25", 12.5],
    ["Route 26", 9.2],
    ["Route 21", 6.5],
    ["Route 27", 5.8],
    ["Route 20", 4.3],
    ["Route 31", 3.5],
    ["Route 40", 3.5],
  ],
  transferPartner: [
    ["BART", 51.6],
    ["Caltrain", 49.7],
    ["Muni", 11.7],
    ["Highway 17 Express", 11.6],
    ["SamTrans", 9.3],
    ["ACE Train", 8.2],
    ["Capitol Corridor", 7.3],
  ],
  painPoint: [
    ["On-time performance concern", 16.9],
    ["After-dark safety concern", 26.1],
    ["Transfer ease concern", 13.7],
    ["Trip-planning information concern", 13.9],
    ["Fare-payment concern", 6.2],
    ["Distance-to-destination concern", 15.9],
  ],
};

const agencyData = {
  name: "Santa Clara Valley Transportation Authority (VTA)",
  lastChecked: "April 26, 2026",
  sources: {
    routes: "https://www.vta.org/go/routes",
    fares: "https://www.vta.org/go/fares",
    serviceAlerts: "https://www.vta.org/go/service-alerts",
    accessibility: "https://www.vta.org/programs/accessibility/accessible-information",
  },
  routes: {
    "20": { category: "Local", name: "Milpitas BART - Sunnyvale TC" },
    "21": { category: "Local", name: "Stanford Shopping Ctr - Santa Clara TC" },
    "22": { category: "Frequent", name: "Palo Alto TC - Eastridge" },
    "23": { category: "Frequent", name: "De Anza Coll - Alum Rock via Stevens Crk" },
    "25": { category: "Frequent", name: "De Anza Coll - Alum Rock via Valley Med" },
    "26": { category: "Frequent", name: "West Valley Coll - Eastridge" },
    "27": { category: "Local", name: "Winchester Stn - Santa Teresa Stn" },
    "31": { category: "Local", name: "Evergreen Valley Coll - Eastridge" },
    "40": { category: "Local", name: "Foothill Coll - Mtn View TC via N. Bayshore" },
    "57": { category: "Frequent", name: "Old Ironsides Stn - West Valley Coll" },
    "60": { category: "Frequent", name: "Milpitas BART - Winchester Stn via SJC Airport" },
    "68": { category: "Frequent", name: "San Jose Diridon - Gilroy TC" },
    "522": { category: "Rapid", name: "Palo Alto TC - Eastridge Rapid" },
    "523": { category: "Rapid", name: "San Jose State - Lockheed Martin via De Anza" },
  },
  lightRail: [
    "Blue Line Baypointe - Santa Teresa",
    "Green Line Old Ironsides - Winchester",
    "Orange Line Mountain View - Alum Rock",
  ],
  fareFacts: {
    adult: "Adult local single ride is $2.50.",
    express: "Adult express single ride is $5.00.",
    seniorDisabled: "Senior and disabled single ride is $1.00.",
    youth: "Youth single ride is $1.25.",
    clipperTransfers: "Clipper single-ride payment is valid for 2 hours of free transfers across VTA buses and light rail; express service requires express fare.",
    cash: "VTA fare guidance asks cash riders to have exact change ready when boarding.",
  },
  serviceAlertExamples: [
    "Temporary bus stop closure",
    "Bus stop alert",
    "Route reroute due to construction",
    "Station escalator out of service",
    "Service changes effective on a stated date",
  ],
  accessibilityFacts: [
    "VTA provides public information in accessible formats, including large print, Braille, or audio, upon request at no cost.",
    "Bus and light rail schedule and destination information is available through Customer Service.",
    "Many bus stop poles at stops and transit centers include raised letters and Braille that read Bus.",
    "VTA buses audibly announce the line number and destination when doors open at bus stops.",
    "Inside VTA buses, digital message boards and announcements provide cross-street and significant-stop information.",
  ],
  lostItemFacts: [
    "VTA lost item guidance directs customers to call 408-321-2300 to check whether an item has been turned in.",
    "Most found items are kept for 90 days, except cash and medication.",
  ],
  customerService: {
    phone: "408-321-2300",
    downtownCenter: "2 North Market Street, San Jose, CA 95113; Monday-Friday 9:00 AM to 6:00 PM",
    headquarters: "3331 North First Street, San Jose, CA 95134; Monday-Friday 8:30 AM to 4:00 PM",
  },
  gtfs: window.gtfsData || null,
};

const scenarios = [
  {
    issue: "delay",
    title: "Missed connection after a service delay",
    brief: "The customer says a delay caused them to miss a transfer and arrive late. They want options, a clear explanation, and help deciding whether a refund or service credit applies.",
    opening: "I planned this trip exactly the way your app told me to, but the bus sat there for twenty minutes and now I have missed my connection. What am I supposed to do?",
    facts: [
      "The original trip included one timed transfer.",
      "The first vehicle departed 18 minutes late because of a mechanical inspection.",
      "The next available connection is scheduled in 24 minutes.",
    ],
    hidden: [
      "The customer is more worried about being blamed at work than about the fare.",
      "They checked the app twice and saw two different arrival predictions.",
    ],
    goals: [
      "Acknowledge the disruption without overpromising fault or compensation.",
      "Confirm the trip details and identify the best next route.",
      "Explain the refund or credit policy in plain language.",
    ],
    rubric: [
      "Shows empathy before moving into policy.",
      "Uses specific times, route names, and transfer points.",
      "Offers a next step the customer can act on immediately.",
    ],
    turns: [
      "Customer asks why the app was wrong.",
      "Customer interrupts when the agent starts with policy language.",
      "Customer asks for proof they can show their employer.",
    ],
    turnPools: {
      openingFollowUps: [
        "Customer says the app showed the first vehicle arriving on time until the minute it was supposed to arrive.",
        "Customer says they built in extra time and still missed the transfer.",
        "Customer asks whether the operator reported the delay or if the system simply stopped updating.",
        "Customer says the station display and phone app showed different arrival information.",
        "Customer asks why no alert appeared before they boarded.",
      ],
      emotionEscalations: [
        "Customer says this happens every week and nobody at the agency seems to care.",
        "Customer interrupts when the agent starts explaining policy before acknowledging the missed connection.",
        "Customer says they are going to be written up at work because of this delay.",
        "Customer asks for a supervisor because they do not trust another standard answer.",
        "Customer says they paid for reliable service and wants the agency to take responsibility.",
      ],
      clarifyingAnswers: [
        "Customer gives the route number but is unsure whether the transfer stop name is correct.",
        "Customer says the app showed a different connecting route than the one posted at the stop.",
        "Customer remembers the vehicle was crowded but cannot see the vehicle number in their screenshot.",
        "Customer says they transferred at a large station and may have waited on the wrong side of the platform.",
        "Customer says they started the trip from a stop they do not normally use.",
      ],
      newComplications: [
        "Customer now needs an option that avoids a long walk because they are carrying a heavy bag.",
        "Customer reveals they are traveling with a child and cannot wait outside for long.",
        "Customer says the next trip shown in the app disappeared while they were talking.",
        "Customer says their phone battery is low and they need the next steps repeated clearly.",
        "Customer now needs to connect with another transit agency and is worried the transfer fare will not work.",
      ],
      resolutionPushback: [
        "Customer rejects the first alternate route because it arrives too late for their appointment.",
        "Customer asks why a service credit is not automatic when the agency caused the missed transfer.",
        "Customer says written directions are not enough and asks for a text or case number.",
        "Customer asks whether the delay can be verified in the agency system right now.",
        "Customer pushes back when the agent cannot guarantee the next vehicle will be on time.",
      ],
      closingQuestions: [
        "Customer asks for proof of the delay they can show their employer.",
        "Customer asks what case number they should reference if they call back.",
        "Customer asks whether they qualify for a refund or service credit.",
        "Customer asks how to prevent this from happening on the return trip.",
        "Customer asks when they will receive a follow-up and who will contact them.",
      ],
    },
  },
  {
    issue: "fare",
    title: "Fare charge dispute at a validator",
    brief: "The customer believes they were charged twice while boarding. They need a calm review of transaction timing, next steps for a fare investigation, and instructions for completing the trip.",
    opening: "Your machine charged me twice, and the operator just waved me through like it was not their problem.",
    facts: [
      "The customer tapped the same card twice within two minutes.",
      "The second tap may show as pending before it drops off.",
      "The customer is currently mid-trip and worried about being cited.",
    ],
    hidden: [
      "The customer has received a fare citation before and is embarrassed.",
      "They do not know the difference between pending and posted charges.",
    ],
    goals: [
      "Explain pending charges without sounding dismissive.",
      "Give clear proof-of-payment guidance for the current trip.",
      "Document the transaction details needed for follow-up.",
    ],
    rubric: [
      "Avoids blaming the customer for tapping twice.",
      "Separates immediate travel guidance from later account review.",
      "Confirms the customer understands what to watch for on their statement.",
    ],
    turns: [
      "Customer says they cannot afford to wait for a pending charge to disappear.",
      "Customer asks whether the operator will get in trouble.",
      "Customer wants a case number before ending the conversation.",
    ],
  },
  {
    issue: "lost-item",
    title: "Lost item with urgent personal impact",
    brief: "The customer left a backpack on board and needs help filing a report. The interaction tests privacy, urgency, and setting expectations about recovery timelines.",
    opening: "I left my backpack on the train, and my medication is inside. I need somebody to stop that train now.",
    facts: [
      "The item was last seen under a seat near the rear door.",
      "The customer exited 12 minutes ago at Central Station.",
      "The train is still in service and cannot be searched until a safe opportunity.",
    ],
    hidden: [
      "The medication is time-sensitive, but the customer can contact a pharmacy if needed.",
      "The backpack also contains a work laptop with personal data.",
    ],
    goals: [
      "Treat the medical concern as urgent while staying realistic.",
      "Collect identifying details without requesting unnecessary private information.",
      "Explain when and how lost property staff will follow up.",
    ],
    rubric: [
      "Balances urgency with operational safety.",
      "Collects route, vehicle, station, time, and item description.",
      "Recommends appropriate outside steps for urgent medication needs.",
    ],
    turns: [
      "Customer demands the agent call the train operator immediately.",
      "Customer begins sharing sensitive medical details.",
      "Customer asks whether the agency will pay for replacement medication.",
    ],
  },
  {
    issue: "accessibility",
    title: "Elevator outage affecting an accessible route",
    brief: "The customer uses a mobility device and has arrived at a station with an elevator outage. They need a respectful alternative and a service recovery path.",
    opening: "The elevator is out again. I cannot use the stairs, and the sign just says to check the app. That does not help me from the platform.",
    facts: [
      "The elevator outage began 35 minutes ago.",
      "The nearest accessible station is two stops away.",
      "A shuttle bridge can be requested, but wait times vary.",
    ],
    hidden: [
      "The customer has had this happen at the same station before.",
      "They are concerned about being isolated on the platform after dark.",
    ],
    goals: [
      "Center the customer's autonomy and safety.",
      "Offer accessible alternatives with realistic timing.",
      "Capture the outage report and escalation details.",
    ],
    rubric: [
      "Uses person-first, respectful language.",
      "Does not suggest inaccessible alternatives as equivalent options.",
      "Confirms the customer has a safe place to wait.",
    ],
    turns: [
      "Customer says the agency never gives accurate outage alerts.",
      "Customer rejects an option that would add more than 40 minutes.",
      "Customer asks to speak to a supervisor.",
    ],
  },
  {
    issue: "safety",
    title: "Safety concern reported during an active trip",
    brief: "The customer reports behavior that made them feel unsafe. The agent must gather actionable details, avoid escalating risk, and route the report appropriately.",
    opening: "I am on the bus right now and someone is yelling at passengers near the front. I do not want them to hear me talking to you.",
    facts: [
      "The customer is currently on board.",
      "The vehicle number is visible near the front door.",
      "The customer can text but may not be able to speak freely.",
    ],
    hidden: [
      "The customer is unsure whether the behavior is a crime or a disturbance.",
      "They are afraid of drawing attention by moving seats.",
    ],
    goals: [
      "Prioritize immediate safety and low-risk communication.",
      "Collect route, direction, vehicle, location, and description.",
      "Follow the agency safety escalation process.",
    ],
    rubric: [
      "Avoids asking the customer to confront anyone.",
      "Keeps questions short and necessary.",
      "Explains what will happen next without creating false certainty.",
    ],
    turns: [
      "Customer can only respond with short messages.",
      "Customer does not know the exact cross street.",
      "Customer asks if they should get off at the next stop.",
    ],
  },
  {
    issue: "trip-planning",
    title: "Complex trip planning under time pressure",
    brief: "The customer needs a route that accounts for transfers, walking distance, fare media, and timing. The interaction tests clarity and confirmation.",
    opening: "I do not usually ride transit, but my car will not start and I have to get across town by 3:15. Please make this simple.",
    facts: [
      "The customer has a smartphone but no transit app installed.",
      "The destination is near a stop with limited midday service.",
      "One option is faster but requires a long walk.",
    ],
    hidden: [
      "The customer is carrying a heavy bag.",
      "They are nervous about transferring at a large station.",
    ],
    goals: [
      "Ask only the questions needed to build a workable route.",
      "Offer a primary route and one backup.",
      "Confirm fare, platform, transfer, and arrival details.",
    ],
    rubric: [
      "Breaks the trip into simple steps.",
      "Checks mobility, walking, luggage, and payment constraints.",
      "Confirms the customer can repeat the plan back.",
    ],
    turns: [
      "Customer mixes up inbound and outbound directions.",
      "Customer asks whether they can pay cash.",
      "Customer gets anxious about missing the transfer.",
    ],
  },
  {
    issue: "complaint",
    title: "Complaint about operator conduct",
    brief: "The customer reports a negative interaction with an operator. The agent needs to de-escalate, document specifics, and explain the complaint process.",
    opening: "Your driver closed the door while I was walking up and then looked right at me. I want a formal complaint filed.",
    facts: [
      "The customer was at the stop before the scheduled departure time.",
      "The route has frequent bunching during peak hours.",
      "The agency can investigate with route, time, direction, and vehicle details.",
    ],
    hidden: [
      "The customer felt humiliated in front of other riders.",
      "They mostly want assurance the complaint will not disappear.",
    ],
    goals: [
      "Let the customer describe the event without arguing operational reasons.",
      "Collect objective details for investigation.",
      "Set expectations for response timelines and confidentiality.",
    ],
    rubric: [
      "Does not defend the operator before facts are gathered.",
      "Documents observable details and customer impact.",
      "Explains the complaint tracking process clearly.",
    ],
    turns: [
      "Customer asks for the operator's name.",
      "Customer threatens to post the video online.",
      "Customer asks when they will hear back.",
    ],
  },
];

const accessibilityConsiderations = [
  "Customer uses a mobility device and needs step-free routing.",
  "Customer has low vision and needs landmarks rather than visual-only directions.",
  "Customer is hard of hearing and prefers written confirmation.",
  "Customer has limited stamina and needs shorter walking distances.",
];

const policyEdges = [
  "Refund eligibility depends on whether the charge has posted.",
  "The customer's request involves personally identifiable information.",
  "A supervisor callback is available, but not immediate.",
  "Agency policy allows documentation but not a guaranteed outcome.",
];

const tones = {
  calm: "Calm and cooperative",
  confused: "Confused and needs step-by-step guidance",
  stressed: "Stressed and time-sensitive",
  angry: "Angry and skeptical of the agency",
  anxious: "Anxious and seeking reassurance",
};

const complexityLabels = {
  1: "Simple",
  2: "Routine",
  3: "Standard",
  4: "Complex",
  5: "High stakes",
};

const roleplayGuidance = {
  delay: {
    coach: "Listen for whether the trainee acknowledges the missed connection before explaining timing or policy.",
    behavior: "Name the impact, confirm route and transfer details, and give one immediate travel option.",
  },
  fare: {
    coach: "Watch for blame language. The trainee should separate the current travel concern from the later account review.",
    behavior: "Explain pending versus posted charges and document the transaction details needed for follow-up.",
  },
  "lost-item": {
    coach: "Keep the trainee focused on urgency, privacy, and realistic recovery steps.",
    behavior: "Collect location, vehicle, time, and item details while recommending appropriate urgent outside steps.",
  },
  accessibility: {
    coach: "Listen for dignity and autonomy. Inaccessible alternatives should not be framed as equivalent.",
    behavior: "Offer accessible options with realistic timing and confirm the customer has a safe place to wait.",
  },
  safety: {
    coach: "Keep questions short and avoid asking the customer to confront anyone or draw attention.",
    behavior: "Prioritize immediate safety, collect actionable location details, and explain the escalation path.",
  },
  "trip-planning": {
    coach: "Look for simple sequencing. The trainee should not overwhelm the customer with every possible route.",
    behavior: "Give a primary route, one backup, and confirm payment, transfer, and arrival details.",
  },
  complaint: {
    coach: "Watch for premature defense of the agency or operator before the facts are collected.",
    behavior: "Acknowledge the experience, document objective details, and explain the complaint tracking process.",
  },
};

const delayHiddenDetailTriggers = {
  "The customer is more worried about being blamed at work than about the fare.": "desired-resolution",
  "They checked the app twice and saw two different arrival predictions.": "route-time",
  "Underlying rider concern: on-time performance concern.": "desired-resolution",
  "The customer has already repeated the story to another department.": "prior-contact",
};

const els = {
  issue: document.querySelector("#issue"),
  mode: document.querySelector("#mode"),
  channel: document.querySelector("#channel"),
  tone: document.querySelector("#tone"),
  complexity: document.querySelector("#complexity"),
  accessibility: document.querySelector("#accessibility"),
  policy: document.querySelector("#policy"),
  complexityLabel: document.querySelector("#complexity-label"),
  generate: document.querySelector("#generate"),
  copy: document.querySelector("#copy"),
  reset: document.querySelector("#reset"),
  scenarioId: document.querySelector("#scenario-id"),
  title: document.querySelector("#scenario-title"),
  difficulty: document.querySelector("#difficulty"),
  cardView: document.querySelector("#card-view"),
  roleplayView: document.querySelector("#roleplay-view"),
  cardSection: document.querySelector("#scenario-card-section"),
  roleplaySection: document.querySelector("#roleplay-section"),
  profile: document.querySelector("#customer-profile"),
  brief: document.querySelector("#training-brief"),
  surveyBasis: document.querySelector("#survey-basis"),
  opening: document.querySelector("#customer-opening"),
  facts: document.querySelector("#known-facts"),
  hidden: document.querySelector("#hidden-details"),
  goals: document.querySelector("#agent-goals"),
  rubric: document.querySelector("#rubric"),
  turns: document.querySelector("#roleplay-turns"),
  roleplayProgress: document.querySelector("#roleplay-progress"),
  roleplayState: document.querySelector("#roleplay-state"),
  roleplayHeading: document.querySelector("#roleplay-heading"),
  roleplayCustomerLine: document.querySelector("#roleplay-customer-line"),
  roleplayCoachNote: document.querySelector("#roleplay-coach-note"),
  roleplayExpectedBehavior: document.querySelector("#roleplay-expected-behavior"),
  roleplayRevealed: document.querySelector("#roleplay-revealed"),
  triggerPanel: document.querySelector("#trigger-panel"),
  triggerFeedback: document.querySelector("#trigger-feedback"),
  triggerButtons: document.querySelectorAll("[data-trigger]"),
  roleplayPrev: document.querySelector("#roleplay-prev"),
  roleplayNext: document.querySelector("#roleplay-next"),
  roleplayReveal: document.querySelector("#roleplay-reveal"),
  roleplayRestart: document.querySelector("#roleplay-restart"),
  debriefPanel: document.querySelector("#debrief-panel"),
  debriefGoals: document.querySelector("#debrief-goals"),
  debriefRubric: document.querySelector("#debrief-rubric"),
  debriefRevealed: document.querySelector("#debrief-revealed"),
  debriefUnrevealed: document.querySelector("#debrief-unrevealed"),
  caseNotePrompt: document.querySelector("#case-note-prompt"),
};

let scenarioCount = 1;
let currentScenarioText = "";
let currentScenario = null;
let activeView = "card";
let roleplayTurnIndex = 0;
let revealedHiddenDetailIndexes = [];
let isDebrief = false;

function pick(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function weightedPick(items) {
  const total = items.reduce((sum, item) => sum + item[1], 0);
  let cursor = Math.random() * total;
  for (const [label, weight] of items) {
    cursor -= weight;
    if (cursor <= 0) return label;
  }
  return items[items.length - 1][0];
}

function getRouteNumber(routeLabel) {
  const match = routeLabel.match(/\d+/);
  return match ? match[0] : null;
}

function getAgencyRoute(routeLabel) {
  const routeNumber = getRouteNumber(routeLabel);
  if (!routeNumber) return null;
  const gtfsRoute = agencyData.gtfs?.routeByShortName?.[routeNumber];
  if (gtfsRoute) return gtfsRoute;
  return agencyData.routes[routeNumber] ? { number: routeNumber, ...agencyData.routes[routeNumber] } : null;
}

function formatAgencyRoute(routeLabel) {
  const route = getAgencyRoute(routeLabel);
  if (!route) return routeLabel;
  if (route.display) return route.display;
  return `Route ${route.number} ${route.name} (${route.category})`;
}

function getFareReference(fareCategory, payment) {
  if (fareCategory.includes("Senior") || fareCategory.includes("Disabled")) return agencyData.fareFacts.seniorDisabled;
  if (fareCategory.includes("Youth")) return agencyData.fareFacts.youth;
  if (payment.includes("Cash")) return `${agencyData.fareFacts.adult} ${agencyData.fareFacts.cash}`;
  if (payment.includes("Clipper")) return `${agencyData.fareFacts.adult} ${agencyData.fareFacts.clipperTransfers}`;
  return agencyData.fareFacts.adult;
}

function buildAgencyContext(scenario, surveyProfile, mode) {
  const gtfsRoute = getAgencyRoute(surveyProfile.route);
  const lightRailLine = pick(["Blue", "Green", "Orange"]);
  const lightRailRoute = agencyData.gtfs?.routes?.find((route) => route.mode === "light rail" && route.shortName.includes(lightRailLine));
  const selectedRoute = mode === "light rail" ? lightRailRoute : gtfsRoute;
  const route = selectedRoute?.display || (mode === "light rail" ? pick(agencyData.lightRail) : formatAgencyRoute(surveyProfile.route));
  const direction = selectedRoute?.directions?.length ? pick(selectedRoute.directions) : null;
  const alertType = pick(agencyData.serviceAlertExamples);
  return {
    route,
    gtfsRoute: selectedRoute,
    direction,
    alertType,
    fareReference: getFareReference(surveyProfile.fareCategory, surveyProfile.payment),
    accessibilityFact: pick(agencyData.accessibilityFacts),
    lostItemFact: pick(agencyData.lostItemFacts),
    sourceSummary: agencyData.gtfs ? `${agencyData.name} website snapshot checked ${agencyData.lastChecked}; GTFS ${agencyData.gtfs.feedInfo.version}, service ${agencyData.gtfs.feedInfo.startDate}-${agencyData.gtfs.feedInfo.endDate}` : `${agencyData.name} website snapshot checked ${agencyData.lastChecked}`,
  };
}

function buildAgencyFacts(scenario, agencyContext) {
  const facts = [];
  if (["delay", "trip-planning", "complaint"].includes(scenario.issue)) {
    facts.push(`Official VTA route context: ${agencyContext.route}.`);
  }
  if (agencyContext.direction && ["delay", "trip-planning", "complaint"].includes(scenario.issue)) {
    facts.push(`GTFS direction context: ${agencyContext.direction.firstStop} to ${agencyContext.direction.lastStop}, headsign ${agencyContext.direction.headsign}.`);
    facts.push(`Representative GTFS stops: ${agencyContext.direction.sampleStops.join(", ")}.`);
  }
  if (["delay", "accessibility", "trip-planning"].includes(scenario.issue)) {
    facts.push(`Agency website alert pattern to consider: ${agencyContext.alertType}.`);
  }
  if (scenario.issue === "fare") {
    facts.push(`Agency fare reference: ${agencyContext.fareReference}`);
  }
  if (scenario.issue === "accessibility") {
    facts.push(`Agency accessibility reference: ${agencyContext.accessibilityFact}`);
  }
  if (scenario.issue === "lost-item") {
    facts.push(`Agency lost item reference: ${agencyContext.lostItemFact}`);
  }
  if (scenario.issue === "safety") {
    facts.push(`Customer service reference: VTA Customer Service phone is ${agencyData.customerService.phone}.`);
  }
  return facts;
}

function buildSurveyProfile(scenario) {
  const profile = {
    frequency: weightedPick(vtaSurvey.riderFrequency),
    segment: weightedPick(vtaSurvey.riderSegment),
    fareCategory: weightedPick(vtaSurvey.fareCategory),
    payment: weightedPick(vtaSurvey.payment),
    tripReason: weightedPick(vtaSurvey.tripReason),
    infoSource: weightedPick(vtaSurvey.infoSource),
    vehicleAccess: weightedPick(vtaSurvey.vehicleAccess),
    route: weightedPick(vtaSurvey.commonRoutes),
    transferPartner: weightedPick(vtaSurvey.transferPartner),
    painPoint: weightedPick(vtaSurvey.painPoint),
  };

  if (scenario.issue === "fare") profile.painPoint = "Fare-payment concern";
  if (scenario.issue === "delay") profile.painPoint = "On-time performance concern";
  if (scenario.issue === "safety") profile.painPoint = "After-dark safety concern";
  if (scenario.issue === "trip-planning") profile.painPoint = "Trip-planning information concern";
  if (scenario.issue === "accessibility") profile.fareCategory = "Disabled/Medicare RTC fare";
  if (scenario.issue === "accessibility") profile.tripReason = "Medical or healthcare appointments";
  if (scenario.issue === "trip-planning") profile.infoSource = "VTA website";
  profile.routeDisplay = formatAgencyRoute(profile.route);

  return profile;
}

function pickScenario() {
  const issue = els.issue.value;
  const pool = issue === "any" ? scenarios : scenarios.filter((scenario) => scenario.issue === issue);
  return pick(pool);
}

function pickTone() {
  if (els.tone.value === "any") {
    return {
      key: "mixed",
      label: "Mixed",
    };
  }
  const key = els.tone.value;
  return {
    key,
    label: tones[key],
  };
}

function getTurnCount(complexity) {
  if (complexity <= 2) return 3;
  if (complexity === 3) return 4;
  return 5;
}

function pickUniqueFromPool(pool, usedTurns) {
  const available = pool.filter((turn) => !usedTurns.has(turn));
  const selected = pick(available.length ? available : pool);
  usedTurns.add(selected);
  return selected;
}

function buildDelayCategoryPlan(toneKey, turnCount) {
  const plans = {
    angry: ["emotionEscalations", "openingFollowUps", "resolutionPushback", "emotionEscalations", "closingQuestions"],
    confused: ["openingFollowUps", "clarifyingAnswers", "newComplications", "clarifyingAnswers", "closingQuestions"],
    anxious: ["openingFollowUps", "emotionEscalations", "newComplications", "resolutionPushback", "closingQuestions"],
    stressed: ["openingFollowUps", "newComplications", "resolutionPushback", "emotionEscalations", "closingQuestions"],
    calm: ["clarifyingAnswers", "openingFollowUps", "newComplications", "resolutionPushback", "closingQuestions"],
  };
  const balanced = ["openingFollowUps", "clarifyingAnswers", "emotionEscalations", "newComplications", "closingQuestions"];
  return (plans[toneKey] || balanced).slice(0, turnCount);
}

function buildRoleplayTurns(scenario, toneKey, complexity) {
  if (scenario.issue !== "delay" || !scenario.turnPools) {
    return [...scenario.turns];
  }

  const usedTurns = new Set();
  return buildDelayCategoryPlan(toneKey, getTurnCount(complexity)).map((category) => {
    return pickUniqueFromPool(scenario.turnPools[category], usedTurns);
  });
}

function getHiddenDetailTrigger(issue, detail) {
  if (issue !== "delay") return null;
  if (detail.startsWith("The customer may need to connect with ")) return "route-time";
  if (detail.startsWith("Refund eligibility")) return "payment";
  if (detail.startsWith("Agency policy")) return "desired-resolution";
  if (detail.startsWith("A supervisor callback")) return "prior-contact";
  if (detail.includes("personally identifiable information")) return "desired-resolution";
  return delayHiddenDetailTriggers[detail] || null;
}

function buildHiddenDetailMeta(issue, hiddenDetails) {
  return hiddenDetails.map((detail) => ({
    text: detail,
    trigger: getHiddenDetailTrigger(issue, detail),
  }));
}

function revealHiddenDetailByIndex(index) {
  if (index < 0 || revealedHiddenDetailIndexes.includes(index)) return false;
  revealedHiddenDetailIndexes.push(index);
  return true;
}

function setList(element, items) {
  element.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    element.appendChild(li);
  });
}

function setEmptyList(element, message) {
  element.innerHTML = "";
  const li = document.createElement("li");
  li.textContent = message;
  li.className = "muted-item";
  element.appendChild(li);
}

function getRoleplayGuidance(issue, rubric, turnIndex) {
  const fallback = {
    coach: "Listen for empathy, accuracy, and whether the trainee keeps the interaction moving toward a clear next step.",
    behavior: rubric[turnIndex % rubric.length] || "Acknowledge, clarify, and offer a concrete next step.",
  };
  const guidance = roleplayGuidance[issue] || fallback;
  return {
    coachNote: `${guidance.coach} Rubric focus: ${rubric[turnIndex % rubric.length] || "clear next step"}`,
    expectedBehavior: guidance.behavior,
  };
}

function buildCaseNotePrompt(scenario) {
  return `Write a concise case note for ${scenario.id}: include customer concern, route or mode, timing/location details, facts confirmed, action taken, escalation or follow-up path, and any unresolved customer need.`;
}

function setProfile(customer, scenario, mode, tone, surveyProfile) {
  const profile = {
    Name: `${customer.name}, ${customer.age}`,
    "Rider type": customer.riderType,
    "Transit mode": mode === "any" ? pick(["bus", "light rail", "paratransit"]) : mode,
    "Survey segment": surveyProfile.segment,
    Frequency: surveyProfile.frequency,
    "Fare category": surveyProfile.fareCategory,
    Payment: surveyProfile.payment,
    "Typical route": surveyProfile.routeDisplay,
    Channel: els.channel.options[els.channel.selectedIndex].text,
    Tone: tone,
    Context: `${customer.context}. Typical trip purpose: ${surveyProfile.tripReason}.`,
  };

  els.profile.innerHTML = "";
  Object.entries(profile).forEach(([key, value]) => {
    const dt = document.createElement("dt");
    const dd = document.createElement("dd");
    dt.textContent = key;
    dd.textContent = value;
    els.profile.append(dt, dd);
  });
}

function buildScenarioText(scenario) {
  const revealed = revealedHiddenDetailIndexes.map((index) => scenario.hidden[index]);
  const unrevealed = scenario.hidden.filter((_, index) => !revealedHiddenDetailIndexes.includes(index));

  return [
    `${scenario.id}: ${scenario.title}`,
    `Difficulty: ${scenario.difficulty}`,
    "",
    `Customer: ${scenario.customer.name}, ${scenario.customer.age}`,
    `Rider type: ${scenario.customer.riderType}`,
    `Survey segment: ${scenario.surveyProfile.segment}`,
    `Frequency: ${scenario.surveyProfile.frequency}`,
    `Fare category: ${scenario.surveyProfile.fareCategory}`,
    `Payment: ${scenario.surveyProfile.payment}`,
    `Typical route: ${scenario.surveyProfile.routeDisplay}`,
    `Trip reason: ${scenario.surveyProfile.tripReason}`,
    `Info source: ${scenario.surveyProfile.infoSource}`,
    `Vehicle access: ${scenario.surveyProfile.vehicleAccess}`,
    `Pain point: ${scenario.surveyProfile.painPoint}`,
    `Tone: ${scenario.tone}`,
    `Channel: ${scenario.channelLabel}`,
    `Agency source: ${scenario.agencyContext.sourceSummary}`,
    `Agency route/context: ${scenario.agencyContext.route}`,
    scenario.agencyContext.direction ? `GTFS direction: ${scenario.agencyContext.direction.firstStop} to ${scenario.agencyContext.direction.lastStop}, headsign ${scenario.agencyContext.direction.headsign}` : "",
    "",
    `Brief: ${scenario.brief}`,
    "",
    `Opening: "${scenario.opening}"`,
    "",
    "Known facts:",
    ...scenario.facts.map((fact) => `- ${fact}`),
    "",
    "Hidden details:",
    ...scenario.hidden.map((item) => `- ${item}`),
    "",
    "Agent goals:",
    ...scenario.goals.map((goal) => `- ${goal}`),
    "",
    "Evaluation rubric:",
    ...scenario.rubric.map((item) => `- ${item}`),
    "",
    "Roleplay turns:",
    ...scenario.turns.map((turn, index) => {
      const guidance = getRoleplayGuidance(scenario.issue, scenario.rubric, index);
      return `${index + 1}. ${turn}\n   Coach note: ${guidance.coachNote}\n   Expected behavior: ${guidance.expectedBehavior}`;
    }),
    "",
    "Debrief:",
    `Case note prompt: ${buildCaseNotePrompt(scenario)}`,
    `Revealed hidden details: ${revealed.length ? revealed.join("; ") : "None yet"}`,
    `Unrevealed hidden details: ${unrevealed.length ? unrevealed.join("; ") : "None"}`,
  ].join("\n");
}

function renderScenarioCard() {
  if (!currentScenario) return;

  els.scenarioId.textContent = currentScenario.id;
  els.title.textContent = currentScenario.title;
  els.difficulty.textContent = currentScenario.difficulty;
  els.brief.textContent = currentScenario.brief;
  els.opening.textContent = currentScenario.opening;
  els.surveyBasis.textContent = `${vtaSurvey.source} Scenario traits are sampled from aggregate crosstab percentages, not individual respondent records. Agency details use a curated ${agencyData.name} website snapshot checked ${agencyData.lastChecked}${agencyData.gtfs ? ` and VTA GTFS ${agencyData.gtfs.feedInfo.version}.` : "."}`;
  els.complexityLabel.textContent = currentScenario.difficulty;
  setProfile(
    currentScenario.customer,
    currentScenario.sourceScenario,
    currentScenario.mode,
    currentScenario.tone,
    currentScenario.surveyProfile,
  );
  setList(els.facts, currentScenario.facts);
  setList(els.hidden, currentScenario.hidden);
  setList(els.goals, currentScenario.goals);
  setList(els.rubric, currentScenario.rubric);
  setList(els.turns, currentScenario.turns);
  currentScenarioText = buildScenarioText(currentScenario);
}

function renderDebrief() {
  if (!currentScenario) return;

  const revealed = revealedHiddenDetailIndexes.map((index) => currentScenario.hidden[index]);
  const unrevealed = currentScenario.hidden.filter((_, index) => !revealedHiddenDetailIndexes.includes(index));
  setList(els.debriefGoals, currentScenario.goals);
  setList(els.debriefRubric, currentScenario.rubric);
  if (revealed.length) {
    setList(els.debriefRevealed, revealed);
  } else {
    setEmptyList(els.debriefRevealed, "No hidden details were revealed during this run.");
  }
  if (unrevealed.length) {
    setList(els.debriefUnrevealed, unrevealed);
  } else {
    setEmptyList(els.debriefUnrevealed, "All hidden details were revealed.");
  }
  els.caseNotePrompt.textContent = buildCaseNotePrompt(currentScenario);
}

function renderRoleplay() {
  if (!currentScenario) return;

  const totalTurns = currentScenario.turns.length;
  const isOpening = roleplayTurnIndex === 0;
  const turnNumber = Math.min(roleplayTurnIndex, totalTurns);
  const activeTurnIndex = Math.max(roleplayTurnIndex - 1, 0);
  const guidance = getRoleplayGuidance(currentScenario.issue, currentScenario.rubric, activeTurnIndex);
  const line = isOpening ? currentScenario.opening : currentScenario.turns[activeTurnIndex];

  els.debriefPanel.classList.toggle("hidden", !isDebrief);
  els.roleplayState.textContent = isDebrief ? "Debrief" : "In Roleplay";
  els.roleplayProgress.textContent = isDebrief ? "Roleplay complete" : isOpening ? `Opening of ${totalTurns} turns` : `Turn ${turnNumber} of ${totalTurns}`;
  els.roleplayHeading.textContent = isDebrief ? "Roleplay Complete" : isOpening ? "Customer Opening" : `Customer Turn ${turnNumber}`;
  els.roleplayCustomerLine.textContent = isDebrief ? "Move into the debrief: compare the trainee's choices with the goals, rubric, and hidden details." : line;
  els.roleplayCoachNote.textContent = isDebrief ? "Ask the trainee what they would document and what they would do next if this were a live case." : guidance.coachNote;
  els.roleplayExpectedBehavior.textContent = isDebrief ? "Summarize the interaction, identify missed information, and produce a concise case note." : guidance.expectedBehavior;
  els.roleplayPrev.disabled = roleplayTurnIndex === 0 && !isDebrief;
  els.roleplayNext.textContent = roleplayTurnIndex >= totalTurns ? "Debrief" : "Next";
  els.roleplayNext.disabled = isDebrief;
  els.roleplayReveal.disabled = isDebrief || revealedHiddenDetailIndexes.length >= currentScenario.hidden.length;
  els.triggerPanel.classList.toggle("hidden", currentScenario.issue !== "delay");
  els.triggerButtons.forEach((button) => {
    const trigger = button.dataset.trigger;
    const hasUnrevealedMatch = currentScenario.hiddenDetailMeta.some((detail, index) => {
      return detail.trigger === trigger && !revealedHiddenDetailIndexes.includes(index);
    });
    button.disabled = isDebrief || !hasUnrevealedMatch;
  });

  const revealed = revealedHiddenDetailIndexes.map((index) => currentScenario.hidden[index]);
  if (revealed.length) {
    setList(els.roleplayRevealed, revealed);
  } else {
    setEmptyList(els.roleplayRevealed, "No hidden details revealed yet.");
  }

  renderDebrief();
  currentScenarioText = buildScenarioText(currentScenario);
}

function renderActiveView() {
  els.cardSection.classList.toggle("hidden", activeView !== "card");
  els.roleplaySection.classList.toggle("hidden", activeView !== "roleplay");
  els.cardView.classList.toggle("active", activeView === "card");
  els.roleplayView.classList.toggle("active", activeView === "roleplay");
  els.cardView.setAttribute("aria-pressed", String(activeView === "card"));
  els.roleplayView.setAttribute("aria-pressed", String(activeView === "roleplay"));
  renderScenarioCard();
  renderRoleplay();
}

function generateScenario() {
  const scenario = pickScenario();
  const customer = pick(customers);
  const toneChoice = pickTone();
  const tone = toneChoice.label;
  const surveyProfile = buildSurveyProfile(scenario);
  const complexity = Number(els.complexity.value);
  const mode = els.mode.value;
  const agencyContext = buildAgencyContext(scenario, surveyProfile, mode);
  const facts = [
    ...scenario.facts,
    `Survey-backed profile cue: ${surveyProfile.frequency.toLowerCase()}, ${surveyProfile.payment.toLowerCase()}, ${surveyProfile.vehicleAccess.toLowerCase()}.`,
    `Customer usually checks service information through: ${surveyProfile.infoSource}.`,
    ...buildAgencyFacts(scenario, agencyContext),
  ];
  const hidden = [
    ...scenario.hidden,
    `Underlying rider concern: ${surveyProfile.painPoint.toLowerCase()}.`,
  ];
  const goals = [...scenario.goals];
  const rubric = [...scenario.rubric];
  const turns = buildRoleplayTurns(scenario, toneChoice.key, complexity);

  if (scenario.issue === "delay" || scenario.issue === "trip-planning") {
    facts.push(`Common route context: ${agencyContext.route} is the customer's familiar route.`);
  }

  if (scenario.issue === "trip-planning" || scenario.issue === "delay") {
    hidden.push(`The customer may need to connect with ${surveyProfile.transferPartner}.`);
  }

  if (els.accessibility.checked || scenario.issue === "accessibility") {
    facts.push(pick(accessibilityConsiderations));
    goals.push("Confirm the customer can use the proposed option safely and comfortably.");
    rubric.push("Recognizes accessibility as a service requirement, not a courtesy.");
  }

  if (els.policy.checked) {
    hidden.push(pick(policyEdges));
    rubric.push("Explains limits of authority without sounding bureaucratic.");
  }

  if (complexity >= 4) {
    facts.push("A prior contact record exists, but the details are incomplete.");
    hidden.push("The customer has already repeated the story to another department.");
  }

  if (complexity === 5) {
    goals.push("Escalate appropriately while keeping ownership of the customer experience.");
  }

  const id = `Scenario TSS-${String(scenarioCount).padStart(3, "0")}`;
  const difficulty = complexityLabels[complexity];
  const title = scenario.title;

  currentScenario = {
    id,
    issue: scenario.issue,
    title,
    difficulty,
    brief: scenario.brief,
    opening: scenario.opening,
    customer,
    surveyProfile,
    agencyContext,
    tone,
    toneKey: toneChoice.key,
    mode,
    channelLabel: els.channel.options[els.channel.selectedIndex].text,
    facts,
    hidden,
    hiddenDetailMeta: buildHiddenDetailMeta(scenario.issue, hidden),
    goals,
    rubric,
    turns,
    sourceScenario: scenario,
  };

  roleplayTurnIndex = 0;
  revealedHiddenDetailIndexes = [];
  isDebrief = false;
  els.triggerFeedback.textContent = "Choose the question type the trainee asked.";
  renderActiveView();

  scenarioCount += 1;
}

async function copyScenario() {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(currentScenarioText);
  } else {
    const textarea = document.createElement("textarea");
    textarea.value = currentScenarioText;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-999px";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }
  els.copy.textContent = "Copied";
  els.copy.classList.add("copied");
  window.setTimeout(() => {
    els.copy.textContent = "Copy";
    els.copy.classList.remove("copied");
  }, 1200);
}

function resetForm() {
  document.querySelector("#scenario-form").reset();
  els.complexity.value = 3;
  els.complexityLabel.textContent = complexityLabels[3];
  generateScenario();
}

function showCardView() {
  activeView = "card";
  renderActiveView();
}

function showRoleplayView() {
  activeView = "roleplay";
  renderActiveView();
}

function goToPreviousRoleplayStep() {
  if (isDebrief) {
    isDebrief = false;
    roleplayTurnIndex = currentScenario.turns.length;
  } else {
    roleplayTurnIndex = Math.max(0, roleplayTurnIndex - 1);
  }
  renderRoleplay();
}

function goToNextRoleplayStep() {
  if (!currentScenario || isDebrief) return;
  if (roleplayTurnIndex >= currentScenario.turns.length) {
    isDebrief = true;
  } else {
    roleplayTurnIndex += 1;
  }
  renderRoleplay();
}

function revealHiddenDetail() {
  if (!currentScenario || isDebrief) return;
  const nextIndex = currentScenario.hidden.findIndex((_, index) => !revealedHiddenDetailIndexes.includes(index));
  if (revealHiddenDetailByIndex(nextIndex)) {
    els.triggerFeedback.textContent = "Trainer override revealed the next hidden detail.";
  }
  renderRoleplay();
}

function revealTriggeredHiddenDetail(event) {
  if (!currentScenario || isDebrief) return;
  const trigger = event.currentTarget.dataset.trigger;
  const nextIndex = currentScenario.hiddenDetailMeta.findIndex((detail, index) => {
    return detail.trigger === trigger && !revealedHiddenDetailIndexes.includes(index);
  });
  if (revealHiddenDetailByIndex(nextIndex)) {
    els.triggerFeedback.textContent = `Revealed a detail tied to: ${event.currentTarget.textContent}.`;
  } else {
    els.triggerFeedback.textContent = `No new hidden detail is tied to: ${event.currentTarget.textContent}.`;
  }
  renderRoleplay();
}

function restartRoleplay() {
  roleplayTurnIndex = 0;
  revealedHiddenDetailIndexes = [];
  isDebrief = false;
  els.triggerFeedback.textContent = "Choose the question type the trainee asked.";
  renderRoleplay();
}

els.generate.addEventListener("click", generateScenario);
els.copy.addEventListener("click", copyScenario);
els.reset.addEventListener("click", resetForm);
els.cardView.addEventListener("click", showCardView);
els.roleplayView.addEventListener("click", showRoleplayView);
els.roleplayPrev.addEventListener("click", goToPreviousRoleplayStep);
els.roleplayNext.addEventListener("click", goToNextRoleplayStep);
els.roleplayReveal.addEventListener("click", revealHiddenDetail);
els.roleplayRestart.addEventListener("click", restartRoleplay);
els.triggerButtons.forEach((button) => {
  button.addEventListener("click", revealTriggeredHiddenDetail);
});
els.complexity.addEventListener("input", () => {
  els.complexityLabel.textContent = complexityLabels[els.complexity.value];
});

generateScenario();

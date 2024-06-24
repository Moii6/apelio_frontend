const errorResponseObject = (error) => {
  console.log(error);
  return {
    status: error?.response?.status || 500,
    message:
      error?.response?.data?.errorMessage ||
      error?.response?.data?.message ||
      error?.response?.data?.msg ||
      error?.response?.statusText ||
      error?.name + " " + error?.message ||
      error,
  };
};

const orderTripsByStartDate = (tripsList) => {
  if (tripsList?.length > 0)
    return tripsList.sort(
      (a, b) => new Date(b.startLocation.date) - new Date(a.startLocation.date)
    );
};

const lastTripDifferentThanCreated = (tripList) => {
  if (tripList.length > 0) {
    const diffCreatedList = tripList.filter(
      (trip) => trip.status !== "created" && trip.status !== "running"
    );
    return diffCreatedList;
  }
};
const currencyFormat = (price) => {
  const formatter = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formatter.format(price);
};

const dateFormat = (fecha) => {
  if (!fecha) return;
  const opciones = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const nuevaFecha = new Date(fecha.split("T")[0].split("-"));
  return nuevaFecha.toLocaleDateString("es-ES", opciones);
};

const verifyObjectEmpty = (obj) => {
  return JSON.stringify(obj) === "{}";
};

const extractSeats = (arr) => {
  return arr.map((arr) => arr.seat);
};

const feedData = [
  {
    name: "Michael Smith",
    password: "password",
    email: "michael.smith@gmail.com",
    role: "passenger",
  },
  {
    name: "Jennifer Johnson",
    password: "password",
    email: "jennifer.johnson@gmail.com",
    role: "passenger",
  },
  {
    name: "John Williams",
    password: "password",
    email: "john.williams@gmail.com",
    role: "passenger",
  },
  {
    name: "Sarah Jones",
    password: "password",
    email: "sarah.jones@gmail.com",
    role: "passenger",
  },
  {
    name: "Christopher Brown",
    password: "password",
    email: "christopher.brown@gmail.com",
    role: "passenger",
  },
  {
    name: "Jessica Davis",
    password: "password",
    email: "jessica.davis@gmail.com",
    role: "passenger",
  },
  {
    name: "Daniel Miller",
    password: "password",
    email: "daniel.miller@gmail.com",
    role: "passenger",
  },
  {
    name: "Emily Wilson",
    password: "password",
    email: "emily.wilson@gmail.com",
    role: "passenger",
  },
  {
    name: "David Moore",
    password: "password",
    email: "david.moore@gmail.com",
    role: "passenger",
  },
  {
    name: "Jennifer Taylor",
    password: "password",
    email: "jennifer.taylor@gmail.com",
    role: "passenger",
  },
  {
    name: "Matthew Smith",
    password: "password",
    email: "matthew.smith@gmail.com",
    role: "passenger",
  },
  {
    name: "Hannah Johnson",
    password: "password",
    email: "hannah.johnson@gmail.com",
    role: "passenger",
  },
  {
    name: "Andrew Williams",
    password: "password",
    email: "andrew.williams@gmail.com",
    role: "passenger",
  },
  {
    name: "Ashley Jones",
    password: "password",
    email: "ashley.jones@gmail.com",
    role: "passenger",
  },
  {
    name: "Justin Brown",
    password: "password",
    email: "justin.brown@gmail.com",
    role: "passenger",
  },
  {
    name: "Emma Davis",
    password: "password",
    email: "emma.davis@gmail.com",
    role: "passenger",
  },
  {
    name: "Alexander Miller",
    password: "password",
    email: "alexander.miller@gmail.com",
    role: "passenger",
  },
  {
    name: "Sophia Wilson",
    password: "password",
    email: "sophia.wilson@gmail.com",
    role: "passenger",
  },
  {
    name: "James Moore",
    password: "password",
    email: "james.moore@gmail.com",
    role: "passenger",
  },
  {
    name: "Olivia Taylor",
    password: "password",
    email: "olivia.taylor@gmail.com",
    role: "passenger",
  },
  {
    name: "Ryan Smith",
    password: "password",
    email: "ryan.smith@gmail.com",
    role: "passenger",
  },
  {
    name: "Abigail Johnson",
    password: "password",
    email: "abigail.johnson@gmail.com",
    role: "passenger",
  },
  {
    name: "Nathan Williams",
    password: "password",
    email: "nathan.williams@gmail.com",
    role: "passenger",
  },
  {
    name: "Elizabeth Jones",
    password: "password",
    email: "elizabeth.jones@gmail.com",
    role: "passenger",
  },
  {
    name: "Ethan Brown",
    password: "password",
    email: "ethan.brown@gmail.com",
    role: "passenger",
  },
  {
    name: "Madison Davis",
    password: "password",
    email: "madison.davis@gmail.com",
    role: "passenger",
  },
  {
    name: "Aiden Miller",
    password: "password",
    email: "aiden.miller@gmail.com",
    role: "passenger",
  },
  {
    name: "Chloe Wilson",
    password: "password",
    email: "chloe.wilson@gmail.com",
    role: "passenger",
  },
  {
    name: "Jacob Moore",
    password: "password",
    email: "jacob.moore@gmail.com",
    role: "passenger",
  },
  {
    name: "Mia Taylor",
    password: "password",
    email: "mia.taylor@gmail.com",
    role: "passenger",
  },
  {
    name: "Charlotte Smith",
    password: "password",
    email: "charlotte.smith@gmail.com",
    role: "passenger",
  },
  {
    name: "Noah Johnson",
    password: "password",
    email: "noah.johnson@gmail.com",
    role: "passenger",
  },
  {
    name: "Grace Williams",
    password: "password",
    email: "grace.williams@gmail.com",
    role: "passenger",
  },
  {
    name: "Liam Jones",
    password: "password",
    email: "liam.jones@gmail.com",
    role: "passenger",
  },
  {
    name: "Lily Brown",
    password: "password",
    email: "lily.brown@gmail.com",
    role: "passenger",
  },
  {
    name: "Benjamin Davis",
    password: "password",
    email: "benjamin.davis@gmail.com",
    role: "passenger",
  },
  {
    name: "Avery Miller",
    password: "password",
    email: "avery.miller@gmail.com",
    role: "passenger",
  },
  {
    name: "Sofia Wilson",
    password: "password",
    email: "sofia.wilson@gmail.com",
    role: "passenger",
  },
  {
    name: "Elijah Moore",
    password: "password",
    email: "elijah.moore@gmail.com",
    role: "passenger",
  },
  {
    name: "Hannah Taylor",
    password: "password",
    email: "hannah.taylor@gmail.com",
    role: "passenger",
  },
  {
    name: "Samuel Smith",
    password: "password",
    email: "samuel.smith@gmail.com",
    role: "passenger",
  },
  {
    name: "Aria Johnson",
    password: "password",
    email: "aria.johnson@gmail.com",
    role: "passenger",
  },
  {
    name: "Matthew Williams",
    password: "password",
    email: "matthew.williams@gmail.com",
    role: "passenger",
  },
  {
    name: "Aubrey Jones",
    password: "password",
    email: "aubrey.jones@gmail.com",
    role: "passenger",
  },
  {
    name: "Levi Brown",
    password: "password",
    email: "levi.brown@gmail.com",
    role: "passenger",
  },
  {
    name: "Amelia Davis",
    password: "password",
    email: "amelia.davis@gmail.com",
    role: "passenger",
  },
  {
    name: "Julian Miller",
    password: "password",
    email: "julian.miller@gmail.com",
    role: "passenger",
  },
  {
    name: "Ariana Wilson",
    password: "password",
    email: "ariana.wilson@gmail.com",
    role: "passenger",
  },
  {
    name: "Owen Moore",
    password: "password",
    email: "owen.moore@gmail.com",
    role: "passenger",
  },
  {
    name: "Luna Taylor",
    password: "password",
    email: "luna.taylor@gmail.com",
    role: "passenger",
  },
  {
    name: "Isaac Smith",
    password: "password",
    email: "isaac.smith@gmail.com",
    role: "passenger",
  },
  {
    name: "Ella Johnson",
    password: "password",
    email: "ella.johnson@gmail.com",
    role: "passenger",
  },
  {
    name: "Mason Williams",
    password: "password",
    email: "mason.williams@gmail.com",
    role: "passenger",
  },
  {
    name: "Scarlett Jones",
    password: "password",
    email: "scarlett.jones@gmail.com",
    role: "passenger",
  },
  {
    name: "Lucas Brown",
    password: "password",
    email: "lucas.brown@gmail.com",
    role: "passenger",
  },
  {
    name: "Victoria Davis",
    password: "password",
    email: "victoria.davis@gmail.com",
    role: "passenger",
  },
  {
    name: "Evelyn Miller",
    password: "password",
    email: "evelyn.miller@gmail.com",
    role: "passenger",
  },
  {
    name: "Jackson Wilson",
    password: "password",
    email: "jackson.wilson@gmail.com",
    role: "passenger",
  },
  {
    name: "Henry Moore",
    password: "password",
    email: "henry.moore@gmail.com",
    role: "passenger",
  },
  {
    name: "Penelope Taylor",
    password: "password",
    email: "penelope.taylor@gmail.com",
    role: "passenger",
  },
  {
    name: "Liam Smith",
    password: "password",
    email: "liam.smith@gmail.com",
    role: "passenger",
  },
  {
    name: "Lily Johnson",
    password: "password",
    email: "lily.johnson@gmail.com",
    role: "passenger",
  },
  {
    name: "Logan Williams",
    password: "password",
    email: "logan.williams@gmail.com",
    role: "passenger",
  },
  {
    name: "Avery Jones",
    password: "password",
    email: "avery.jones@gmail.com",
    role: "passenger",
  },
  {
    name: "Sophia Brown",
    password: "password",
    email: "sophia.brown@gmail.com",
    role: "passenger",
  },
  {
    name: "Oliver Davis",
    password: "password",
    email: "oliver.davis@gmail.com",
    role: "passenger",
  },
  {
    name: "Harper Miller",
    password: "password",
    email: "harper.miller@gmail.com",
    role: "passenger",
  },
  {
    name: "Jack Wilson",
    password: "password",
    email: "jack.wilson@gmail.com",
    role: "passenger",
  },
  {
    name: "Amelia Moore",
    password: "password",
    email: "amelia.moore@gmail.com",
    role: "passenger",
  },
  {
    name: "Lucas Taylor",
    password: "password",
    email: "lucas.taylor@gmail.com",
    role: "passenger",
  },
  {
    name: "Emma Smith",
    password: "password",
    email: "emma.smith@gmail.com",
    role: "passenger",
  },
  {
    name: "Ethan Johnson",
    password: "password",
    email: "ethan.johnson@gmail.com",
    role: "passenger",
  },
  {
    name: "Evelyn Williams",
    password: "password",
    email: "evelyn.williams@gmail.com",
    role: "passenger",
  },
  {
    name: "Liam Jones",
    password: "password",
    email: "liam.jones@gmail.com",
    role: "passenger",
  },
  {
    name: "Mia Brown",
    password: "password",
    email: "mia.brown@gmail.com",
    role: "passenger",
  },
  {
    name: "Noah Davis",
    password: "password",
    email: "noah.davis@gmail.com",
    role: "passenger",
  },
  {
    name: "Charlotte Miller",
    password: "password",
    email: "charlotte.miller@gmail.com",
    role: "passenger",
  },
  {
    name: "Luna Wilson",
    password: "password",
    email: "luna.wilson@gmail.com",
    role: "passenger",
  },
  {
    name: "Isaac Moore",
    password: "password",
    email: "isaac.moore@gmail.com",
    role: "passenger",
  },
  {
    name: "Mason Taylor",
    password: "password",
    email: "mason.taylor@gmail.com",
    role: "passenger",
  },
  {
    name: "Aria Smith",
    password: "password",
    email: "aria.smith@gmail.com",
    role: "passenger",
  },
  {
    name: "James Johnson",
    password: "password",
    email: "james.johnson@gmail.com",
    role: "passenger",
  },
  {
    name: "Emma Williams",
    password: "password",
    email: "emma.williams@gmail.com",
    role: "passenger",
  },
  {
    name: "Jackson Jones",
    password: "password",
    email: "jackson.jones@gmail.com",
    role: "passenger",
  },
  {
    name: "Grace Brown",
    password: "password",
    email: "grace.brown@gmail.com",
    role: "passenger",
  },
  {
    name: "Oliver Davis",
    password: "password",
    email: "oliver.davis@gmail.com",
    role: "passenger",
  },
  {
    name: "Sofia Miller",
    password: "password",
    email: "sofia.miller@gmail.com",
    role: "passenger",
  },
  {
    name: "Lucas Wilson",
    password: "password",
    email: "lucas.wilson@gmail.com",
    role: "passenger",
  },
  {
    name: "Aurora Moore",
    password: "password",
    email: "aurora.moore@gmail.com",
    role: "passenger",
  },
  {
    name: "Levi Taylor",
    password: "password",
    email: "levi.taylor@gmail.com",
    role: "passenger",
  },
  {
    name: "Charlotte Smith",
    password: "password",
    email: "charlotte.smith@gmail.com",
    role: "passenger",
  },
  {
    name: "Eli Johnson",
    password: "password",
    email: "eli.johnson@gmail.com",
    role: "passenger",
  },
  {
    name: "Layla Williams",
    password: "password",
    email: "layla.williams@gmail.com",
    role: "passenger",
  },
  {
    name: "Jacob Jones",
    password: "password",
    email: "jacob.jones@gmail.com",
    role: "passenger",
  },
  {
    name: "Ava Brown",
    password: "password",
    email: "ava.brown@gmail.com",
    role: "passenger",
  },
  {
    name: "Mia Davis",
    password: "password",
    email: "mia.davis@gmail.com",
    role: "passenger",
  },
  {
    name: "Noah Miller",
    password: "password",
    email: "noah.miller@gmail.com",
    role: "passenger",
  },
  {
    name: "Madison Wilson",
    password: "password",
    email: "madison.wilson@gmail.com",
    role: "passenger",
  },
  {
    name: "James Moore",
    password: "password",
    email: "james.moore@gmail.com",
    role: "passenger",
  },
  {
    name: "Avery Taylor",
    password: "password",
    email: "avery.taylor@gmail.com",
    role: "passenger",
  },
  {
    name: "Scarlett Smith",
    password: "password",
    email: "scarlett.smith@gmail.com",
    role: "passenger",
  },
  {
    name: "Benjamin Johnson",
    password: "password",
    email: "benjamin.johnson@gmail.com",
    role: "passenger",
  },
  {
    name: "Evelyn Williams",
    password: "password",
    email: "evelyn.williams@gmail.com",
    role: "passenger",
  },
  {
    name: "Henry Jones",
    password: "password",
    email: "henry.jones@gmail.com",
    role: "passenger",
  },
  {
    name: "Aria Brown",
    password: "password",
    email: "aria.brown@gmail.com",
    role: "passenger",
  },
  {
    name: "Ethan Davis",
    password: "password",
    email: "ethan.davis@gmail.com",
    role: "passenger",
  },
  {
    name: "Ella Miller",
    password: "password",
    email: "ella.miller@gmail.com",
    role: "passenger",
  },
  {
    name: "Lucas Wilson",
    password: "password",
    email: "lucas.wilson@gmail.com",
    role: "passenger",
  },
  {
    name: "Aurora Moore",
    password: "password",
    email: "aurora.moore@gmail.com",
    role: "passenger",
  },
  {
    name: "Levi Taylor",
    password: "password",
    email: "levi.taylor@gmail.com",
    role: "passenger",
  },
];

const feedLogin = [
  {
    password: "password",
    email: "michael.smith@gmail.com",
  },
  {
    password: "password",
    email: "jennifer.johnson@gmail.com",
  },
  {
    password: "password",
    email: "john.williams@gmail.com",
  },
  {
    password: "password",
    email: "sarah.jones@gmail.com",
  },
  {
    password: "password",
    email: "christopher.brown@gmail.com",
  },
  {
    password: "password",
    email: "jessica.davis@gmail.com",
  },
  {
    password: "password",
    email: "daniel.miller@gmail.com",
  },
  {
    password: "password",
    email: "emily.wilson@gmail.com",
  },
  {
    password: "password",
    email: "david.moore@gmail.com",
  },
  {
    password: "password",
    email: "jennifer.taylor@gmail.com",
  },
  {
    password: "password",
    email: "matthew.smith@gmail.com",
  },
  {
    password: "password",
    email: "hannah.johnson@gmail.com",
  },
  {
    password: "password",
    email: "andrew.williams@gmail.com",
  },
  {
    password: "password",
    email: "ashley.jones@gmail.com",
  },
  {
    password: "password",
    email: "justin.brown@gmail.com",
  },
  {
    password: "password",
    email: "emma.davis@gmail.com",
  },
  {
    password: "password",
    email: "alexander.miller@gmail.com",
  },
  {
    password: "password",
    email: "sophia.wilson@gmail.com",
  },
  {
    password: "password",
    email: "james.moore@gmail.com",
  },
  {
    password: "password",
    email: "olivia.taylor@gmail.com",
  },
  {
    password: "password",
    email: "ryan.smith@gmail.com",
  },
  {
    password: "password",
    email: "abigail.johnson@gmail.com",
  },
  {
    password: "password",
    email: "nathan.williams@gmail.com",
  },
  {
    password: "password",
    email: "elizabeth.jones@gmail.com",
  },
  {
    password: "password",
    email: "ethan.brown@gmail.com",
  },
  {
    password: "password",
    email: "madison.davis@gmail.com",
  },
  {
    password: "password",
    email: "aiden.miller@gmail.com",
  },
  {
    password: "password",
    email: "chloe.wilson@gmail.com",
  },
  {
    password: "password",
    email: "jacob.moore@gmail.com",
  },
  {
    password: "password",
    email: "mia.taylor@gmail.com",
  },
  {
    password: "password",
    email: "charlotte.smith@gmail.com",
  },
  {
    password: "password",
    email: "noah.johnson@gmail.com",
  },
  {
    password: "password",
    email: "grace.williams@gmail.com",
  },
  {
    password: "password",
    email: "liam.jones@gmail.com",
  },
  {
    password: "password",
    email: "lily.brown@gmail.com",
  },
  {
    password: "password",
    email: "benjamin.davis@gmail.com",
  },
  {
    password: "password",
    email: "avery.miller@gmail.com",
  },
  {
    password: "password",
    email: "sofia.wilson@gmail.com",
  },
  {
    password: "password",
    email: "elijah.moore@gmail.com",
  },
  {
    password: "password",
    email: "hannah.taylor@gmail.com",
  },
  {
    password: "password",
    email: "samuel.smith@gmail.com",
  },
  {
    password: "password",
    email: "aria.johnson@gmail.com",
  },
  {
    password: "password",
    email: "matthew.williams@gmail.com",
  },
  {
    password: "password",
    email: "aubrey.jones@gmail.com",
  },
  {
    password: "password",
    email: "levi.brown@gmail.com",
  },
  {
    password: "password",
    email: "amelia.davis@gmail.com",
  },
  {
    password: "password",
    email: "julian.miller@gmail.com",
  },
  {
    password: "password",
    email: "ariana.wilson@gmail.com",
  },
  {
    password: "password",
    email: "owen.moore@gmail.com",
  },
  {
    password: "password",
    email: "luna.taylor@gmail.com",
  },
  {
    password: "password",
    email: "isaac.smith@gmail.com",
  },
  {
    password: "password",
    email: "ella.johnson@gmail.com",
  },
  {
    password: "password",
    email: "mason.williams@gmail.com",
  },
  {
    password: "password",
    email: "scarlett.jones@gmail.com",
  },
  {
    password: "password",
    email: "lucas.brown@gmail.com",
  },
  {
    password: "password",
    email: "victoria.davis@gmail.com",
  },
  {
    password: "password",
    email: "evelyn.miller@gmail.com",
  },
  {
    password: "password",
    email: "jackson.wilson@gmail.com",
  },
  {
    password: "password",
    email: "henry.moore@gmail.com",
  },
  {
    password: "password",
    email: "penelope.taylor@gmail.com",
  },
  {
    password: "password",
    email: "liam.smith@gmail.com",
  },
  {
    password: "password",
    email: "lily.johnson@gmail.com",
  },
  {
    password: "password",
    email: "logan.williams@gmail.com",
  },
  {
    password: "password",
    email: "avery.jones@gmail.com",
  },
  {
    password: "password",
    email: "sophia.brown@gmail.com",
  },
  {
    password: "password",
    email: "oliver.davis@gmail.com",
  },
  {
    password: "password",
    email: "harper.miller@gmail.com",
  },
  {
    password: "password",
    email: "jack.wilson@gmail.com",
  },
  {
    password: "password",
    email: "amelia.moore@gmail.com",
  },
  {
    password: "password",
    email: "lucas.taylor@gmail.com",
  },
  {
    password: "password",
    email: "emma.smith@gmail.com",
  },
  {
    password: "password",
    email: "ethan.johnson@gmail.com",
  },
  {
    password: "password",
    email: "evelyn.williams@gmail.com",
  },
  {
    password: "password",
    email: "liam.jones@gmail.com",
  },
  {
    password: "password",
    email: "mia.brown@gmail.com",
  },
  {
    password: "password",
    email: "noah.davis@gmail.com",
  },
  {
    password: "password",
    email: "charlotte.miller@gmail.com",
  },
  {
    password: "password",
    email: "luna.wilson@gmail.com",
  },
  {
    password: "password",
    email: "isaac.moore@gmail.com",
  },
  {
    password: "password",
    email: "mason.taylor@gmail.com",
  },
  {
    password: "password",
    email: "aria.smith@gmail.com",
  },
  {
    password: "password",
    email: "james.johnson@gmail.com",
  },
  {
    password: "password",
    email: "emma.williams@gmail.com",
  },
  {
    password: "password",
    email: "jackson.jones@gmail.com",
  },
  {
    password: "password",
    email: "grace.brown@gmail.com",
  },
  {
    password: "password",
    email: "oliver.davis@gmail.com",
  },
  {
    password: "password",
    email: "sofia.miller@gmail.com",
  },
  {
    password: "password",
    email: "lucas.wilson@gmail.com",
  },
  {
    password: "password",
    email: "aurora.moore@gmail.com",
  },
  {
    password: "password",
    email: "levi.taylor@gmail.com",
  },
];
export {
  feedData,
  feedLogin,
  extractSeats,
  errorResponseObject,
  orderTripsByStartDate,
  dateFormat,
  lastTripDifferentThanCreated,
  verifyObjectEmpty,
  currencyFormat,
};

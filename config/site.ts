export const SITE_CONFIG = {
  name: "European Auto Service",
  tagline: "Professional European Car Service",
  phone: "(555) 123-4567",
  email: "contact@example.com",
  address: "123 Main Street",
  city: "Your City",
  hours: "Mon-Fri 8am-6pm",
  adminPassword: "admin123"
}

export const CAR_BRANDS = [
  "BMW",
  "Mercedes-Benz",
  "Audi",
  "Volkswagen",
  "Porsche",
  "Ferrari",
  "Lamborghini",
  "Maserati",
  "Alfa Romeo",
  "Jaguar",
  "Land Rover",
  "Bentley",
  "Mini",
  "Volvo"
]

export const CAR_MODELS: Record<string, string[]> = {
  "BMW": [
    "1 Series", "2 Series", "3 Series", "4 Series", "5 Series",
    "7 Series", "8 Series", "X1", "X2", "X3", "X4", "X5", "X6", "X7",
    "Z4", "i3", "i4", "iX", "M3", "M4", "M5", "M8"
  ],
  "Mercedes-Benz": [
    "A-Class", "C-Class", "E-Class", "S-Class",
    "GLA", "GLB", "GLC", "GLE", "GLS",
    "CLA", "CLS", "SLC", "SL", "G-Class", "AMG GT"
  ],
  "Audi": [
    "A3", "A4", "A5", "A6", "A7", "A8",
    "Q3", "Q4", "Q5", "Q7", "Q8",
    "TT", "R8", "e-tron", "RS3", "RS4", "RS5", "RS6", "RS7"
  ],
  "Volkswagen": [
    "Golf", "GTI", "Jetta", "Passat", "Arteon",
    "Tiguan", "Touareg", "Atlas", "ID.4", "Beetle", "CC"
  ],
  "Porsche": [
    "911", "Cayenne", "Macan", "Panamera", "Taycan",
    "718 Boxster", "718 Cayman"
  ],
  "Ferrari": [
    "488", "F8 Tributo", "Roma", "Portofino", "SF90",
    "296 GTB", "812", "GTC4Lusso"
  ],
  "Lamborghini": [
    "Huracan", "Aventador", "Urus", "Revuelto"
  ],
  "Maserati": [
    "Ghibli", "Quattroporte", "Levante", "Grecale", "MC20"
  ],
  "Alfa Romeo": [
    "Giulia", "Stelvio", "Tonale", "4C"
  ],
  "Jaguar": [
    "XE", "XF", "XJ", "F-Type", "F-Pace", "E-Pace", "I-Pace"
  ],
  "Land Rover": [
    "Range Rover", "Range Rover Sport", "Range Rover Evoque",
    "Discovery", "Discovery Sport", "Defender"
  ],
  "Bentley": [
    "Continental GT", "Flying Spur", "Bentayga"
  ],
  "Mini": [
    "Cooper", "Cooper S", "John Cooper Works", "Countryman", "Clubman"
  ],
  "Volvo": [
    "S60", "S90", "V60", "V90", "XC40", "XC60", "XC90", "C40"
  ]
}

export const SERVICES = [
  { id: "oil-change", name: "Oil Change", description: "Regular oil and filter change" },
  { id: "brakes", name: "Brake Service", description: "Brake pads, rotors, and fluid" },
  { id: "diagnostics", name: "Diagnostics", description: "Check engine light and computer scan" },
  { id: "tires", name: "Tire Service", description: "Rotation, balancing, and replacement" },
  { id: "battery", name: "Battery Service", description: "Testing and replacement" },
  { id: "transmission", name: "Transmission", description: "Transmission service and repair" },
  { id: "suspension", name: "Suspension", description: "Shocks, struts, and alignment" },
  { id: "general", name: "General Service", description: "Inspections and tune-ups" }
]

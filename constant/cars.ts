export type VehicleType = {
  id: number;
  name: string;
  brand_id: number;
  group_id: number;
  doors: number;
  seats: number;
  transmission: string;
  luggage: number;
  fuel_type: string;
  branch_id: number;
  image: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  brand: Brand;
  group: Group;
  branch: Branch;
}

type Brand = {
  id: number;
  name: string;
  image: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

type Branch = {
  id: number;
  name: string;
  deleted_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

type Group = {
  id: number;
  name: string;
  description: string;
  rate: number;
  image: string;
  insurances: string;
  deleted_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

// export type CarType = {
//   id: string,
//   name: string,
//   brand_id: string,
//   price: number,
//   combustible: string,
//   maletas: number,
//   puertas: number,
//   caja: string,
//   plazas: number,
//   image: string
// };

// export const Cars: VehicleType[] = [
//   {
//     id: 1,
//     name: "Toyota Corolla",
//     brand_id: 1,
//     group_id: 1,
//     doors: 4,
//     seats: 5,
//     transmission: "automatic",
//     luggage: 400,
//     fuel_type: "gasoline",
//     branch_id: 1,
//     image: "https://picsum.photos/300/169",
//     description: "A reliable and efficient sedan.",
//     created_at: new Date("2023-11-22T10:30:00Z"),
//     updated_at: new Date("2023-11-22T10:30:00Z"),
//     deleted_at: null,
//     brand: {
//       id: 1,
//       name: "Toyota",
//       image: "https://picsum.photos/30/30",
//       description: "A renowned Japanese automaker.",
//       created_at: new Date("2023-11-22T10:30:00Z"),
//       updated_at: new Date("2023-11-22T10:30:00Z"),
//       deleted_at: null,
//     },
//     group: {
//       id: 1,
//       name: "Compact Sedans",
//       description: "Affordable and fuel-efficient sedans.",
//       rate: 30,
//       image: "https://picsum.photos/40/40",
//       insurances: "Comprehensive insurance coverage",
//       created_at: new Date("2023-11-22T10:30:00Z"),
//       updated_at: new Date("2023-11-22T10:30:00Z"),
//       deleted_at: null,
//     },
//   },
//   {
//     id: 12,
//     name: "Porsche 911",
//     brand_id: 2,
//     group_id: 3,
//     doors: 2,
//     seats: 2,
//     transmission: "manual",
//     luggage: 150,
//     fuel_type: "gasoline",
//     branch_id: 2,
//     image: "https://picsum.photos/300/169",
//     description: "A legendary sports car with unmatched performance.",
//     created_at: new Date("2023-11-22T10:30:00Z"),
//     updated_at: new Date("2023-11-22T10:30:00Z"),
//     deleted_at: null,
//     brand: {
//       id: 2,
//       name: "Porsche",
//       image: "https://picsum.photos/30/30",
//       description: "A German luxury sports car manufacturer.",
//       created_at: new Date("2023-11-22T10:30:00Z"),
//       updated_at: new Date("2023-11-22T10:30:00Z"),
//       deleted_at: null,
//     },
//     group: {
//       id: 3,
//       name: "Sports Cars",
//       description: "High-performance vehicles designed for speed and agility.",
//       rate: 100,
//       image: "https://picsum.photos/40/40",
//       insurances: "Comprehensive insurance with racing coverage",
//       created_at: new Date("2023-11-22T10:30:00Z"),
//       updated_at: new Date("2023-11-22T10:30:00Z"),
//       deleted_at: null,
//     },
//   },
//   {
//     id: 11,
//     name: "Porsche 911 Carrera S",
//     brand_id: 2,
//     group_id: 3,
//     doors: 2,
//     seats: 2,
//     transmission: "PDK (dual-clutch)",
//     luggage: 140,
//     fuel_type: "gasoline",
//     branch_id: 2,
//     image: "https://picsum.photos/300/169",
//     description: "Un deportivo de alta gama con motor bóxer y tracción trasera.",
//     created_at: new Date("2023-11-22T10:30:00Z"),
//     updated_at: new Date("2023-11-22T10:30:00Z"),
//     deleted_at: null,
//     brand: {
//       id: 2,
//       name: "Porsche",
//       image: "https://picsum.photos/30/30",
//       description: "Fabricante alemán de automóviles deportivos de lujo.",
//       created_at: new Date("2023-11-22T10:30:00Z"),
//       updated_at: new Date("2023-11-22T10:30:00Z"),
//       deleted_at: null,
//     },
//     group: {
//       id: 3,
//       name: "Coches Deportivos",
//       description: "Vehículos de alto rendimiento diseñados para la velocidad y la agilidad.",
//       rate: 150,
//       image: "https://picsum.photos/40/40",
//       insurances: "Seguro a todo riesgo con cobertura de competición",
//       created_at: new Date("2023-11-22T10:30:00Z"),
//       updated_at: new Date("2023-11-22T10:30:00Z"),
//       deleted_at: null,
//     },
//   },
//   {
//     id: 21,
//     name: "Ford F-150 Raptor",
//     brand_id: 4,
//     group_id: 5,
//     doors: 4,
//     seats: 5,
//     transmission: "automática de 10 velocidades",
//     luggage: 1700,
//     fuel_type: "gasolina",
//     branch_id: 4,
//     image: "https://picsum.photos/300/169",
//     description: "Pickup de alto rendimiento con suspensión mejorada para off-road.",
//     created_at: new Date("2023-11-22T10:30:00Z"),
//     updated_at: new Date("2023-11-22T10:30:00Z"),
//     deleted_at: null,
//     brand: {
//       id: 4,
//       name: "Ford",
//       image: "https://picsum.photos/30/30",
//       description: "Fabricante estadounidense de automóviles, camiones y SUV.",
//       created_at: new Date("2023-11-22T10:30:00Z"),
//       updated_at: new Date("2023-11-22T10:30:00Z"),
//       deleted_at: null,
//     },
//     group: {
//       id: 5,
//       name: "Pickups",
//       description: "Vehículos utilitarios con capacidad de carga y remolque.",
//       rate: 70,
//       image: "https://picsum.photos/40/40",
//       insurances: "Seguro a todo riesgo con cobertura de remolque",
//       created_at: new Date("2023-11-22T10:30:00Z"),
//       updated_at: new Date("2023-11-22T10:30:00Z"),
//       deleted_at: null,
//     },
//   },
//   {
//     id: 22,
//     name: "Nissan Leaf",
//     brand_id: 5,
//     group_id: 4,
//     doors: 5,
//     seats: 5,
//     transmission: "eléctrica",
//     luggage: 435,
//     fuel_type: "eléctrico",
//     branch_id: 5,
//     image: "https://picsum.photos/300/169",
//     description: "Vehículo eléctrico compacto ideal para la ciudad, con bajo consumo de energía y cero emisiones.",
//     created_at: new Date("2023-11-22T10:30:00Z"),
//     updated_at: new Date("2023-11-22T10:30:00Z"),
//     deleted_at: null,
//     brand: {
//       id: 5,
//       name: "Nissan",
//       image: "https://picsum.photos/30/30",
//       description: "Fabricante japonés de automóviles, conocido por su fiabilidad y eficiencia.",
//       created_at: new Date("2023-11-22T10:30:00Z"),
//       updated_at: new Date("2023-11-22T10:30:00Z"),
//       deleted_at: null,
//     },
//     group: {
//       id: 4,
//       name: "Coches Eléctricos",
//       description: "Vehículos propulsados por energía eléctrica, con cero emisiones y bajo impacto ambiental.",
//       rate: 40,
//       image: "https://picsum.photos/40/40",
//       insurances: "Seguro a todo riesgo con cobertura de carga en casa y estaciones públicas",
//       created_at: new Date("2023-11-22T10:30:00Z"),
//       updated_at: new Date("2023-11-22T10:30:00Z"),
//       deleted_at: null,
//     },
//   },
//   {
//     id: 23,
//     name: "Mercedes-Benz AMG GT",
//     brand_id: 6,
//     group_id: 3,
//     doors: 2,
//     seats: 2,
//     transmission: "automática de doble embrague",
//     luggage: 350,
//     fuel_type: "gasolina",
//     branch_id: 6,
//     image: "https://picsum.photos/300/169",
//     description: "Coupé deportivo de lujo con motor V8 biturbo y rendimiento excepcional.",
//     created_at: new Date("2023-11-22T10:30:00Z"),
//     updated_at: new Date("2023-11-22T10:30:00Z"),
//     deleted_at: null,
//     brand: {
//       id: 5,
//       name: "Mercedes Benz",
//       image: "https://picsum.photos/30/30",
//       description: "Fabricante japonés de automóviles, conocido por su fiabilidad y eficiencia.",
//       created_at: new Date("2023-11-22T10:30:00Z"),
//       updated_at: new Date("2023-11-22T10:30:00Z"),
//       deleted_at: null,
//     },
//     group: {
//       id: 4,
//       name: "Coches Eléctricos",
//       description: "Vehículos propulsados por energía eléctrica, con cero emisiones y bajo impacto ambiental.",
//       rate: 40,
//       image: "https://picsum.photos/40/40",
//       insurances: "Seguro a todo riesgo con cobertura de carga en casa y estaciones públicas",
//       created_at: new Date("2023-11-22T10:30:00Z"),
//       updated_at: new Date("2023-11-22T10:30:00Z"),
//       deleted_at: null,
//     },
//   }
  
// ]

/*
{
    id: 3,
    name: "Toyota Hilux 4x4",
    brand_id: 1,
    price: 185532.50,
    combustible: "Diesel",
    maletas: 6,
    puertas: 4,
    caja: "Manual",
    plazas: 5,
    image: "/images2/toyotahilux.webp"
  },
{

    id: 7,
    name: "Toyota Hilux 4x4",
    brand_id: 1,
    price: 185532.50,
    combustible: "Diesel",
    maletas: 6,
    puertas: 4,
    caja: "Manual",
    plazas: 5,
    image: "/images2/toyotahilux.webp"
  },
  {
    id: 8,
    name: "Peugeot 208 Like",
    brand_id: 1,
    price: 47235.50,
    combustible: "Nafta",
    maletas: 2,
    puertas: 5,
    caja: "Manual",
    plazas: 5,
    image: "/images2/peugeot208.webp"
  },
  {
    id: 9,
    name: "Toyota Etios",
    brand_id: 1,
    price: 47235.50,
    combustible: "Nafta",
    maletas: 2,
    puertas: 5,
    caja: "Manual",
    plazas: 5,
    image: "/images2/toyotaetios.webp"
  },
  {
    id: 10,
    name: "Nissaan Versa",
    brand_id: 1,
    price: 74260.50,
    combustible: "Nafta",
    maletas: 4,
    puertas: 4,
    caja: "Automática",
    plazas: 5,
    image: "/images2/nissanversa.webp"
  },
  {
    id: 11,
    name: "Toyota Hilux 4x4",
    brand_id: 1,
    price: 185532.50,
    combustible: "Diesel",
    maletas: 6,
    puertas: 4,
    caja: "Manual",
    plazas: 5,
    image: "/images2/toyotahilux.webp"
  },

*/
import { Place, Event } from "../types";

export const mockPlaces: Place[] = [
  {
    id: "1",
    name: "Downtown Cafe",
    nameAr: "مقهى وسط المدينة",
    description:
      "A cozy cafe in the heart of downtown with excellent coffee and pastries.",
    descriptionAr: "مقهى دافئ في قلب وسط المدينة مع قهوة ممتازة ومعجنات.",
    category: "cafe",
    rating: 4.5,
    price: "$$",
    address: "123 Main St, Downtown",
    addressAr: "١٢٣ الشارع الرئيسي، وسط المدينة",
    coordinates: { latitude: 40.7128, longitude: -74.006 },
    images: [],
    isOpen: true,
    isFavorite: false,
    tags: ["coffee", "breakfast", "wifi", "outdoor"],
  },
  {
    id: "2",
    name: "Urban Park",
    nameAr: "الحديقة الحضرية",
    description:
      "Beautiful park with walking trails, playground, and picnic areas.",
    descriptionAr: "حديقة جميلة مع مسارات للمشي وملعب ومناطق للنزهة.",
    category: "outdoor",
    rating: 4.8,
    price: "Free",
    address: "456 Park Ave, Downtown",
    addressAr: "٤٥٦ جادة الحديقة، وسط المدينة",
    coordinates: { latitude: 40.7589, longitude: -73.9851 },
    images: [],
    isOpen: true,
    isFavorite: false,
    tags: ["outdoor", "nature", "exercise", "family"],
  },
  {
    id: "3",
    name: "Art Gallery",
    nameAr: "معرض الفن",
    description:
      "Contemporary art gallery featuring local and international artists.",
    descriptionAr: "معرض فني معاصر يعرض أعمال فنانين محليين ودوليين.",
    category: "cultural",
    rating: 4.6,
    price: "$",
    address: "789 Art Blvd, Cultural District",
    addressAr: "٧٨٩ جادة الفن، الحي الثقافي",
    coordinates: { latitude: 40.7505, longitude: -73.9934 },
    images: [],
    isOpen: true,
    isFavorite: false,
    tags: ["art", "culture", "exhibitions", "education"],
  },
  {
    id: "4",
    name: "Riverside Restaurant",
    nameAr: "مطعم النهر",
    description:
      "Fine dining restaurant with river views and international cuisine.",
    descriptionAr: "مطعم راقي مع إطلالات على النهر ومأكولات دولية.",
    category: "restaurant",
    rating: 4.7,
    price: "$$$",
    address: "321 River Rd, Waterfront",
    addressAr: "٣٢١ طريق النهر، الواجهة المائية",
    coordinates: { latitude: 40.7021, longitude: -74.0173 },
    images: [],
    isOpen: true,
    isFavorite: false,
    tags: ["fine-dining", "river-view", "international", "romantic"],
  },
];

export const mockEvents: Event[] = [
  {
    id: "1",
    title: "Summer Music Festival",
    titleAr: "مهرجان الموسيقى الصيفي",
    description:
      "Annual summer music festival featuring local artists and bands.",
    descriptionAr:
      "مهرجان الموسيقى الصيفي السنوي مع فنانيين محليين وفرق موسيقية.",
    date: "2024-08-15",
    time: "7:00 PM",
    location: "Central Park",
    locationAr: "الحديقة المركزية",
    category: "music",
    price: "$25",
    images: [],
    isFavorite: false,
  },
  {
    id: "2",
    title: "Food Truck Rally",
    titleAr: "رالي شاحنات الطعام",
    description:
      "A gathering of the best food trucks in the city with live entertainment.",
    descriptionAr: "تجمع لأفضل شاحنات الطعام في المدينة مع عروض حية.",
    date: "2024-08-22",
    time: "6:00 PM",
    location: "Downtown Square",
    locationAr: "ساحة وسط المدينة",
    category: "food",
    price: "Free",
    images: [],
    isFavorite: false,
  },
  {
    id: "3",
    title: "Art Exhibition Opening",
    titleAr: "افتتاح المعرض الفني",
    description: "Opening night of the new contemporary art exhibition.",
    descriptionAr: "ليلة افتتاح المعرض الفني المعاصر الجديد.",
    date: "2024-09-05",
    time: "8:00 PM",
    location: "City Art Museum",
    locationAr: "متحف الفن في المدينة",
    category: "art",
    price: "$15",
    images: [],
    isFavorite: false,
  },
  {
    id: "4",
    title: "Tech Conference",
    titleAr: "مؤتمر التكنولوجيا",
    description:
      "Annual technology conference with industry leaders and innovators.",
    descriptionAr: "مؤتمر التكنولوجيا السنوي مع قادة الصناعة والمبتكرين.",
    date: "2024-09-20",
    time: "9:00 AM",
    location: "Convention Center",
    locationAr: "مركز المؤتمرات",
    category: "technology",
    price: "$150",
    images: [],
    isFavorite: false,
  },
];

export const getPlacesByCategory = (category: string): Place[] => {
  return mockPlaces.filter((place) => place.category === category);
};

export const getEventsByCategory = (category: string): Event[] => {
  return mockEvents.filter((event) => event.category === category);
};

export const searchPlaces = (query: string): Place[] => {
  const lowercaseQuery = query.toLowerCase();
  return mockPlaces.filter(
    (place) =>
      place.name.toLowerCase().includes(lowercaseQuery) ||
      place.description.toLowerCase().includes(lowercaseQuery) ||
      place.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export const searchEvents = (query: string): Event[] => {
  const lowercaseQuery = query.toLowerCase();
  return mockEvents.filter(
    (event) =>
      event.title.toLowerCase().includes(lowercaseQuery) ||
      event.description.toLowerCase().includes(lowercaseQuery) ||
      event.category.toLowerCase().includes(lowercaseQuery)
  );
};

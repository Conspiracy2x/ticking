// Curated Unsplash direct image URLs for major cities
// Each city has two images: [heroBackground, detailImage]
const CITY_IMAGES: Record<string, [string, string]> = {
  "new york": [
    "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1600&h=900&fit=crop&q=80",
  ],
  "los angeles": [
    "https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1515896769750-31548aa180ed?w=1600&h=900&fit=crop&q=80",
  ],
  "chicago": [
    "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1600&h=900&fit=crop&q=80",
  ],
  "london": [
    "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=1600&h=900&fit=crop&q=80",
  ],
  "paris": [
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1600&h=900&fit=crop&q=80",
  ],
  "berlin": [
    "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?w=1600&h=900&fit=crop&q=80",
  ],
  "tokyo": [
    "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=1600&h=900&fit=crop&q=80",
  ],
  "sydney": [
    "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1524293581917-878a6d017c71?w=1600&h=900&fit=crop&q=80",
  ],
  "dubai": [
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1600&h=900&fit=crop&q=80",
  ],
  "singapore": [
    "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1496939376851-89342e90adcd?w=1600&h=900&fit=crop&q=80",
  ],
  "hong kong": [
    "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507941097613-9f42cf2aad15?w=1600&h=900&fit=crop&q=80",
  ],
  "mumbai": [
    "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1600&h=900&fit=crop&q=80",
  ],
  "moscow": [
    "https://images.unsplash.com/photo-1513326738677-b964603b136d?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1520106212299-d99c443e4568?w=1600&h=900&fit=crop&q=80",
  ],
  "istanbul": [
    "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=1600&h=900&fit=crop&q=80",
  ],
  "rome": [
    "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1529260830199-42c24126f198?w=1600&h=900&fit=crop&q=80",
  ],
  "seoul": [
    "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=1600&h=900&fit=crop&q=80",
  ],
  "toronto": [
    "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&h=900&fit=crop&q=80",
  ],
  "cairo": [
    "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1539768942893-daf53e448371?w=1600&h=900&fit=crop&q=80",
  ],
  "bangkok": [
    "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=1600&h=900&fit=crop&q=80",
  ],
  "amsterdam": [
    "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=1600&h=900&fit=crop&q=80",
  ],
  "são paulo": [
    "https://images.unsplash.com/photo-1543059080-f9b1272213d5?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1554168848-228452c09d60?w=1600&h=900&fit=crop&q=80",
  ],
  "buenos aires": [
    "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1612294037637-ec328d0e075e?w=1600&h=900&fit=crop&q=80",
  ],
  "mexico city": [
    "https://images.unsplash.com/photo-1518659526054-190340b32735?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?w=1600&h=900&fit=crop&q=80",
  ],
  "vancouver": [
    "https://images.unsplash.com/photo-1559511260-66a68e7e7840?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1609825488888-3a766db05542?w=1600&h=900&fit=crop&q=80",
  ],
  "madrid": [
    "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=1600&h=900&fit=crop&q=80",
  ],
  "lisbon": [
    "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1536663815808-535e2280d2c2?w=1600&h=900&fit=crop&q=80",
  ],
  "athens": [
    "https://images.unsplash.com/photo-1555993539-1732b0258235?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?w=1600&h=900&fit=crop&q=80",
  ],
  "nairobi": [
    "https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1600&h=900&fit=crop&q=80",
  ],
  "denver": [
    "https://images.unsplash.com/photo-1546156929-a4c0ac411f47?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1619856699906-09e1f4ef578c?w=1600&h=900&fit=crop&q=80",
  ],
  "auckland": [
    "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1595125990323-885cec5217ff?w=1600&h=900&fit=crop&q=80",
  ],
  "stockholm": [
    "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1572883454114-efab7f23a81d?w=1600&h=900&fit=crop&q=80",
  ],
  "prague": [
    "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1562624475-96c2bc08fab9?w=1600&h=900&fit=crop&q=80",
  ],
  "vienna": [
    "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1573599852326-2d4da0bbe613?w=1600&h=900&fit=crop&q=80",
  ],
  "lagos": [
    "https://images.unsplash.com/photo-1618828665011-0abd973f7bb8?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1591321699127-ed706b31fc61?w=1600&h=900&fit=crop&q=80",
  ],
  "johannesburg": [
    "https://images.unsplash.com/photo-1577948000111-9c970dfe3743?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=1600&h=900&fit=crop&q=80",
  ],
  "kuala lumpur": [
    "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1508062878650-88b52897f298?w=1600&h=900&fit=crop&q=80",
  ],
  "jakarta": [
    "https://images.unsplash.com/photo-1555899434-94d1368aa7af?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1590559899731-a382839e5549?w=1600&h=900&fit=crop&q=80",
  ],
};

// Generic city images for cities without curated photos
const GENERIC_CITY_IMAGES: [string, string][] = [
  [
    "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1600&h=900&fit=crop&q=80",
  ],
  [
    "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=1600&h=900&fit=crop&q=80",
  ],
  [
    "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1600&h=900&fit=crop&q=80",
  ],
];

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function getCityImages(cityName: string): { heroImage: string; detailImage: string } {
  const key = cityName.toLowerCase();
  const curated = CITY_IMAGES[key];
  
  if (curated) {
    return { heroImage: curated[0], detailImage: curated[1] };
  }
  
  // Use a deterministic generic image based on city name
  const idx = hashString(key) % GENERIC_CITY_IMAGES.length;
  return { heroImage: GENERIC_CITY_IMAGES[idx][0], detailImage: GENERIC_CITY_IMAGES[idx][1] };
}

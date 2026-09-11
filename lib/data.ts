export interface Package {
  id: string;
  type: 'umrah' | 'hajj';
  nameEn: string;
  nameFr: string;
  nameAr: string;
  price: number;
  currency: string;
  hotelMakkah: string;
  hotelMedina: string;
  hotelStars: number;
  airline: string;
  durationNights: number;
  durationDays: number;
  departure: string;
  returnDate: string;
  image: string;
  featured: boolean;
  includes: string[];
}

export interface Testimonial {
  id: string;
  nameEn: string;
  nameAr: string;
  reviewEn: string;
  reviewAr: string;
  reviewFr: string;
  nameFr: string;
  rating: number;
  city: string;
  avatar: string;
}

export interface Booking {
  id: string;
  customerName: string;
  email: string;
  phone?: string;
  packageId?: string;
  packageName: string;
  travelers: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'rejected' | 'paid';
  date: string;
}

export const packages: Package[] = [
  {
    id: 'umrah-premium',
    type: 'umrah',
    nameEn: 'Premium Umrah Package',
    nameFr: 'Forfait Omra Premium',
    nameAr: 'باقة العمرة المميزة',
    price: 1850,
    currency: 'MAD',
    hotelMakkah: 'Pullman ZamZam Makkah',
    hotelMedina: 'Anwar Al Madinah Mövenpick',
    hotelStars: 5,
    airline: 'Saudia Airlines',
    durationNights: 14,
    durationDays: 15,
    departure: '2026-11-10',
    returnDate: '2026-11-24',
    image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=80',
    featured: true,
    includes: ['Round-trip flights', '5-star hotel', 'Visa processing', 'Airport transfers', 'Guided tours', '24/7 support'],
  },
  {
    id: 'umrah-classic',
    type: 'umrah',
    nameEn: 'Classic Umrah Package',
    nameFr: 'Forfait Omra Classique',
    nameAr: 'باقة العمرة الكلاسيكية',
    price: 1250,
    currency: 'MAD',
    hotelMakkah: 'Makkah Clock Royal Tower',
    hotelMedina: 'Pullman Madinah',
    hotelStars: 5,
    airline: 'Air Algérie',
    durationNights: 10,
    durationDays: 11,
    departure: '2026-12-05',
    returnDate: '2026-12-15',
    image: 'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=800&q=80',
    featured: true,
    includes: ['Round-trip flights', '5-star hotel', 'Visa processing', 'Airport transfers', 'Group guidance'],
  },
  {
    id: 'hajj-vip',
    type: 'hajj',
    nameEn: 'VIP Hajj Package 2027',
    nameFr: 'Forfait Hajj VIP 2027',
    nameAr: 'باقة الحج VIP 2027',
    price: 6500,
    currency: 'MAD',
    hotelMakkah: 'Mövenpick Hotel Makkah',
    hotelMedina: 'Oberoi Madinah',
    hotelStars: 5,
    airline: 'Saudia Airlines',
    durationNights: 21,
    durationDays: 22,
    departure: '2027-05-15',
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&q=80',
    featured: true,
    includes: ['Round-trip flights', '5-star hotel in Makkah & Madinah', 'Hajj visa', 'All transfers', 'Professional guide', 'Meals included', 'Ihram clothing', '24/7 VIP support'],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    nameEn: 'Ahmed Benali',
    nameAr: 'أحمد بن علي',
    nameFr: 'Ahmed Benali',
    reviewEn: 'Alhamdulillah, the best Umrah experience of my life. New Star Travel took care of everything perfectly. The hotel was steps from the Haram and the team was incredibly supportive throughout the journey.',
    reviewAr: 'الحمد لله، كانت أفضل تجربة عمرة في حياتي. اهتمت نيو ستار للسياحة بكل شيء بشكل مثالي. كان الفندق على بعد خطوات من الحرم والفريق كان داعماً بشكل لا يصدق طوال الرحلة.',
    reviewFr: 'Alhamdulillah, la meilleure expérience d\'Omra de ma vie. New Star Travel a tout géré parfaitement. L\'hôtel était à deux pas du Haram et l\'équipe était incroyablement solidaire.',
    rating: 5,
    city: 'Algiers',
    avatar: 'A',
  },
  {
    id: '2',
    nameEn: 'Fatima Zahra Khelif',
    nameAr: 'فاطمة الزهراء خليف',
    nameFr: 'Fatima Zahra Khelif',
    reviewEn: 'I was nervous about traveling alone but the New Star team made me feel safe and guided at every step. Truly a spiritual journey I will cherish forever.',
    reviewAr: 'كنت قلقة من السفر وحدي لكن فريق نيو ستار جعلني أشعر بالأمان والتوجيه في كل خطوة. رحلة روحية احتفظ بها في قلبي للأبد.',
    reviewFr: 'J\'avais peur de voyager seule mais l\'équipe de New Star m\'a fait sentir en sécurité et guidée à chaque étape. Un voyage spirituel que je chérirai pour toujours.',
    rating: 5,
    city: 'Oran',
    avatar: 'F',
  },
  {
    id: '3',
    nameEn: 'Mohamed Lamine Oussaid',
    nameAr: 'محمد الأمين وسعيد',
    nameFr: 'Mohamed Lamine Oussaid',
    reviewEn: 'Excellent service from start to finish. The visa was processed in record time and our guide was very knowledgeable. I recommend New Star Travel to everyone.',
    reviewAr: 'خدمة ممتازة من البداية إلى النهاية. تمت معالجة التأشيرة في وقت قياسي ومرشدنا كان على دراية واسعة. أوصي بنيو ستار للسياحة للجميع.',
    reviewFr: 'Excellent service du début à la fin. Le visa a été traité en un temps record et notre guide était très compétent. Je recommande New Star Travel à tout le monde.',
    rating: 5,
    city: 'Constantine',
    avatar: 'M',
  },
  {
    id: '4',
    nameEn: 'Nadia Boumediene',
    nameAr: 'نادية بومدين',
    nameFr: 'Nadia Boumediene',
    reviewEn: 'The VIP Hajj package was worth every penny. 5-star hotels in both Makkah and Madinah, meals provided, and a wonderful guide who explained everything beautifully.',
    reviewAr: 'باقة الحج VIP كانت تستحق كل قرش. فنادق خمس نجوم في مكة المكرمة والمدينة المنورة، وجبات مقدمة، ومرشد رائع شرح كل شيء بشكل جميل.',
    reviewFr: 'Le forfait Hajj VIP valait chaque centime. Hôtels 5 étoiles à La Mecque et Médine, repas fournis, et un guide merveilleux qui a tout expliqué magnifiquement.',
    rating: 5,
    city: 'Annaba',
    avatar: 'N',
  },
];

export const sampleBookings: Booking[] = [
  {
    id: 'BK001',
    customerName: 'Ahmed Benali',
    email: 'ahmed@email.com',
    phone: '+213 555 001 002',
    packageId: 'umrah-premium',
    packageName: 'Premium Umrah Package',
    travelers: 2,
    totalPrice: 3700,
    status: 'confirmed',
    date: '2026-09-01',
  },
  {
    id: 'BK002',
    customerName: 'Sara Mansouri',
    email: 'sara@email.com',
    phone: '+213 555 003 004',
    packageId: 'umrah-classic',
    packageName: 'Classic Umrah Package',
    travelers: 1,
    totalPrice: 1250,
    status: 'pending',
    date: '2026-09-03',
  },
  {
    id: 'BK003',
    customerName: 'Karim Hamidi',
    email: 'karim@email.com',
    phone: '+213 555 005 006',
    packageId: 'hajj-vip',
    packageName: 'VIP Hajj Package 2027',
    travelers: 3,
    totalPrice: 19500,
    status: 'paid',
    date: '2026-08-28',
  },
  {
    id: 'BK004',
    customerName: 'Leila Bouzid',
    email: 'leila@email.com',
    phone: '+213 555 007 008',
    packageId: 'umrah-classic',
    packageName: 'Classic Umrah Package',
    travelers: 2,
    totalPrice: 2500,
    status: 'pending',
    date: '2026-09-05',
  },
];


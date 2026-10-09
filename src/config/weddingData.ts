/**
 * Central Wedding Invitation Configuration
 * 
 * Customize any of the values below to update the entire invitation website instantly.
 * Everything from names, dates, venues, entourage, dress code, RSVP to gift details
 * is configured here.
 */

import heroGardenArch from '../assets/images/hero_garden_arch_1791553445795.jpg';
import coupleProposal from '../assets/images/couple_proposal_1791553458528.jpg';
import receptionBanquet from '../assets/images/reception_banquet_1791553470675.jpg';
import bridalBouquet from '../assets/images/bridal_bouquet_1791553482071.jpg';

export interface Milestone {
  id: string;
  title: string;
  date: string;
  location: string;
  story: string;
  image: string;
}

export interface EntourageMember {
  role: string;
  names: string[];
}

export interface Swatch {
  name: string;
  color: string;
  note?: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  title: string;
  caption: string;
  aspect?: string;
}

export interface WeddingConfig {
  couple: {
    brideFirstName: string;
    brideLastName: string;
    groomFirstName: string;
    groomLastName: string;
    initials: string;
    displayName: string;
    hashtag: string;
    welcomeKicker: string;
    welcomeSubtitle: string;
    invitationVerse: string;
  };
  schedule: {
    weddingDateISO: string; // ISO date for countdown
    displayDate: string;
    dayOfWeek: string;
    ceremonyTime: string;
    receptionTime: string;
  };
  venues: {
    ceremony: {
      name: string;
      hall: string;
      address: string;
      cityState: string;
      googleMapsUrl: string;
      notes: string;
    };
    reception: {
      name: string;
      hall: string;
      address: string;
      cityState: string;
      googleMapsUrl: string;
      notes: string;
    };
  };
  loveStory: Milestone[];
  entourage: {
    parentsBride: string[];
    parentsGroom: string[];
    maidOfHonor: string;
    bestMan: string;
    principalSponsors: { sponsor: string; spouse?: string }[];
    bridesmaids: string[];
    groomsmen: string[];
    flowerGirls: string[];
    ringBearer: string;
    bibleBearer: string;
    coinBearer: string;
  };
  dressCode: {
    title: string;
    attireType: string;
    description: string;
    sponsorsAttire: string;
    guestsAttire: string;
    palette: Swatch[];
    colorsToAvoid: string[];
    guidelines: {
      title: string;
      description: string;
    }[];
  };
  rsvp: {
    deadline: string;
    maxGuestsPerParty: number;
    mealOptions: { id: string; name: string; description: string }[];
    contactEmail: string;
  };
  gifts: {
    message: string;
    bankTransfer: {
      bankName: string;
      accountName: string;
      accountNumber: string;
      routingOrBic: string;
    };
    eWallet: {
      service: string;
      handle: string;
      qrNote?: string;
    };
    registryUrl?: string;
  };
  gallery: GalleryPhoto[];
  music: {
    title: string;
    artist: string;
    autoplayHint: string;
  };
}

export const initialWeddingConfig: WeddingConfig = {
  couple: {
    brideFirstName: "Eleanor",
    brideLastName: "Vance",
    groomFirstName: "Julian",
    groomLastName: "Montgomery",
    initials: "E & J",
    displayName: "Eleanor & Julian",
    hashtag: "#EleanorAndJulianInManila",
    welcomeKicker: "Together With Their Families",
    welcomeSubtitle: "Invite you to witness and celebrate their union in holy matrimony",
    invitationVerse: "“I have found the one whom my soul loves.” — Song of Solomon 3:4",
  },
  schedule: {
    weddingDateISO: "2027-12-18T15:00:00",
    displayDate: "December 18, 2027",
    dayOfWeek: "Saturday Afternoon",
    ceremonyTime: "3:00 PM",
    receptionTime: "5:30 PM - 11:00 PM",
  },
  venues: {
    ceremony: {
      name: "San Agustin Church",
      hall: "The Historic UNESCO World Heritage Archdiocesan Shrine",
      address: "General Luna Street, Intramuros",
      cityState: "Manila, 1002 Metro Manila, Philippines",
      googleMapsUrl: "https://maps.google.com/?q=San+Agustin+Church+Intramuros+Manila",
      notes: "Please arrive by 2:30 PM (30 minutes prior) for the solemn Nuptial Mass and processional.",
    },
    reception: {
      name: "The Manila Hotel",
      hall: "The Grand Champagne Room & Fiesta Pavilion",
      address: "One Rizal Park, Ermita",
      cityState: "Manila, 0913 Metro Manila, Philippines",
      googleMapsUrl: "https://maps.google.com/?q=The+Manila+Hotel+One+Rizal+Park+Manila",
      notes: "Cocktail hour begins at 5:30 PM followed by dinner banquet and evening celebration.",
    },
  },
  loveStory: [
    {
      id: "met",
      title: "How We Met",
      date: "October 14, 2021",
      location: "Intramuros, Manila, Philippines",
      story: "A chance meeting along the cobblestone pathways of historic Intramuros. What began as sharing shade beneath a blooming bougainvillea turned into halo-halo and conversations that stretched until the city lights flickered to life.",
      image: bridalBouquet,
    },
    {
      id: "first-date",
      title: "Our First Date",
      date: "October 24, 2021",
      location: "Manila Bay & Rizal Park",
      story: "Julian invited Eleanor to witness the famous golden hour sunset along Manila Bay. With sea breezes in the air and live acoustic melodies nearby, hours slipped away effortlessly.",
      image: heroGardenArch,
    },
    {
      id: "the-moment",
      title: "The Moment We Knew",
      date: "September 03, 2023",
      location: "Tagaytay Ridge, Philippines",
      story: "Overlooking the misty caldera of Taal Lake with warm tsokolate de batirol, sheltering from an unexpected gentle drizzle, we laughed heartily and knew we had found our forever home in each other.",
      image: receptionBanquet,
    },
    {
      id: "proposal",
      title: "The Proposal",
      date: "December 24, 2025",
      location: "El Nido, Palawan, Philippines",
      story: "Under a canopy of fairy lights on a secluded private cove with waves whispering against the shore, Julian knelt with Eleanor's heirloom ring. With happy tears and full hearts, she joyfully said yes.",
      image: coupleProposal,
    },
    {
      id: "forever",
      title: "Our Forever Begins",
      date: "December 18, 2027",
      location: "San Agustin Church, Manila",
      story: "Surrounded by our beloved family, Ninongs, Ninangs, and lifelong friends in the heart of Manila, we seal our sacred vows before God and family.",
      image: heroGardenArch,
    },
  ],
  entourage: {
    parentsBride: ["Mr. Arthur Vance", "Mrs. Evelyn Vance"],
    parentsGroom: ["Dr. Thomas Montgomery", "Mrs. Clara Montgomery"],
    maidOfHonor: "Camilla Vance (Sister of the Bride)",
    bestMan: "Oliver Harrison (Brother of the Heart)",
    principalSponsors: [
      { sponsor: "Hon. Roberto S. Santos", spouse: "Mrs. Margarita Santos" },
      { sponsor: "Engr. Eduardo M. Reyes", spouse: "Dr. Maria Teresa Reyes" },
      { sponsor: "Atty. Fernando C. Cruz", spouse: "Judge Carmen Cruz" },
      { sponsor: "Dr. Antonio L. Garcia", spouse: "Mrs. Victoria Garcia" },
    ],
    bridesmaids: [
      "Seraphina Cole",
      "Isolde Fontaine",
      "Madeline Zhao",
      "Genevieve Ross",
    ],
    groomsmen: [
      "Liam Gallagher",
      "Alexander Ward",
      "Marcus Thorne",
      "Benjamin Scott",
    ],
    flowerGirls: ["Penelope Vance", "Rosalie Montgomery"],
    ringBearer: "Theodore Vance",
    bibleBearer: "Noah Reyes",
    coinBearer: "August Harrison",
  },
  dressCode: {
    title: "Attire & Color Palette",
    attireType: "Modern Filipiniana / Barong Tagalog & Black Tie Formal",
    description: "We invite our cherished guests to celebrate in elegant, modern Filipiniana and formal Filipino wedding attire, harmonized with soft champagne, blush, and botanical tones.",
    sponsorsAttire: "Principal Sponsors (Ninongs & Ninangs): Ninangs in elegant floor-length Modern Filipiniana or formal terno gowns in Champagne, Sage, or Blush; Ninongs in formal Piña Barong Tagalog with dark formal trousers.",
    guestsAttire: "Guests: Ladies in long formal evening gowns or Modern Filipiniana; Gentlemen in classic Barong Tagalog or dark formal suits / tuxedos.",
    palette: [
      { name: "Champagne", color: "#F5EBE1", note: "Luminous & warm" },
      { name: "Blush Rose", color: "#EED7CF", note: "Soft romantic pink" },
      { name: "Sage Green", color: "#8A9A86", note: "Earthy botanical" },
      { name: "Dusty Lavender", color: "#B8A9C9", note: "Whimsical twilight" },
      { name: "Muted Gold", color: "#C5A059", note: "Subtle metallic sheen" },
      { name: "Warm Ivory", color: "#FAF7F2", note: "Linen & light tones" },
    ],
    colorsToAvoid: [
      "Pure Bridal White & Alabaster (Reserved exclusively for the bride)",
      "Striking Neon & Day-Glo colors",
    ],
    guidelines: [
      {
        title: "Unplugged Ceremony",
        description: "We kindly request that phones and personal cameras remain silenced and tucked away during the solemn Nuptial Mass. Our official photo and video team will capture every sacred moment.",
      },
      {
        title: "Punctuality & Arrival",
        description: "Please plan to arrive at San Agustin Church by 2:30 PM (30 minutes before the 3:00 PM processional) so everyone may be seated comfortably.",
      },
      {
        title: "Climate & Venue Comfort",
        description: "Both San Agustin Church and The Manila Hotel banquet halls are fully air-conditioned for your comfort throughout the ceremony and reception.",
      },
      {
        title: "Adult Reception",
        description: "While we love all the little ones in our lives, our evening banquet is reserved for adults, except for children belonging to our immediate wedding entourage.",
      },
    ],
  },
  rsvp: {
    deadline: "November 15, 2027",
    maxGuestsPerParty: 4,
    mealOptions: [
      {
        id: "beef",
        name: "Slow-Roasted Angus Beef Tenderloin",
        description: "Truffle potato mousseline, peppercorn jus, roasted asparagus and baby carrots",
      },
      {
        id: "fish",
        name: "Pan-Seared Chilean Seabass",
        description: "Citrus beurre blanc, saffron wild rice, charred haricots verts",
      },
      {
        id: "vegetarian",
        name: "Wild Forest Mushroom & Truffle Risotto (V / GF)",
        description: "Arborio rice, chanterelles, shaved pecorino, toasted pine nuts",
      },
      {
        id: "vegan",
        name: "Heirloom Squash & Crispy Polenta (VG / GF)",
        description: "Roasted squash, smoked tomato coulis, toasted pepitas",
      },
    ],
    contactEmail: "eleanor.and.julian.manila@gmail.com",
  },
  gifts: {
    message: "Your presence, love, and prayers at our wedding are the greatest gifts we could ever ask for. Should you wish to honor us with a gift to help us build our new home and honeymoon, monetary gifts via Philippine bank transfer or e-wallet are gratefully received.",
    bankTransfer: {
      bankName: "Bank of the Philippine Islands (BPI)",
      accountName: "Eleanor Vance & Julian Montgomery",
      accountNumber: "3829-1048-52",
      routingOrBic: "BOPIPHMM (Manila Main Branch)",
    },
    eWallet: {
      service: "GCash / Maya",
      handle: "0917-888-LOVE (Eleanor & Julian)",
      qrNote: "Direct GCash & Maya transfer via mobile number or QR",
    },
    registryUrl: "https://www.crateandbarrel.com/registry/eleanor-julian",
  },
  gallery: [
    {
      id: "g1",
      url: heroGardenArch,
      title: "The Sanctuary of Love",
      caption: "Where our promises will echo among ancient stone arches and cascading florals.",
    },
    {
      id: "g2",
      url: coupleProposal,
      title: "Golden Hour Promise",
      caption: "The moment that transformed two separate paths into a shared horizon.",
    },
    {
      id: "g3",
      url: receptionBanquet,
      title: "The Manila Hotel Celebration",
      caption: "A candlelit feast prepared with love to celebrate with those who matter most.",
    },
    {
      id: "g4",
      url: bridalBouquet,
      title: "Botanical Blooms",
      caption: "Garden peonies, delicate sweet peas, and trailing champagne silk ribbons.",
    },
  ],
  music: {
    title: "Canon in D (Romantic Acoustic Harp & Strings)",
    artist: "Garden Classical Ensemble",
    autoplayHint: "Click anywhere or press play to immerse in ambient romantic strings",
  },
};

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
    hashtag: "#EleanorAndJulianInLove",
    welcomeKicker: "Together With Their Families",
    welcomeSubtitle: "Invite you to witness and celebrate their union in marriage",
    invitationVerse: "“I have found the one whom my soul loves.” — Song of Solomon 3:4",
  },
  schedule: {
    weddingDateISO: "2027-06-19T15:30:00",
    displayDate: "June 19, 2027",
    dayOfWeek: "Saturday Afternoon",
    ceremonyTime: "3:30 PM",
    receptionTime: "5:30 PM - 11:00 PM",
  },
  venues: {
    ceremony: {
      name: "St. Claire Botanical Chapel",
      hall: "The Historic Glass Conservatory",
      address: "420 Whispering Pines Way",
      cityState: "Carmel-by-the-Sea, CA 93921",
      googleMapsUrl: "https://maps.google.com/?q=Carmel-by-the-Sea+Botanical+Chapel",
      notes: "Please arrive 30 minutes prior to ensure a peaceful start.",
    },
    reception: {
      name: "The Rosewood Orangery & Estate",
      hall: "Grand Garden Pavilion & Courtyard",
      address: "850 Cypress Grove Lane",
      cityState: "Carmel Valley, CA 93924",
      googleMapsUrl: "https://maps.google.com/?q=Carmel+Valley+Rosewood+Estate",
      notes: "Cocktail hour begins immediately following the ceremony in the East Garden.",
    },
  },
  loveStory: [
    {
      id: "met",
      title: "How We Met",
      date: "October 14, 2021",
      location: "San Francisco, California",
      story: "A chance meeting at an art exhibition opening in North Beach. What started as an accidental conversation about an impressionist oil painting turned into coffee that lasted until the cafe closed.",
      image: bridalBouquet,
    },
    {
      id: "first-date",
      title: "Our First Date",
      date: "October 22, 2021",
      location: "Golden Gate Botanical Gardens",
      story: "Julian brought homemade lavender shortbread cookies, and Eleanor brought her favorite film camera. We walked through the blooming magnolias for hours under autumn sun.",
      image: heroGardenArch,
    },
    {
      id: "the-moment",
      title: "The Moment We Knew",
      date: "September 03, 2023",
      location: "Big Sur Coastline",
      story: "Caught in an unexpected coastal drizzle overlooking the ocean waves, sheltering under a small umbrella and laughing uncontrollably. We both knew right then this was our forever.",
      image: receptionBanquet,
    },
    {
      id: "proposal",
      title: "The Proposal",
      date: "December 24, 2025",
      location: "Château de Courances Gardens",
      story: "During a quiet sunset stroll beneath century-old weeping willows lit by twinkling lanterns, Julian dropped to one knee with Eleanor’s grandmother’s heirloom ring. With happy tears, she said yes.",
      image: coupleProposal,
    },
    {
      id: "forever",
      title: "Our Forever Begins",
      date: "June 19, 2027",
      location: "Carmel-by-the-Sea",
      story: "Surrounded by our dearest family and friends, we stand at the threshold of a lifetime of shared dreams, laughter, adventures, and unconditional devotion.",
      image: heroGardenArch,
    },
  ],
  entourage: {
    parentsBride: ["Mr. Arthur Vance", "Mrs. Evelyn Vance"],
    parentsGroom: ["Dr. Thomas Montgomery", "Mrs. Clara Montgomery"],
    maidOfHonor: "Camilla Vance (Sister of the Bride)",
    bestMan: "Oliver Harrison (Brother of the Heart)",
    principalSponsors: [
      { sponsor: "Judge Robert Sterling", spouse: "Mrs. Margaret Sterling" },
      { sponsor: "Mr. Henry Fairchild", spouse: "Dr. Beatrice Fairchild" },
      { sponsor: "Mr. Kenneth Crawford", spouse: "Mrs. Diane Crawford" },
      { sponsor: "Governor Edward Bennett", spouse: "Mrs. Victoria Bennett" },
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
    bibleBearer: "Noah Fairchild",
    coinBearer: "August Harrison",
  },
  dressCode: {
    title: "Attire & Color Palette",
    attireType: "Garden Black Tie & Elegant Evening Attire",
    description: "We invite our cherished guests to dress in romantic, garden-inspired formal attire. Think airy gowns, bespoke suits, and soft botanical color harmonies.",
    sponsorsAttire: "Principal Sponsors: Floor-length formal gowns in Sage or Champagne; Dark tuxedos or classic charcoal suits with champagne ties.",
    guestsAttire: "Guests: Long evening dresses, sophisticated cocktail gowns, dark suits, or classic tuxedos.",
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
      "High-contrast Neon & Day-Glo colors",
    ],
    guidelines: [
      {
        title: "Unplugged Ceremony",
        description: "We kindly request that phones and personal cameras remain silenced and tucked away during the vows. Our professional photographers will capture every moment, and we want you fully present with us.",
      },
      {
        title: "Punctuality & Arrival",
        description: "Please plan to arrive at the chapel by 3:00 PM (30 minutes before the 3:30 PM processional) so everyone may be seated comfortably.",
      },
      {
        title: "Adult Reception",
        description: "While we love all the little ones in our lives, our evening reception will be an adults-only celebration, except for children in the immediate wedding entourage.",
      },
      {
        title: "Footwear Consideration",
        description: "The cocktail hour will be held on the manicured estate lawn. Block heels, wedges, or stylish flats are recommended for lawn comfort.",
      },
    ],
  },
  rsvp: {
    deadline: "May 15, 2027",
    maxGuestsPerParty: 4,
    mealOptions: [
      {
        id: "salmon",
        name: "Wild Herb-Crusted Pacific Salmon",
        description: "Meyer lemon beurre blanc, charred asparagus, saffron risotto cake",
      },
      {
        id: "beef",
        name: "Rosemary Roasted Prime Tenderloin",
        description: "Cabernet reduction, truffle potato purée, baby roasted carrots",
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
    contactEmail: "eleanor.and.julian.wedding@gmail.com",
  },
  gifts: {
    message: "Your presence, love, and prayers at our wedding are the greatest gifts we could ever ask for. Should you wish to honor us with a gift to help us build our new home and embark on our honeymoon adventure, we would be deeply touched and grateful.",
    bankTransfer: {
      bankName: "First Heritage Bank of California",
      accountName: "Eleanor Vance & Julian Montgomery",
      accountNumber: "9482-1049-3820",
      routingOrBic: "121000358",
    },
    eWallet: {
      service: "Zelle / Venmo",
      handle: "@Eleanor-Julian-Wedding",
      qrNote: "Scan or search our handle directly in your banking app",
    },
    registryUrl: "https://www.crateandbarrel.com/registry/eleanor-julian",
  },
  gallery: [
    {
      id: "g1",
      url: heroGardenArch,
      title: "The Garden Sanctuary",
      caption: "Where our promises will echo among ancient pines and blooming garden roses.",
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
      title: "The Orangery Gathering",
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

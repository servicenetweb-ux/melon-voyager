import { PageType, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const sampleImageUrl =
  "/uploads/1781627755008-6efaa59d-36dd-43c0-9491-af64c3b8a163.png";

const navigationItems = [
  { label: "Home", href: "/", order: 0 },
  { label: "Excursions", href: "/excursions", order: 1 },
  { label: "Car Rental", href: "/car-rental", order: 2 },
  { label: "About", href: "/about", order: 3 },
  { label: "Contact", href: "/contact", order: 4 },
];

const pages = [
  {
    type: PageType.HOME,
    slug: "home",
    title: "Home",
    subtitle: "Discover Crete with Melon Travel.",
    heroBadge: "Crete travel agency",
    heroTitle: "Bright island experiences, made simple",
    heroSubtitle:
      "Book unforgettable excursions and flexible car rentals from one fully manageable travel website.",
    heroButtonText: "Explore excursions",
    heroButtonLink: "/excursions",
    seoTitle: "Melon Travel | Excursions and Car Rental in Crete",
    seoDescription:
      "Discover Crete with curated excursions, cruises, jeep safari adventures and easy car rental.",
    order: 0,
  },
  {
    type: PageType.EXCURSIONS,
    slug: "excursions",
    title: "Excursions",
    subtitle: "Choose your next summer experience.",
    heroBadge: "Tours and cruises",
    heroTitle: "Excursions around Crete and beyond",
    heroSubtitle:
      "Browse editable excursions with durations, available days, meeting points and booking details.",
    heroButtonText: "Contact us",
    heroButtonLink: "/contact",
    seoTitle: "Excursions in Crete | Melon Travel",
    seoDescription:
      "Find day trips, cruises and adventure tours from Melon Travel.",
    order: 1,
  },
  {
    type: PageType.CAR_RENTAL,
    slug: "car-rental",
    title: "Car Rental",
    subtitle: "Explore the island with comfort and freedom.",
    heroBadge: "Flexible rentals",
    heroTitle: "Car rental for every Crete itinerary",
    heroSubtitle:
      "Manage categories, cars, features and cover images from the admin area.",
    heroButtonText: "View cars",
    heroButtonLink: "/car-rental",
    seoTitle: "Car Rental in Crete | Melon Travel",
    seoDescription:
      "Rent comfortable cars for your holiday in Crete with Melon Travel.",
    order: 2,
  },
  {
    type: PageType.ABOUT,
    slug: "about",
    title: "About",
    subtitle: "A local travel team with a flexible CMS.",
    heroBadge: "About Melon Travel",
    heroTitle: "Local travel knowledge, easy online management",
    heroSubtitle:
      "Update company content, images, SEO and website sections without touching code.",
    heroButtonText: "Get in touch",
    heroButtonLink: "/contact",
    seoTitle: "About Melon Travel",
    seoDescription:
      "Learn more about Melon Travel and its excursion and car rental services.",
    order: 3,
  },
  {
    type: PageType.CONTACT,
    slug: "contact",
    title: "Contact",
    subtitle: "Send us a message or reach us directly.",
    heroBadge: "Contact",
    heroTitle: "Plan your next Crete experience",
    heroSubtitle:
      "Call, WhatsApp or send a booking request for excursions and car rentals.",
    heroButtonText: "Call now",
    heroButtonLink: "tel:+302821000000",
    seoTitle: "Contact Melon Travel",
    seoDescription:
      "Contact Melon Travel for excursions, cruises and car rental in Crete.",
    order: 4,
  },
];

const homeSections = [
  {
    key: "featured-excursions",
    title: "Featured Excursions",
    subtitle: "Handpicked summer experiences",
    body: "Promote the most important excursions on the homepage.",
    order: 0,
  },
  {
    key: "featured-cars",
    title: "Featured Cars",
    subtitle: "Simple car rental options",
    body: "Show selected vehicles for visitors who want to explore Crete freely.",
    order: 1,
  },
  {
    key: "why-choose-us",
    title: "Why Choose Us",
    subtitle: "Local, friendly and flexible",
    body: "Editable content blocks help you explain what makes the agency trustworthy.",
    order: 2,
  },
  {
    key: "contact-cta",
    title: "Ready to plan your trip?",
    subtitle: "We are here to help",
    body: "Send a booking request, call directly or continue the conversation on WhatsApp.",
    buttonLabel: "Contact Melon Travel",
    buttonHref: "/contact",
    order: 3,
  },
];

const excursions = [
  {
    title: "Balos & Gramvousa",
    slug: "balos-gramvousa",
    categorySlug: "sailing-tours",
    shortDescription:
      "A classic boat trip to turquoise waters, wild landscapes and the famous Balos lagoon.",
    fullDescription:
      "Visit Gramvousa island and Balos lagoon on a full-day excursion with unforgettable sea views, swimming time and photo stops.",
    duration: "Full day",
    availableDays: "Mon / Wed / Fri",
    departureTime: "08:00",
    returnTime: "18:30",
    included: "Boat ticket\nBasic travel assistance\nPickup information",
    notIncluded: "Meals\nPersonal expenses\nEntrance fees where applicable",
    meetingPoint: "Kissamos port or selected pickup points",
    featured: true,
    order: 0,
  },
  {
    title: "Jeep Safari",
    slug: "jeep-safari",
    categorySlug: "safari",
    shortDescription:
      "Adventure through mountain roads, traditional villages and panoramic viewpoints.",
    fullDescription:
      "Enjoy a guided jeep safari that combines local culture, nature, off-road routes and stops for photos and relaxation.",
    duration: "7 hours",
    availableDays: "Tue / Thu / Sat",
    departureTime: "09:00",
    returnTime: "16:00",
    included: "Guide\nJeep route\nVillage stops\nPickup information",
    notIncluded: "Lunch\nDrinks\nPersonal expenses",
    meetingPoint: "Hotel pickup on request",
    featured: true,
    order: 1,
  },
  {
    title: "Santorini Cruise",
    slug: "santorini-cruise",
    categorySlug: "sailing-tours",
    shortDescription:
      "A memorable cruise from Crete to Santorini with time to explore iconic island views.",
    fullDescription:
      "Travel by boat to Santorini and discover whitewashed villages, caldera views and the unique atmosphere of the Aegean.",
    duration: "Full day",
    availableDays: "Selected dates",
    departureTime: "07:00",
    returnTime: "21:00",
    included: "Boat ticket\nIsland transfer guidance\nTravel assistance",
    notIncluded: "Meals\nOptional tours\nPersonal expenses",
    meetingPoint: "Heraklion port",
    featured: true,
    order: 2,
  },
  {
    title: "Elafonisi Beach",
    slug: "elafonisi-beach",
    categorySlug: "bus-tours",
    shortDescription:
      "A relaxing beach day at one of Crete's most famous pink-sand coastlines.",
    fullDescription:
      "Travel across western Crete to Elafonisi for swimming, beach time and easy photo stops along the route.",
    duration: "Full day",
    availableDays: "Mon / Thu / Sun",
    departureTime: "08:30",
    returnTime: "18:00",
    included: "Bus transfer\nTravel assistance\nPickup information",
    notIncluded: "Meals\nSunbeds\nPersonal expenses",
    meetingPoint: "Selected pickup points",
    featured: true,
    order: 3,
  },
  {
    title: "Samaria Gorge",
    slug: "samaria-gorge",
    categorySlug: "bus-tours",
    shortDescription:
      "A classic hiking day through Crete's legendary gorge and dramatic landscapes.",
    fullDescription:
      "Walk through Samaria Gorge with organized transfer details, ferry connection information and time to enjoy the south coast.",
    duration: "Full day",
    availableDays: "Tue / Fri",
    departureTime: "06:00",
    returnTime: "20:00",
    included: "Bus transfer\nPickup information\nTravel assistance",
    notIncluded: "Entrance ticket\nFerry ticket\nMeals",
    meetingPoint: "Selected pickup points",
    featured: true,
    order: 4,
  },
  {
    title: "Wine & Villages Tour",
    slug: "wine-villages-tour",
    categorySlug: "bus-tours",
    shortDescription:
      "A gentle cultural route through local villages, tastes and Cretan scenery.",
    fullDescription:
      "Discover traditional villages, local products and relaxed countryside stops on an easy half-day tour.",
    duration: "Half day",
    availableDays: "Wed / Sat",
    departureTime: "10:00",
    returnTime: "15:00",
    included: "Local stops\nTravel assistance\nPickup information",
    notIncluded: "Tastings where applicable\nMeals\nPersonal expenses",
    meetingPoint: "Hotel pickup on request",
    featured: true,
    order: 5,
  },
];

const excursionCategories = [
  { name: "Safari", slug: "safari", order: 0 },
  { name: "Bus Tours", slug: "bus-tours", order: 1 },
  { name: "Sailing Tours", slug: "sailing-tours", order: 2 },
];

async function seedSettings() {
  await prisma.siteSettings.upsert({
    where: { id: "main-settings" },
    update: {
      companyName: "Melon Travel",
      tagline: "Excursions and car rental in Crete.",
      phone: "+30 28210 00000",
      whatsapp: "+30 690 000 0000",
      email: "info@melontravel.example",
      address: "Chania, Crete, Greece",
      facebookUrl: "https://facebook.com/melontravel",
      instagramUrl: "https://instagram.com/melontravel",
      primaryColor: "#00BCD4",
      secondaryColor: "#0077B6",
      accentColor: "#FFB347",
      backgroundColor: sampleImageUrl,
      seoTitle: "Melon Travel | Crete Excursions and Car Rental",
      seoDescription:
        "A fully manageable travel agency website for excursions and car rentals.",
      ogImageUrl: sampleImageUrl,
    },
    create: {
      id: "main-settings",
      companyName: "Melon Travel",
      tagline: "Excursions and car rental in Crete.",
      logoUrl: sampleImageUrl,
      phone: "+30 28210 00000",
      whatsapp: "+30 690 000 0000",
      email: "info@melontravel.example",
      address: "Chania, Crete, Greece",
      facebookUrl: "https://facebook.com/melontravel",
      instagramUrl: "https://instagram.com/melontravel",
      facebookActive: true,
      instagramActive: true,
      primaryColor: "#00BCD4",
      secondaryColor: "#0077B6",
      accentColor: "#FFB347",
      backgroundColor: sampleImageUrl,
      adminUsername: "admin",
      adminPassword: "melonadmin2026",
      seoTitle: "Melon Travel | Crete Excursions and Car Rental",
      seoDescription:
        "A fully manageable travel agency website for excursions and car rentals.",
      ogImageUrl: sampleImageUrl,
    },
  });
}

async function seedNavigation() {
  for (const item of navigationItems) {
    const existing = await prisma.navigationItem.findFirst({
      where: { href: item.href },
    });

    if (existing) {
      await prisma.navigationItem.update({
        where: { id: existing.id },
        data: { ...item, active: true },
      });
      continue;
    }

    await prisma.navigationItem.create({
      data: { ...item, active: true },
    });
  }
}

async function seedPages() {
  for (const page of pages) {
    await prisma.page.upsert({
      where: { slug: page.slug },
      update: {
        ...page,
        heroImageUrl: sampleImageUrl,
        ogImageUrl: sampleImageUrl,
        active: true,
      },
      create: {
        ...page,
        heroImageUrl: sampleImageUrl,
        ogImageUrl: sampleImageUrl,
        active: true,
      },
    });
  }
}

async function seedHomeSections() {
  const homePage = await prisma.page.findUniqueOrThrow({
    where: { slug: "home" },
  });

  for (const section of homeSections) {
    await prisma.section.upsert({
      where: {
        pageId_key: {
          pageId: homePage.id,
          key: section.key,
        },
      },
      update: {
        ...section,
        imageUrl: sampleImageUrl,
        active: true,
      },
      create: {
        ...section,
        pageId: homePage.id,
        imageUrl: sampleImageUrl,
        active: true,
      },
    });
  }
}

async function seedExcursions() {
  const categories = new Map<string, string>();
  for (const category of excursionCategories) {
    const saved = await prisma.excursionCategory.upsert({
      where: { slug: category.slug },
      update: {
        name: category.name,
        imageUrl: sampleImageUrl,
        active: true,
        order: category.order,
      },
      create: {
        ...category,
        imageUrl: sampleImageUrl,
        active: true,
      },
    });
    categories.set(category.slug, saved.id);
  }

  for (const excursion of excursions) {
    const { categorySlug, ...data } = excursion;
    await prisma.excursion.upsert({
      where: { slug: data.slug },
      update: {
        ...data,
        categoryId: categories.get(categorySlug),
        coverImageUrl: sampleImageUrl,
        seoTitle: `${data.title} | Melon Travel`,
        seoDescription: data.shortDescription,
        ogImageUrl: sampleImageUrl,
        active: true,
      },
      create: {
        ...data,
        categoryId: categories.get(categorySlug),
        coverImageUrl: sampleImageUrl,
        seoTitle: `${data.title} | Melon Travel`,
        seoDescription: data.shortDescription,
        ogImageUrl: sampleImageUrl,
        active: true,
      },
    });
  }
}

async function seedCars() {
  const economy = await prisma.carCategory.upsert({
    where: { slug: "economy" },
    update: {
      name: "Economy",
      imageUrl: sampleImageUrl,
      active: true,
      order: 0,
    },
    create: {
      name: "Economy",
      slug: "economy",
      imageUrl: sampleImageUrl,
      active: true,
      order: 0,
    },
  });

  await prisma.car.upsert({
    where: { slug: "economy-car" },
    update: {
      categoryId: economy.id,
      name: "Economy Car",
      description:
        "A compact and practical rental car for daily trips around Crete.",
      coverImageUrl: sampleImageUrl,
      features: "Air conditioning\nManual transmission\n5 seats\nSmall luggage",
      featured: true,
      active: true,
      seoTitle: "Economy Car Rental | Melon Travel",
      seoDescription:
        "Rent an economy car in Crete for flexible island exploration.",
      ogImageUrl: sampleImageUrl,
      order: 0,
    },
    create: {
      categoryId: economy.id,
      name: "Economy Car",
      slug: "economy-car",
      description:
        "A compact and practical rental car for daily trips around Crete.",
      coverImageUrl: sampleImageUrl,
      features: "Air conditioning\nManual transmission\n5 seats\nSmall luggage",
      featured: true,
      active: true,
      seoTitle: "Economy Car Rental | Melon Travel",
      seoDescription:
        "Rent an economy car in Crete for flexible island exploration.",
      ogImageUrl: sampleImageUrl,
      order: 0,
    },
  });
}

async function seedMedia() {
  const existing = await prisma.media.findFirst({
    where: { url: sampleImageUrl },
  });

  if (existing) {
    await prisma.media.update({
      where: { id: existing.id },
      data: {
        type: "IMAGE",
        title: "Melon Travel sample image",
        altText: "Melon Travel summer destination",
      },
    });
    return;
  }

  await prisma.media.create({
    data: {
      type: "IMAGE",
      url: sampleImageUrl,
      title: "Melon Travel sample image",
      altText: "Melon Travel summer destination",
    },
  });
}

async function main() {
  await seedSettings();
  await seedNavigation();
  await seedPages();
  await seedHomeSections();
  await seedExcursions();
  await seedCars();
  await seedMedia();
}

main()
  .then(async () => {
    console.log("Seed completed.");
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

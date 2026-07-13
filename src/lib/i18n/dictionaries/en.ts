export const en = {
  nav: {
    modern: "Modern",
    retro: "Retro",
    nationalTeam: "National Team",
    promotions: "Promotions",
    cart: "Cart",
    home: "Home",
  },
  common: {
    jerseyCount: (n: number) => `${n} jersey${n === 1 ? "" : "s"}`,
  },
  delivery: {
    message:
      "After your order is confirmed by us, delivery takes between 6–18 days depending on your location.",
    mailFee: "Mail deliveries have a €5 fee.",
  },
  availability: {
    confirmMessage: "Contact us to Confirm Availability (Usually less than 24h)",
  },
  trust: {
    premiumQuality: {
      title: "Premium Quality",
      description: "Carefully selected fabrics and finishing on every jersey we ship.",
    },
    embroidery: {
      title: "Embroidery",
      description: "Crests and details embroidered, not printed, for a true matchday feel.",
    },
    label: {
      title: "Label",
      description: "Each jersey comes with its label neatly sewn in for a clean, complete look.",
    },
    packaging: {
      title: "Protected Packaging",
      description: "Sealed and cushioned packaging so your jersey arrives in perfect condition.",
    },
  },
  header: {
    searchPlaceholder: "Search by club, year, home or away…",
    searchAriaLabel: "Search jerseys",
    searchClearAriaLabel: "Clear search",
    searchNoResults: (q: string) => `No jerseys found for "${q}".`,
    searchViewAllResults: (n: number) => `View all ${n} results`,
    openMenuAriaLabel: "Open menu",
    viewCartAriaLabel: "View cart",
  },
  footer: {
    shopHeading: "Shop",
    goodToKnowHeading: "Good to know",
    deliveryHeading: "Delivery & contact",
    whatsappPrefix: "WhatsApp",
    rightsReserved: "All rights reserved.",
    tagline: "Made for supporters, by supporters.",
  },
  account: {
    myAccount: "My Account",
    pts: "pts",
    signedInAs: (username: string) => `Signed in as ${username}`,
    signedInAsLabel: "Signed in as",
    pointsAccumulated: (points: number) => `★ ${points} points accumulated`,
    yourPoints: "Your points",
    adminHeading: "Admin",
    metaTitle: "My Account",
  },
  auth: {
    login: "Log in",
    signup: "Sign up",
    logout: "Log out",
    username: "Username",
    password: "Password",
    confirmPassword: "Confirm password",
    loggingIn: "Logging in…",
    creatingAccount: "Creating account…",
    createAccount: "Create account",
    noAccount: "Don't have an account?",
    haveAccount: "Already have an account?",
    loginTitle: "Welcome back",
    loginDescription: "Log in to see your points and account.",
    registerTitle: "Create your account",
    registerDescription: "Just a username and password — no email needed.",
    loginMetaTitle: "Log in",
    registerMetaTitle: "Sign up",
    errorMissingFields: "Please enter a username and password.",
    errorInvalidCredentials: "Incorrect username or password.",
    errorUsernameTooShort: "Username must be at least 3 characters.",
    errorUsernameInvalidChars: "Username can only contain letters, numbers and underscores.",
    errorPasswordTooShort: "Password must be at least 6 characters.",
    errorPasswordMismatch: "Passwords do not match.",
    errorUsernameTaken: "That username is already taken.",
    errorCouldNotCreate: "Could not create account.",
  },
  hero: {
    shopPromotions: "Shop Promotions",
    exploreCollection: "Explore Collection",
  },
  home: {
    categoryHeading: "Shop by category",
    categorySubheading:
      "From this season's kits to legendary retro classics and national team pride.",
    shopNow: "Shop now",
    howItWorksHeading: "How ordering works",
    howItWorksSubheading: "No complicated checkout — just a quick chat to lock in your order.",
    promotionsHeading: "Current promotions",
    promotionsSubheading: "Limited-time prices — Contact to Buy before they're gone.",
    viewAllPromotions: "View all promotions",
    categories: {
      modern: { label: "Modern", description: "Current-season club and national kits." },
      retro: { label: "Retro", description: "Legendary kits from years past." },
      nationalTeam: {
        label: "National Team",
        description: "Represent your country, home or away.",
      },
      promotions: {
        label: "Promotions",
        description: "Limited-time prices on selected jerseys.",
      },
    },
    steps: {
      browse: {
        title: "Browse & personalize",
        description: "Pick your jersey and size, then add a name & number for just +€2.",
      },
      contact: {
        title: "Contact to confirm",
        description:
          "Send your order on WhatsApp — we confirm availability, usually within 24h.",
      },
      delivery: { title: "Delivery in 6–18 days" },
    },
  },
  categoryPages: {
    modern: {
      metaTitle: "Modern Jerseys",
      description: "Current-season club and national team kits, fresh off the pitch.",
      empty: "No modern jerseys match these filters yet.",
    },
    retro: {
      metaTitle: "Retro Jerseys",
      description: "Legendary kits from years past — classic cuts, iconic eras.",
      empty: "No retro jerseys match these filters yet.",
    },
    nationalTeam: {
      metaTitle: "National Team Jerseys",
      description: "Represent your country, home or away, modern or retro.",
      empty: "No national team jerseys match these filters yet.",
    },
    promotions: {
      metaTitle: "Promotions",
      description: "Limited-time prices on selected jerseys — Contact to Buy before they're gone.",
      empty: "No promotions are running right now — check back soon.",
    },
  },
  filters: {
    allTypes: "All types",
    allEras: "All eras",
    featured: "Featured",
    priceLowHigh: "Price: Low to High",
    priceHighLow: "Price: High to Low",
  },
  product: {
    promotionBadge: "Promotion",
    confirmAvailabilityBadge: "Confirm availability",
    sizeLabel: "Size",
    sizeConfirmedInStock: "This size is confirmed in stock.",
    sizeHintDefault:
      "XXL and any jersey pending confirmation require us to confirm stock first (usually less than 24h).",
    personalizeLabel: (fee: string) => `Add name & number (+${fee})`,
    nameLabel: "Name",
    namePlaceholder: "e.g. RONALDO",
    numberLabel: "Number",
    numberPlaceholder: "e.g. 7",
    addToCart: "Add to Cart",
    contactConfirmAvailability: "Contact us to Confirm Availability",
    contactToBuy: "Contact to Buy",
    selectSizeToContinue: "Select a size to continue",
    toastSelectSize: "Please select a size first.",
    toastAddedToCart: (clube: string, ano: number) => `${clube} ${ano} added to cart.`,
    cartHintPrefix: "Prefer to browse a bit more?",
    cartHintLink: "View your cart",
    cartHintSuffix: "anytime — everything you add is saved for your WhatsApp order.",
  },
  productPage: {
    homeBreadcrumb: "Home",
    metaTitle: (clube: string, ano: number, tipoLabel: string) =>
      `${clube} ${ano} ${tipoLabel} Jersey`,
    metaDescription: (clube: string, ano: number, tipoLabel: string, eraPhrase: string) =>
      `${clube} ${ano} ${tipoLabel} jersey — ${eraPhrase}. Personalize with a name and number.`,
    eraRetroPhrase: "retro classic",
    eraCurrentPhrase: "current season",
    notFoundMetaTitle: "Jersey not found",
  },
  cart: {
    metaTitle: "Your Cart",
    emptyTitle: "Your cart is empty",
    emptyDescription: "Browse our jerseys and add your favorites — they'll show up here.",
    startShopping: "Start shopping",
    title: "Your Cart",
    clearCart: "Clear cart",
    removeItemAriaLabel: "Remove item",
    nameNumberLine: (name: string, number: string) =>
      `Name: ${name || "—"} / Number: ${number || "—"}`,
    personalizationIncl: (fee: string) => `(incl. +${fee} personalization)`,
    orderSummary: "Order summary",
    itemCount: (n: number) => `${n} item${n === 1 ? "" : "s"}`,
  },
  search: {
    metaTitle: "Search results",
    title: "Search",
    resultsFor: (q: string) => `Search results for "${q}"`,
    jerseysFound: (n: number) => `${n} jersey${n === 1 ? "" : "s"} found`,
    noResultsDetailed: (q: string) =>
      `No jerseys found for "${q}". Try a different club, year or type.`,
    promptStart: "Start typing in the search bar above to find a jersey.",
  },
  notFound: {
    title: "Offside — page not found",
    description: "The page you're looking for doesn't exist or may have been moved.",
    backHome: "Back to home",
  },
  gallery: {
    viewFullSizeAriaLabel: "View full-size photo",
    previousPhotoAriaLabel: "Previous photo",
    nextPhotoAriaLabel: "Next photo",
    expandPhotoAriaLabel: "Expand photo",
    goToPhotoAriaLabel: (n: number) => `Go to photo ${n}`,
    showPhotoAriaLabel: (n: number) => `Show photo ${n}`,
    photoAlt: (clube: string, index: number, count: number) =>
      `${clube} jersey — photo ${index} of ${count}`,
  },
  whatsapp: {
    buyIntro: "Hi RTM Football! I'd like to buy:",
    confirmIntro: "Hi RTM Football! I'd like to confirm availability for:",
    priceLabel: "Price:",
    totalLabel: "Total:",
    nameLabel: "Name:",
    numberLabel: "Number:",
  },
  languagePicker: {
    ariaLabel: "Change language",
  },
};

export type Dictionary = typeof en;

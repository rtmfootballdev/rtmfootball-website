import type { Dictionary } from "./en";

export const pt: Dictionary = {
  nav: {
    modern: "Atual",
    retro: "Retro",
    nationalTeam: "Seleções",
    promotions: "Promoções",
    cart: "Carrinho",
    home: "Início",
  },
  common: {
    jerseyCount: (n) => `${n} camisola${n === 1 ? "" : "s"}`,
  },
  delivery: {
    message:
      "Depois de a sua encomenda ser confirmada por nós, a entrega demora entre 6–18 dias, dependendo da sua localização.",
    mailFee: "As entregas por correio têm uma taxa de 5€.",
  },
  availability: {
    confirmMessage: "Contacte-nos para Confirmar Disponibilidade (normalmente em menos de 24h)",
  },
  trust: {
    premiumQuality: {
      title: "Qualidade Premium",
      description:
        "Tecidos e acabamentos cuidadosamente selecionados em cada camisola que enviamos.",
    },
    embroidery: {
      title: "Bordado",
      description:
        "Emblemas e detalhes bordados, não impressos, para uma verdadeira sensação de jogo.",
    },
    label: {
      title: "Etiqueta",
      description:
        "Cada camisola é entregue com a etiqueta bem costurada, para um acabamento limpo e completo.",
    },
    packaging: {
      title: "Embalagem Protegida",
      description:
        "Embalagem selada e almofadada para que a sua camisola chegue em perfeitas condições.",
    },
  },
  header: {
    searchPlaceholder: "Pesquisar por clube, ano, principal ou alternativa…",
    searchAriaLabel: "Pesquisar camisolas",
    searchClearAriaLabel: "Limpar pesquisa",
    searchNoResults: (q) => `Nenhuma camisola encontrada para "${q}".`,
    searchViewAllResults: (n) => `Ver todos os ${n} resultados`,
    openMenuAriaLabel: "Abrir menu",
    viewCartAriaLabel: "Ver carrinho",
  },
  footer: {
    shopHeading: "Loja",
    goodToKnowHeading: "Bom saber",
    deliveryHeading: "Entrega e contacto",
    whatsappPrefix: "WhatsApp",
    rightsReserved: "Todos os direitos reservados.",
    tagline: "Feito para adeptos, por adeptos.",
  },
  account: {
    myAccount: "Minha Conta",
    pts: "pts",
    signedInAs: (username) => `Sessão iniciada como ${username}`,
    signedInAsLabel: "Sessão iniciada como",
    pointsAccumulated: (points) => `★ ${points} pontos acumulados`,
    yourPoints: "Os seus pontos",
    adminHeading: "Admin",
    metaTitle: "Minha Conta",
  },
  auth: {
    login: "Entrar",
    signup: "Criar conta",
    logout: "Sair",
    username: "Nome de utilizador",
    password: "Palavra-passe",
    confirmPassword: "Confirmar palavra-passe",
    loggingIn: "A entrar…",
    creatingAccount: "A criar conta…",
    createAccount: "Criar conta",
    noAccount: "Não tem conta?",
    haveAccount: "Já tem conta?",
    loginTitle: "Bem-vindo de volta",
    loginDescription: "Inicie sessão para ver os seus pontos e a sua conta.",
    registerTitle: "Crie a sua conta",
    registerDescription: "Só precisa de um nome de utilizador e palavra-passe — sem email.",
    loginMetaTitle: "Entrar",
    registerMetaTitle: "Criar conta",
    errorMissingFields: "Introduza um nome de utilizador e uma palavra-passe.",
    errorInvalidCredentials: "Nome de utilizador ou palavra-passe incorretos.",
    errorUsernameTooShort: "O nome de utilizador deve ter pelo menos 3 caracteres.",
    errorUsernameInvalidChars: "O nome de utilizador só pode conter letras, números e underscores.",
    errorPasswordTooShort: "A palavra-passe deve ter pelo menos 6 caracteres.",
    errorPasswordMismatch: "As palavras-passe não coincidem.",
    errorUsernameTaken: "Esse nome de utilizador já está a ser utilizado.",
    errorCouldNotCreate: "Não foi possível criar a conta.",
  },
  hero: {
    shopPromotions: "Ver Promoções",
    exploreCollection: "Explorar Coleção",
  },
  home: {
    categoryHeading: "Comprar por categoria",
    categorySubheading:
      "Dos equipamentos desta época aos clássicos retro e ao orgulho das seleções nacionais.",
    shopNow: "Comprar agora",
    howItWorksHeading: "Como funciona a encomenda",
    howItWorksSubheading:
      "Sem checkout complicado — só uma conversa rápida para fechar a sua encomenda.",
    promotionsHeading: "Promoções atuais",
    promotionsSubheading: "Preços por tempo limitado — Contacte para Comprar antes que acabem.",
    viewAllPromotions: "Ver todas as promoções",
    categories: {
      modern: { label: "Atual", description: "Equipamentos de clubes e seleções da época atual." },
      retro: { label: "Retro", description: "Equipamentos lendários de épocas passadas." },
      nationalTeam: {
        label: "Seleções",
        description: "Represente o seu país, em casa ou fora.",
      },
      promotions: {
        label: "Promoções",
        description: "Preços por tempo limitado em camisolas selecionadas.",
      },
    },
    steps: {
      browse: {
        title: "Escolha & personalize",
        description:
          "Escolha a sua camisola e tamanho, depois adicione nome & número por apenas +2€.",
      },
      contact: {
        title: "Contacte para confirmar",
        description:
          "Envie a sua encomenda pelo WhatsApp — confirmamos a disponibilidade, normalmente em menos de 24h.",
      },
      delivery: { title: "Entrega em 6–18 dias" },
    },
  },
  categoryPages: {
    modern: {
      metaTitle: "Camisolas Atuais",
      description: "Equipamentos de clubes e seleções da época atual, direto do relvado.",
      empty: "Ainda não há camisolas atuais que correspondam a estes filtros.",
    },
    retro: {
      metaTitle: "Camisolas Retro",
      description: "Equipamentos lendários de épocas passadas — cortes clássicos, eras icónicas.",
      empty: "Ainda não há camisolas retro que correspondam a estes filtros.",
    },
    nationalTeam: {
      metaTitle: "Camisolas de Seleções",
      description: "Represente o seu país, em casa ou fora, atual ou retro.",
      empty: "Ainda não há camisolas de seleções que correspondam a estes filtros.",
    },
    promotions: {
      metaTitle: "Promoções",
      description:
        "Preços por tempo limitado em camisolas selecionadas — Contacte para Comprar antes que acabem.",
      empty: "Não há promoções ativas neste momento — volte em breve.",
    },
  },
  filters: {
    allTypes: "Todos os tipos",
    allEras: "Todas as épocas",
    featured: "Em destaque",
    priceLowHigh: "Preço: Menor para Maior",
    priceHighLow: "Preço: Maior para Menor",
  },
  product: {
    promotionBadge: "Promoção",
    confirmAvailabilityBadge: "Confirmar disponibilidade",
    sizeLabel: "Tamanho",
    sizeConfirmedInStock: "Este tamanho está confirmado em stock.",
    sizeHintDefault:
      "XXL e qualquer camisola pendente de confirmação requerem que confirmemos o stock primeiro (normalmente em menos de 24h).",
    personalizeLabel: (fee) => `Adicionar nome & número (+${fee})`,
    nameLabel: "Nome",
    namePlaceholder: "ex: RONALDO",
    numberLabel: "Número",
    numberPlaceholder: "ex: 7",
    addToCart: "Adicionar ao Carrinho",
    contactConfirmAvailability: "Contacte para Confirmar Disponibilidade",
    contactToBuy: "Contacte para Comprar",
    selectSizeToContinue: "Selecione um tamanho para continuar",
    toastSelectSize: "Selecione um tamanho primeiro.",
    toastAddedToCart: (clube, ano) => `${clube} ${ano} adicionado ao carrinho.`,
    cartHintPrefix: "Prefere continuar a ver mais um pouco?",
    cartHintLink: "Veja o seu carrinho",
    cartHintSuffix:
      "quando quiser — tudo o que adicionar fica guardado para a sua encomenda via WhatsApp.",
  },
  productPage: {
    homeBreadcrumb: "Início",
    metaTitle: (clube, ano, tipoLabel) => `Camisola ${clube} ${ano} ${tipoLabel}`,
    metaDescription: (clube, ano, tipoLabel, eraPhrase) =>
      `Camisola ${clube} ${ano} ${tipoLabel} — ${eraPhrase}. Personalize com nome e número.`,
    eraRetroPhrase: "clássico retro",
    eraCurrentPhrase: "época atual",
    notFoundMetaTitle: "Camisola não encontrada",
  },
  cart: {
    metaTitle: "O seu Carrinho",
    emptyTitle: "O seu carrinho está vazio",
    emptyDescription: "Explore as nossas camisolas e adicione as suas favoritas — vão aparecer aqui.",
    startShopping: "Começar a comprar",
    title: "O seu Carrinho",
    clearCart: "Limpar carrinho",
    removeItemAriaLabel: "Remover item",
    nameNumberLine: (name, number) => `Nome: ${name || "—"} / Número: ${number || "—"}`,
    personalizationIncl: (fee) => `(incl. +${fee} personalização)`,
    orderSummary: "Resumo da encomenda",
    itemCount: (n) => `${n} ${n === 1 ? "artigo" : "artigos"}`,
  },
  search: {
    metaTitle: "Resultados da pesquisa",
    title: "Pesquisar",
    resultsFor: (q) => `Resultados da pesquisa para "${q}"`,
    jerseysFound: (n) => `${n} camisola${n === 1 ? "" : "s"} encontrada${n === 1 ? "" : "s"}`,
    noResultsDetailed: (q) =>
      `Nenhuma camisola encontrada para "${q}". Tente outro clube, ano ou tipo.`,
    promptStart: "Comece a escrever na barra de pesquisa acima para encontrar uma camisola.",
  },
  notFound: {
    title: "Fora de jogo — página não encontrada",
    description: "A página que procura não existe ou pode ter sido movida.",
    backHome: "Voltar ao início",
  },
  gallery: {
    viewFullSizeAriaLabel: "Ver foto em tamanho completo",
    previousPhotoAriaLabel: "Foto anterior",
    nextPhotoAriaLabel: "Foto seguinte",
    expandPhotoAriaLabel: "Ampliar foto",
    goToPhotoAriaLabel: (n) => `Ir para a foto ${n}`,
    showPhotoAriaLabel: (n) => `Mostrar foto ${n}`,
    photoAlt: (clube, index, count) => `Camisola ${clube} — foto ${index} de ${count}`,
  },
  whatsapp: {
    buyIntro: "Olá RTM Football! Gostaria de comprar:",
    confirmIntro: "Olá RTM Football! Gostaria de confirmar a disponibilidade de:",
    priceLabel: "Preço:",
    totalLabel: "Total:",
    nameLabel: "Nome:",
    numberLabel: "Número:",
  },
  languagePicker: {
    ariaLabel: "Mudar idioma",
  },
};

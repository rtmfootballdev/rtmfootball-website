export type Era = "Retro" | "Atual";
export type Tipo = "Home" | "Away";
export type Categoria = "Clube" | "Seleção";
export type Disponibilidade = "Confirmado" | "Sujeita a Confirmação";
export type Size = "S" | "M" | "L" | "XL" | "XXL";

export const SIZES: Size[] = ["S", "M", "L", "XL", "XXL"];

/** Which "shop by category" box on the home page a jersey's first photo represents. */
export type FavoriteSlot = "None" | "Modern" | "Retro" | "National" | "Promotions";

export const FAVORITE_SLOTS: FavoriteSlot[] = [
  "None",
  "Modern",
  "Retro",
  "National",
  "Promotions",
];

export interface Jersey {
  id: string;
  clube: string;
  ano: number;
  era: Era;
  tipo: Tipo;
  categoria: Categoria;
  disponibilidade: Disponibilidade;
  promocao: boolean;
  preco: number;
  novoPreco: number | null;
  fotos: string[];
  favorite: FavoriteSlot;
  createdAt: number;
  updatedAt: number;
}

export type JerseyInput = Omit<Jersey, "id" | "createdAt" | "updatedAt">;

export interface Personalization {
  name: string;
  number: string;
}

export interface CartItem {
  lineId: string;
  jerseyId: string;
  size: Size;
  personalization: Personalization | null;
  addedAt: number;
  snapshot: {
    clube: string;
    ano: number;
    era: Era;
    tipo: Tipo;
    fotoUrl: string;
    unitPrice: number;
  };
}

export interface UserRecord {
  username: string;
  passwordHash: string;
  points: number;
  isAdmin: boolean;
  createdAt: number;
}

export interface PublicUser {
  username: string;
  points: number;
  isAdmin: boolean;
}

export interface SessionData {
  username?: string;
  isAdmin?: boolean;
}

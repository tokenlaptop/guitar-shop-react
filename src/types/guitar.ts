export type Size = 'Full' | '7/8' | '3/4' | '1/2';
export type Condition = 'Mint' | 'Excellent' | 'Good' | 'Fair';

export interface Brand {
  brandId: number;
  name: string;
}

export interface BodyType {
  bodyTypeId: number;
  name: string;
}

export interface GuitarImage {
  imageId: number;
  guitarId: number;
  imageUrl: string;
  isPrimary: boolean;
}

export interface Guitar {
  guitarId: number;
  brandId: number;
  bodyTypeId: number;
  model: string;
  year: number;
  price: number;
  size: Size;
  condition: Condition;
  isSold: boolean;
  description?: string;
  // Optional populated fields from joins
  brandName?: string;
  bodyTypeName?: string;
  images?: GuitarImage[];
}
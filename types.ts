export interface Ingredient {
  id: string;
  name: string;
  description: string;
  // This hue property is the key to the CTF challenge.
  // It maps to an ASCII value.
  hue: number; 
  icon?: string;
}

export interface PotionState {
  ingredients: Ingredient[];
  color: string;
}
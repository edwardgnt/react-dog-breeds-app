export interface RangeValue {
  min: number | null;
  max: number | null;
}

export interface BreedAttributes {
  name: string;
  description?: string;
  life?: RangeValue;
  male_weight?: RangeValue;
  female_weight?: RangeValue;
  hypoallergenic?: boolean;
}

export interface Breed {
  id: string;
  type: "breed";
  attributes: BreedAttributes;
}

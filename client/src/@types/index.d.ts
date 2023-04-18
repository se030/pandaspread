declare interface Dataframe {
  columns: string[];
  index: string[];
  data: string[][];
}

declare interface CategoricalDescription {
  type: 'categorical';
  count: number;
  unique: number;
  top: string;
  freq: number;
}

declare interface NumericalDescription {
  type: 'numerical';
  count: number;
  mean: number;
  std: number;
  min: number;
  max: number;
}

declare type Description = CategoricalDescription & NumericalDescription;

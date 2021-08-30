export type Circle = {
  x: number;
  y: number;
  radius: number;
  name?: string;

  animInfo: {
    velocity: {
      x: number;
      y: number;
    };
  };
};

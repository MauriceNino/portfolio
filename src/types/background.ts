import { Animation, AnimationState } from '../helpers/animations';

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

  scaleAnimation: Animation<{ scale: number }>;
  scaleAnimationState: AnimationState<{ scale: number }> | null;
};

type OnlyNumbers<T> = {
  [key in keyof T]: number;
};

type InternalKeyframes<T> = {
  percentage: number;
  keyframe: OnlyNumbers<T>;
};

export type Animation<T> = {
  keyframes: {
    0: OnlyNumbers<T>;
    100: OnlyNumbers<T>;
    [key: number]: OnlyNumbers<T>;
  };

  duration: number;
  offset: number;
};

export type AnimationState<T> = {
  current: {
    passed: number;
    value: OnlyNumbers<T>;
  };
  done: boolean;
};

const DEFAULT_STATE: AnimationState<any> = {
  current: { passed: 0, value: {} },
  done: false
};
/**
 * animates a value over time
 *
 * @param  {Animation<T>} metadata the animation metadata
 * @param  {AnimationState<T>|null} previousState the previous state of the animation
 * @param  {number} deltaTime the time since the last frame
 * @returns the new state of the animation
 */
export const animate = <T>(
  metadata: Animation<T>,
  previousState: AnimationState<T> | null,
  deltaTime: number
): AnimationState<T> => {
  const { keyframes, duration, offset } = metadata;
  const { current, done } = previousState || DEFAULT_STATE;
  const newTime = current.passed + deltaTime;

  if (keyframes[0] === undefined || keyframes[100] === undefined) {
    throw new Error('Keyframes must have a 0 and 100 key');
  }

  if (done && previousState) {
    return previousState;
  } else if (done && !previousState) {
    return DEFAULT_STATE;
  }

  let newValue = current.value;

  if (newTime > offset) {
    const percentage = ((newTime - offset) / duration) * 100;
    const [start, end] = getRelevantKeyframes<T>(keyframes, percentage);
    newValue = getNewValue<T>(start, end, percentage);
  }

  return {
    current: {
      passed: newTime,
      value: newValue
    },
    done: newTime >= duration + offset
  };
};
/**
 * calculates the new value of the animation
 *
 * @param  {InternalKeyframes<T>} start the start keyframe
 * @param  {InternalKeyframes<T>} end the end keyframe
 * @param  {number} percentage the percentage of the animation
 * @returns the new value of the animation
 */
const getNewValue = <T>(
  start: InternalKeyframes<T>,
  end: InternalKeyframes<T>,
  percentage: number
): OnlyNumbers<T> => {
  //@ts-ignore
  const newValue: OnlyNumbers<T> = {};

  for (let key in start.keyframe) {
    newValue[key] = scaleBetween(start.percentage, end.percentage)(
      start.keyframe[key],
      end.keyframe[key]
    )(percentage, true);
  }

  return newValue;
};
/**
 * calculates the relevant keyframes for a given percentage
 *
 * @param  {Animation<T>['keyframes']} keyframes the keyframes of the animation
 * @param  {number} percentage the current percentage of the animation
 * @returns the two keyframes surrounding the percentage
 */
const getRelevantKeyframes = <T>(
  keyframes: Animation<T>['keyframes'],
  percentage: number
): [InternalKeyframes<T>, InternalKeyframes<T>] => {
  const relevantKeyframes = [
    { percentage: 0, keyframe: keyframes[0] },
    { percentage: 100, keyframe: keyframes[100] }
  ];

  for (let [key, value] of Object.entries(keyframes)) {
    if (+key < percentage && key !== '100') {
      relevantKeyframes[0] = { percentage: +key, keyframe: value };
    } else {
      relevantKeyframes[1] = { percentage: +key, keyframe: value };
      //@ts-ignore
      return relevantKeyframes;
    }
  }

  //@ts-ignore
  return relevantKeyframes;
};

/**
 * scales numbers between a range
 */
const scaleBetween =
  (inputMin: number, inputMax: number) =>
  (outputMin: number, outputMax: number) =>
  (unscaledNum: number, cap: boolean = false): number => {
    if (cap && unscaledNum > inputMax) return outputMax;
    if (cap && unscaledNum < inputMin) return outputMin;

    return (
      ((outputMax - outputMin) * (unscaledNum - inputMin)) /
        (inputMax - inputMin) +
      outputMin
    );
  };

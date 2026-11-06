import Svg, { Circle, Path } from 'react-native-svg';

type BrandMarkProps = {
  size?: number;
  background?: string;
  color?: string;
  withBackground?: boolean;
};

export function BrandMark({
  size = 64,
  background = '#FFFFFF',
  color = '#1B7F4B',
  withBackground = true,
}: BrandMarkProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      {withBackground ? <Circle cx={32} cy={32} r={32} fill={background} /> : null}
      <Path
        d="M32 49V28"
        stroke={color}
        strokeWidth={4}
        strokeLinecap="round"
      />
      <Path
        d="M32 38C22.5 38 16 32.5 14.5 24 24 23 30.5 28 32 38Z"
        fill={color}
      />
      <Path
        d="M32 31.5C33.5 22 40 16.5 49.5 15.5 48 24 41.5 30 32 31.5Z"
        fill={color}
        opacity={0.82}
      />
      <Path
        d="M22 49.5h20"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
        opacity={0.45}
      />
    </Svg>
  );
}

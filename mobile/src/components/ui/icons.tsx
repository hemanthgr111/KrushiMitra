import Svg, { Circle, G, Line, Path } from 'react-native-svg';

export type IconProps = {
  size?: number;
  color?: string;
  strokeWidth?: number;
};

export function GlobeIcon({ size = 24, color = '#1B7F4B', strokeWidth = 2 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={strokeWidth} />
      <Path d="M3 12h18" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <Path
        d="M12 3c2.5 2.4 4 5.6 4 9s-1.5 6.6-4 9c-2.5-2.4-4-5.6-4-9s1.5-6.6 4-9Z"
        stroke={color}
        strokeWidth={strokeWidth}
      />
    </Svg>
  );
}

export function ChevronLeftIcon({ size = 24, color = '#1B7F4B', strokeWidth = 2.2 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15 18l-6-6 6-6"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function CheckIcon({ size = 24, color = '#FFFFFF', strokeWidth = 2.4 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20 6L9 17l-5-5"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function ArrowRightIcon({ size = 20, color = '#FFFFFF', strokeWidth = 2.2 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M5 12h14" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <Path
        d="M13 6l6 6-6 6"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function LeafIcon({ size = 24, color = '#1B7F4B', strokeWidth = 2 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20 4C10 4 4 10 4 20c10 0 16-6 16-16Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <Path
        d="M4 20c4-4 8-8 12-12"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function CloudSunIcon({ size = 24, color = '#1B7F4B', strokeWidth = 2 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <G stroke={color} strokeWidth={strokeWidth} strokeLinecap="round">
        <Circle cx={8} cy={8} r={3} />
        <Path d="M8 1.5v1.6M8 12.9v1.6M1.5 8h1.6M12.9 8h1.6M3.4 3.4l1.1 1.1M11.3 11.3l1.1 1.1" />
        <Path d="M9 19h8a3.5 3.5 0 0 0 .3-7 5 5 0 0 0-9.5 1.2A3 3 0 0 0 9 19Z" />
      </G>
    </Svg>
  );
}

export function UsersIcon({ size = 24, color = '#1B7F4B', strokeWidth = 2 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <G stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <Circle cx={9} cy={8} r={3.2} />
        <Path d="M3 20c0-3.2 2.7-5.5 6-5.5s6 2.3 6 5.5" />
        <Path d="M16 5.2a3 3 0 0 1 0 5.8M17.5 14.6c2 .7 3.5 2.5 3.5 5.4" />
      </G>
    </Svg>
  );
}

export function BookIcon({ size = 24, color = '#1B7F4B', strokeWidth = 2 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <G stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <Path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15Z" />
        <Path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20v3H6.5" />
        <Line x1={9} y1={7} x2={16} y2={7} />
        <Line x1={9} y1={11} x2={14} y2={11} />
      </G>
    </Svg>
  );
}

export function MenuDotsIcon({ size = 24, color = '#1B7F4B' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={5} cy={12} r={1.8} fill={color} />
      <Circle cx={12} cy={12} r={1.8} fill={color} />
      <Circle cx={19} cy={12} r={1.8} fill={color} />
    </Svg>
  );
}

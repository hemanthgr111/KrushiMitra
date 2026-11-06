import Svg, {
  Circle,
  Defs,
  Ellipse,
  G,
  LinearGradient,
  Line,
  Path,
  Rect,
  Stop,
} from 'react-native-svg';

import { BrandColors } from '@/constants/theme';

export type OnboardingScene = 'welcome' | 'crops' | 'weather' | 'community';

type OnboardingIllustrationProps = {
  scene: OnboardingScene;
  width?: number;
};

const VIEWBOX_WIDTH = 320;
const VIEWBOX_HEIGHT = 230;

export function OnboardingIllustration({ scene, width = 300 }: OnboardingIllustrationProps) {
  const height = (width * VIEWBOX_HEIGHT) / VIEWBOX_WIDTH;

  return (
    <Svg width={width} height={height} viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}>
      {scene === 'welcome' && <WelcomeScene />}
      {scene === 'crops' && <CropsScene />}
      {scene === 'weather' && <WeatherScene />}
      {scene === 'community' && <CommunityScene />}
    </Svg>
  );
}

function WelcomeScene() {
  return (
    <G>
      <Defs>
        <LinearGradient id="welcomeSky" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#F2FBF4" />
          <Stop offset="1" stopColor="#CFECDA" />
        </LinearGradient>
      </Defs>
      <Rect x={0} y={0} width={320} height={230} rx={28} fill="url(#welcomeSky)" />
      <Circle cx={252} cy={62} r={28} fill={BrandColors.accent} />
      <Circle cx={252} cy={62} r={38} fill={BrandColors.accent} opacity={0.18} />
      <Ellipse cx={86} cy={54} rx={34} ry={14} fill="#FFFFFF" opacity={0.9} />
      <Ellipse cx={116} cy={60} rx={24} ry={11} fill="#FFFFFF" opacity={0.8} />
      <Path d="M0 150C52 124 106 132 160 150c52 18 108 14 160-8v88H0v-80Z" fill="#B6DFC5" />
      <Path d="M0 180c64-26 132-8 196 4 48 9 90 2 124-12v58H0v-50Z" fill="#74B98C" />
      <Path d="M0 205c80-18 158-4 232 2 32 3 60 0 88-6v29H0v-25Z" fill="#3E8E5A" />
      <G stroke="#2E6F45" strokeWidth={2} opacity={0.28} strokeLinecap="round">
        <Path d="M8 214c60-10 120-8 180 0s90 6 124 0" />
        <Path d="M18 224c60-10 120-8 180 0s90 6 114 0" />
      </G>
      <G>
        <Path d="M160 198v-34" stroke="#1B7F4B" strokeWidth={4} strokeLinecap="round" />
        <Path d="M160 178c-16 0-28-9-31-24 16-2 28 8 31 24Z" fill="#1B7F4B" />
        <Path d="M161 170c2-16 13-25 29-27 1 16-9 27-29 27Z" fill="#2E9A5E" />
      </G>
      <Circle cx={57} cy={150} r={5} fill="#E9A23B" opacity={0.8} />
      <Circle cx={274} cy={170} r={4} fill="#FFFFFF" opacity={0.7} />
    </G>
  );
}

function CropsScene() {
  return (
    <G>
      <Defs>
        <LinearGradient id="cropSky" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#F7FBF3" />
          <Stop offset="1" stopColor="#DCEEDC" />
        </LinearGradient>
      </Defs>
      <Rect x={0} y={0} width={320} height={230} rx={28} fill="url(#cropSky)" />
      <Circle cx={62} cy={54} r={20} fill={BrandColors.accent} opacity={0.85} />
      <G opacity={0.55} stroke="#1B7F4B" strokeWidth={2} strokeLinecap="round">
        <Path d="M62 22v10M62 76v10M30 54h10M84 54h10M39 31l7 7M78 70l7 7M85 31l-7 7M46 70l-7 7" />
      </G>
      <Rect x={96} y={34} width={128} height={166} rx={22} fill="#FFFFFF" />
      <Rect
        x={96.8}
        y={34.8}
        width={126.4}
        height={164.4}
        rx={21.2}
        fill="none"
        stroke="#CFE3D1"
        strokeWidth={1.6}
      />
      <Rect x={110} y={52} width={100} height={122} rx={14} fill="#EAF6EC" />
      <Rect x={112} y={40} width={34} height={5} rx={2.5} fill="#D8E8DA" />
      <Circle cx={160} cy={104} r={34} fill="#FFFFFF" opacity={0.9} />
      <Circle cx={160} cy={104} r={34} fill="none" stroke="#2E9A5E" strokeWidth={3} />
      <Line
        x1={184}
        y1={128}
        x2={198}
        y2={142}
        stroke="#2E9A5E"
        strokeWidth={5}
        strokeLinecap="round"
      />
      <Path d="M160 118v-20" stroke="#1B7F4B" strokeWidth={3.5} strokeLinecap="round" />
      <Path d="M160 106c-9 0-16-5-18-14 9-1 16 4 18 14Z" fill="#1B7F4B" />
      <Path d="M161 100c1-9 7-14 16-15 0 9-5 15-16 15Z" fill="#2E9A5E" />
      <G stroke="#B9D9BF" strokeWidth={5} strokeLinecap="round">
        <Line x1={124} y1={150} x2={172} y2={150} />
        <Line x1={124} y1={160} x2={156} y2={160} />
      </G>
      <Circle cx={200} cy={164} r={10} fill="#2E9A5E" />
      <Path
        d="M196 164l3 3 6-7"
        stroke="#FFFFFF"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <G>
        <Path d="M252 208v-36" stroke="#1B7F4B" strokeWidth={4} strokeLinecap="round" />
        <Path d="M252 188c-14 0-24-8-26-20 14-2 23 7 26 20Z" fill="#1B7F4B" />
        <Path d="M253 181c1-13 11-21 24-22 1 13-8 22-24 22Z" fill="#2E9A5E" />
      </G>
      <Circle cx={72} cy={186} r={7} fill="#E9A23B" opacity={0.45} />
    </G>
  );
}

function WeatherScene() {
  return (
    <G>
      <Defs>
        <LinearGradient id="weatherSky" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#EFF9FD" />
          <Stop offset="1" stopColor="#D2EAF3" />
        </LinearGradient>
      </Defs>
      <Rect x={0} y={0} width={320} height={230} rx={28} fill="url(#weatherSky)" />
      <Circle cx={84} cy={64} r={30} fill={BrandColors.accent} />
      <G opacity={0.6} stroke={BrandColors.accent} strokeWidth={2.5} strokeLinecap="round">
        <Path d="M84 22v12M84 94v12M42 64h12M114 64h12M54 34l9 9M105 85l9 9M114 34l-9 9M63 85l-9 9" />
      </G>
      <Ellipse cx={178} cy={88} rx={44} ry={27} fill="#FFFFFF" />
      <Ellipse cx={216} cy={94} rx={34} ry={21} fill="#FFFFFF" />
      <Ellipse cx={148} cy={98} rx={30} ry={19} fill="#FFFFFF" />
      <G stroke="#5FA8C7" strokeWidth={4} strokeLinecap="round">
        <Line x1={156} y1={126} x2={150} y2={142} />
        <Line x1={180} y1={128} x2={174} y2={148} />
        <Line x1={204} y1={126} x2={198} y2={142} />
        <Line x1={228} y1={124} x2={222} y2={140} />
      </G>
      <Path d="M0 174c56-20 112-14 168 0 48 12 100 10 152-6v62H0v-56Z" fill="#B6DFC5" />
      <Path d="M0 198c72-20 144-6 212 4 40 6 76 2 108-8v36H0v-32Z" fill="#5EA97C" />
      <G>
        <Path d="M258 208v-30" stroke="#1B7F4B" strokeWidth={4} strokeLinecap="round" />
        <Path d="M258 191c-12 0-21-7-23-18 12-1 20 6 23 18Z" fill="#1B7F4B" />
        <Path d="M259 185c1-12 10-19 21-20 1 12-7 20-21 20Z" fill="#2E9A5E" />
      </G>
      <Circle cx={58} cy={168} r={5} fill="#FFFFFF" opacity={0.8} />
      <Circle cx={292} cy={72} r={4} fill="#FFFFFF" opacity={0.9} />
    </G>
  );
}

function CommunityScene() {
  return (
    <G>
      <Defs>
        <LinearGradient id="communitySky" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#FBF8EE" />
          <Stop offset="1" stopColor="#DDEFDC" />
        </LinearGradient>
      </Defs>
      <Rect x={0} y={0} width={320} height={230} rx={28} fill="url(#communitySky)" />
      <Circle cx={268} cy={54} r={24} fill={BrandColors.accent} opacity={0.9} />
      <G>
        <Rect x={38} y={30} width={86} height={48} rx={16} fill="#FFFFFF" />
        <Path d="M62 78l-4 12 14-10" fill="#FFFFFF" />
        <G stroke="#9BC4A4" strokeWidth={4} strokeLinecap="round">
          <Line x1={52} y1={46} x2={108} y2={46} />
          <Line x1={52} y1={58} x2={88} y2={58} />
        </G>
      </G>
      <G>
        <Rect x={198} y={22} width={80} height={44} rx={15} fill="#FFFFFF" />
        <Path d="M250 66l6 12 6-12" fill="#FFFFFF" />
        <G stroke="#9BC4A4" strokeWidth={4} strokeLinecap="round">
          <Line x1={212} y1={38} x2={262} y2={38} />
          <Line x1={212} y1={50} x2={244} y2={50} />
        </G>
      </G>
      <G>
        <Circle cx={106} cy={136} r={21} fill="#D79A62" />
        <Path d="M84 194c0-18 10-30 22-30s22 12 22 30v10H84v-10Z" fill="#2E9A5E" />
        <Path d="M98 132c4-8 12-9 17 0" stroke="#5B3A22" strokeWidth={5} strokeLinecap="round" />
      </G>
      <G>
        <Circle cx={170} cy={126} r={23} fill="#C68652" />
        <Path d="M145 196c0-20 11-34 25-34s25 14 25 34v6h-50v-6Z" fill="#E9A23B" />
        <Path d="M158 122c4-9 15-10 21 0" stroke="#4A2E1A" strokeWidth={5} strokeLinecap="round" />
      </G>
      <G>
        <Circle cx={232} cy={138} r={20} fill="#D79A62" />
        <Path d="M212 196c0-17 9-29 20-29s20 12 20 29v8h-40v-8Z" fill="#5E9CC0" />
        <Path d="M224 134c3-7 11-8 16 0" stroke="#5B3A22" strokeWidth={5} strokeLinecap="round" />
      </G>
      <Path d="M0 196c70-12 132-4 194 6 44 7 88 2 126-8v36H0v-34Z" fill="#5EA97C" />
      <G>
        <Path d="M64 210v-26" stroke="#1B7F4B" strokeWidth={4} strokeLinecap="round" />
        <Path d="M64 195c-11 0-19-6-21-16 11-1 18 6 21 16Z" fill="#1B7F4B" />
        <Path d="M65 190c1-11 9-17 19-18 1 11-6 18-19 18Z" fill="#2E9A5E" />
      </G>
      <Circle cx={154} cy={186} r={4} fill="#FFFFFF" opacity={0.8} />
      <Circle cx={286} cy={168} r={5} fill="#FFFFFF" opacity={0.7} />
    </G>
  );
}

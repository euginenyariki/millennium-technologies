const VIEWBOX = "0 0 400 300";

function Scene({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox={VIEWBOX}
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <radialGradient id="glow" cx="50%" cy="45%" r="65%">
          <stop offset="0%" stopColor="rgba(34,197,94,0.14)" />
          <stop offset="60%" stopColor="rgba(34,197,94,0.05)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
        <linearGradient id="metal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1c2a21" />
          <stop offset="100%" stopColor="#0e1611" />
        </linearGradient>
        <linearGradient id="metal2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#24362b" />
          <stop offset="100%" stopColor="#141d17" />
        </linearGradient>
        <linearGradient id="greenbar" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#4ade80" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#glow)" />
      <g stroke="rgba(34,197,94,0.07)" strokeWidth="1">
        {Array.from({ length: 14 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 30 - 10} y1="0" x2={i * 30 - 10} y2="300" />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 30 - 10} x2="400" y2={i * 30 - 10} />
        ))}
      </g>
      <ellipse cx="200" cy="235" rx="130" ry="14" fill="rgba(0,0,0,0.35)" />
      {children}
    </svg>
  );
}

function Led({ x, y, on = true }: { x: number; y: number; on?: boolean }) {
  return <circle cx={x} cy={y} r="2.5" fill={on ? "#22c55e" : "#3a4a40"} />;
}

function Device({
  children,
  w = 170,
  h = 120,
  x,
  y,
}: {
  children: React.ReactNode;
  w?: number;
  h?: number;
  x?: number;
  y?: number;
}) {
  const dx = x ?? 200 - w / 2;
  const dy = y ?? 205 - h / 2;
  return (
    <g>
      <rect
        x={dx}
        y={dy}
        width={w}
        height={h}
        rx={14}
        fill="url(#metal)"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth={1.5}
      />
      <rect x={dx} y={dy} width={w} height={4} rx={2} fill="url(#greenbar)" opacity={0.9} />
      {children}
    </g>
  );
}

function Caption({ text }: { text: string }) {
  return (
    <text x="200" y="68" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="12" fontFamily="monospace">
      {text}
    </text>
  );
}

function CameraArt() {
  return (
    <Scene>
      <Device w={150} h={92} x={130} y={96}>
        <circle cx={193} cy={148} r={20} fill="#0a120c" stroke="rgba(74,222,128,0.25)" strokeWidth={2} />
        <circle cx={193} cy={148} r={8} fill="rgba(74,222,128,0.5)" />
        <rect x={165} y={132} width={56} height={28} rx={6} fill="rgba(74,222,128,0.15)" />
      </Device>
      <rect x={150} y={196} width={10} height={22} fill="#18241b" stroke="rgba(255,255,255,0.08)" />
      <path d="M142 218h26" stroke="rgba(255,255,255,0.15)" strokeWidth={6} strokeLinecap="round" />
      <Caption text="CCTV CAMERA" />
    </Scene>
  );
}

function PtzArt() {
  return (
    <Scene>
      <rect x={150} y={120} width={100} height={10} rx={3} fill="#18241b" />
      <circle cx={200} cy={150} r={34} fill="url(#metal)" stroke="rgba(74,222,128,0.3)" strokeWidth={2} />
      <circle cx={200} cy={150} r={17} fill="#0a120c" stroke="rgba(74,222,128,0.5)" />
      <rect x={176} y={168} width={48} height={10} rx={2} fill="rgba(74,222,128,0.35)" />
      <rect x={96} y={128} width={70} height={8} rx={3} fill="rgba(74,222,128,0.5)" />
      <rect x={234} y={128} width={70} height={8} rx={3} fill="rgba(74,222,128,0.5)" />
      <Caption text="PTZ CAMERA" />
    </Scene>
  );
}

function RecorderArt({ nvr = false }: { nvr?: boolean }) {
  return (
    <Scene>
      <Device w={190} h={104} x={105} y={90}>
        <text x="205" y="112" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="11" fontFamily="monospace">
          {nvr ? "NVR · POE" : "DVR"}
        </text>
        <rect x={125} y={120} width={70} height={20} rx={3} fill="#0a120c" stroke="rgba(74,222,128,0.3)" />
        <g>
          {Array.from({ length: 4 }).map((_, i) => (
            <circle key={i} cx={210 + i * 14} cy={130} r={3.5} fill="rgba(74,222,128,0.4)" />
          ))}
        </g>
        <g>
          {Array.from({ length: 8 }).map((_, i) => (
            <Led x={125 + i * 18} y={172} key={i} on={i % 3 !== 0} />
          ))}
        </g>
      </Device>
      <Caption text={nvr ? "NETWORK VIDEO RECORDER" : "DIGITAL VIDEO RECORDER"} />
    </Scene>
  );
}

function HddArt() {
  return (
    <Scene>
      <Device w={190} h={120} x={105} y={86}>
        <rect x={125} y={120} width={150} height={8} rx={4} fill="#18241b" />
        <rect x={125} y={130} width={150} height={8} rx={4} fill="#18241b" />
        <circle cx={152} cy={150} r={16} fill="#0a120c" stroke="rgba(74,222,128,0.3)" />
        <circle cx={228} cy={150} r={16} fill="#0a120c" stroke="rgba(74,222,128,0.3)" />
        <rect x={125} y={180} width={64} height={10} rx={3} fill="#0a120c" stroke="rgba(255,255,255,0.1)" />
      </Device>
      <Caption text="SURVEILLANCE HDD" />
    </Scene>
  );
}

function CableArt() {
  return (
    <Scene>
      <circle cx="200" cy="178" r="62" fill="url(#metal2)" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
      <circle cx="200" cy="178" r="38" fill="none" stroke="rgba(74,222,128,0.35)" strokeWidth="2" />
      <circle cx="200" cy="178" r="20" fill="none" stroke="rgba(74,222,128,0.2)" strokeWidth="2" />
      <circle cx={140} cy={178} r={10} fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="5" strokeDasharray="4 6" />
      <Caption text="CABLE &amp; CONDUIT" />
    </Scene>
  );
}

function PsuArt() {
  return (
    <Scene>
      <Device w={170} h={120} x={115} y={86}>
        <rect x={135} y={112} width={60} height={40} rx={4} fill="#0a120c" stroke="rgba(74,222,128,0.35)" strokeWidth={1.5} />
        <text x="165" y="136" textAnchor="middle" fill="rgba(74,222,128,0.8)" fontSize="10" fontFamily="monospace">
          12V DC
        </text>
        <g>
          {Array.from({ length: 6 }).map((_, i) => (
            <Led x={135 + i * 20} y={170} key={i} />
          ))}
        </g>
      </Device>
      <Caption text="POWER SUPPLY" />
    </Scene>
  );
}

function FingerprintArt() {
  return (
    <Scene>
      <Device w={150} h={140} x={125} y={78}>
        <rect x={145} y={100} width={110} height={66} rx={8} fill="#0a120c" stroke="rgba(74,222,128,0.4)" />
        <circle cx="200" cy="133" r="17" fill="none" stroke="url(#greenbar)" strokeWidth="2.5" />
        <circle cx="200" cy="133" r="23" fill="none" stroke="rgba(74,222,128,0.35)" strokeWidth="1.5" />
        <path d="M184 140c5 7 13 8 20 2M192 135c2 2 4 4 7 2" stroke="rgba(74,222,128,0.7)" strokeWidth="1.5" fill="none" />
        <Led x={152} y={192} />
        <Led x={164} y={192} />
      </Device>
      <Caption text="BIOMETRIC TERMINAL" />
    </Scene>
  );
}

function FaceArt() {
  return (
    <Scene>
      <Device w={170} h={130} x={115} y={84}>
        <rect x={132} y={102} width={136} height={80} rx={6} fill="#060d08" stroke="rgba(74,222,128,0.45)" />
        <circle cx="200" cy="136" r="15" fill="rgba(74,222,128,0.18)" />
        <circle cx="200" cy="136" r="15" fill="none" stroke="url(#greenbar)" strokeWidth="1.5" />
        <rect x={144} y={156} width={42} height={8} rx={4} fill="rgba(74,222,128,0.3)" />
        <rect x={214} y={156} width={42} height={8} rx={4} fill="rgba(74,222,128,0.3)" />
      </Device>
      <Caption text="FACE RECOGNITION" />
    </Scene>
  );
}

function ReaderArt() {
  return (
    <Scene>
      <rect x={130} y={92} width={70} height={118} rx={10} fill="url(#metal)" stroke="rgba(255,255,255,0.1)" />
      <circle cx={165} cy={118} r={16} fill="#0a120c" stroke="rgba(74,222,128,0.5)" />
      <path d="M161 118h2l2-3m-7 3h4m6 0h-2m-6 0h2m4-3h-4m2 3v-3" stroke="rgba(255,255,255,0.5)" strokeWidth="1.3" fill="none" />
      <Led x={165} y={196} />
      <rect x={222} y={110} width={56} height={86} rx={6} fill="url(#metal2)" stroke="rgba(255,255,255,0.1)" />
      <rect x={230} y={118} width={40} height={30} rx={3} fill="#0a120c" stroke="rgba(74,222,128,0.3)" />
      <rect x={230} y={158} width={40} height={8} rx={2} fill="rgba(74,222,128,0.25)" />
      <Caption text="RFID READER + CARD" />
    </Scene>
  );
}

function LockArt() {
  return (
    <Scene>
      <Device w={200} h={110} x={100} y={88}>
        <rect x={115} y={110} width={170} height={26} rx={4} fill="url(#metal2)" stroke="rgba(74,222,128,0.25)" />
        <g>
          {Array.from({ length: 12 }).map((_, i) => (
            <rect key={i} x={122 + i * 13} y={114} width={9} height={18} rx={2} fill="rgba(74,222,128,0.55)" />
          ))}
        </g>
        <circle cx={200} cy={160} r={10} fill="none" stroke="url(#greenbar)" strokeWidth="2" />
        <circle cx={200} cy={160} r={4} fill="rgba(74,222,128,0.6)" />
      </Device>
      <Caption text="MAGNETIC LOCK" />
    </Scene>
  );
}

function AccessControllerArt() {
  return (
    <Scene>
      <Device w={150} h={140} x={125} y={78}>
        <rect x={145} y={102} width={110} height={60} rx={4} fill="#0a120c" stroke="rgba(74,222,128,0.3)" />
        <g>
          {Array.from({ length: 6 }).map((_, i) => (
            <Led x={152 + i * 16} y={112} key={i} />
          ))}
        </g>
        <rect x={160} y={128} width={80} height={22} rx={3} fill="rgba(74,222,128,0.12)" stroke="rgba(74,222,128,0.3)" />
        <g>
          {Array.from({ length: 8 }).map((_, i) => (
            <rect key={i} x={152} y={160 + (i % 2) * 14} width={12} height={8} rx={2} fill="rgba(255,255,255,0.12)" />
          ))}
        </g>
      </Device>
      <Caption text="DOOR CONTROLLER" />
    </Scene>
  );
}

function EnergizerArt() {
  return (
    <Scene>
      <Device w={190} h={140} x={105} y={78}>
        <rect x={125} y={102} width={150} height={84} rx={6} fill="#0a120c" stroke="rgba(74,222,128,0.4)" />
        <rect x={135} y={112} width={130} height={50} rx={5} fill="rgba(74,222,128,0.08)" stroke="rgba(74,222,128,0.25)" />
        <text x="200" y="138" textAnchor="middle" fill="rgba(74,222,128,0.9)" fontSize="15" fontFamily="monospace">
          ENERGIZER
        </text>
        <rect x={135} y={170} width={70} height={8} rx={3} fill="rgba(255,255,255,0.12)" />
        <rect x={215} y={170} width={50} height={8} rx={3} fill="rgba(255,255,255,0.12)" />
        <Led x={205} y={196} />
      </Device>
      <Caption text="FENCE ENERGIZER" />
    </Scene>
  );
}

function FenceArt() {
  return (
    <Scene>
      {[110, 170, 230, 290].map((x) => (
        <g key={x}>
          <rect x={x} y={70} width={6} height={170} rx={2} fill="#1d2a21" stroke="rgba(255,255,255,0.08)" />
          <circle cx={x + 3} cy={78} r={5} fill="rgba(74,222,128,0.5)" />
        </g>
      ))}
      {Array.from({ length: 5 }).map((_, i) => (
        <g key={i}>
          <line x1={110} y1={90 + i * 30} x2={296} y2={90 + i * 30} stroke="rgba(74,222,128,0.7)" strokeWidth={2} />
          <line x1={110} y1={97 + i * 30} x2={296} y2={97 + i * 30} stroke="rgba(74,222,128,0.35)" strokeWidth={1} />
        </g>
      ))}
      <rect x={252} y={158} width={34} height={26} rx={4} fill="#0a120c" stroke="rgba(74,222,128,0.5)" />
      <text x={269} y={175} textAnchor="middle" fill="rgba(74,222,128,0.9)" fontSize="9" fontFamily="monospace">
        6kV
      </text>
      <Caption text="ELECTRIC FENCE" />
    </Scene>
  );
}

function InsulatorArt() {
  return (
    <Scene>
      {[150, 200, 250].map((x) => (
        <g key={x}>
          <rect x={x - 4} y={178} width={8} height={34} rx={2} fill="#18241b" />
          <path d={`M${x - 20} 130 v26 a20 20 0 0 0 40 0 v-26`} fill="none" stroke="rgba(74,222,128,0.7)" strokeWidth="2.5" />
          <path d={`M${x - 18} 170 h36`} stroke="rgba(74,222,128,0.3)" strokeWidth="1.5" />
        </g>
      ))}
      <Caption text="INSULATORS" />
    </Scene>
  );
}

function SignArt() {
  return (
    <Scene>
      <rect x={120} y={106} width={160} height={96} rx={8} fill="#0a120c" stroke="rgba(255,255,255,0.12)" strokeWidth={2} />
      <text x="200" y="140" textAnchor="middle" fill="rgba(239,68,68,0.9)" fontSize="16" fontFamily="monospace" fontWeight="bold">
        ⚡ DANGER
      </text>
      <text x="200" y="165" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="11" fontFamily="monospace">
        ELECTRIC FENCE
      </text>
      <text x="200" y="184" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="9" fontFamily="monospace">
        10kV
      </text>
      <Caption text="WARNING SIGN" />
    </Scene>
  );
}

function BatteryArt() {
  return (
    <Scene>
      <Device w={190} h={120} x={105} y={86}>
        <rect x={125} y={110} width={136} height={80} rx={8} fill="#141d17" stroke="rgba(74,222,128,0.3)" />
        <text x="193" y="150" textAnchor="middle" fill="rgba(74,222,128,0.85)" fontSize="13" fontFamily="monospace">
          BATTERY 12V
        </text>
        <g>
          {Array.from({ length: 5 }).map((_, i) => (
            <rect key={i} x={133 + i * 26} y={162} width={18} height={14} rx={2} fill="rgba(74,222,128,0.25)" />
          ))}
        </g>
      </Device>
      <Caption text="BACKUP BATTERY" />
    </Scene>
  );
}

function GateArt() {
  return (
    <Scene>
      <rect x={70} y={130} width={200} height={50} rx={4} fill="url(#metal2)" stroke="rgba(255,255,255,0.1)" />
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={i} x1={100 + i * 22} y1={130} x2={100 + i * 22} y2={180} stroke="rgba(255,255,255,0.12)" />
      ))}
      <line x1={70} y1={132} x2={270} y2={132} stroke="rgba(74,222,128,0.4)" />
      <rect x={255} y={120} width={46} height={70} rx={6} fill="#0a120c" stroke="rgba(74,222,128,0.5)" />
      <Led x={278} y={132} />
      <rect x={260} y={142} width={36} height={34} rx={4} fill="rgba(74,222,128,0.1)" />
      <text x={278} y={163} textAnchor="middle" fill="rgba(74,222,128,0.9)" fontSize="10" fontFamily="monospace">
        MOTOR
      </text>
      <Caption text="GATE AUTOMATION" />
    </Scene>
  );
}

function SwingArt() {
  return (
    <Scene>
      <rect x={90} y={170} width={180} height={12} rx={4} fill="url(#metal2)" stroke="rgba(255,255,255,0.1)" />
      <g transform="rotate(-18 260 176)">
        <rect x={248} y={126} width={14} height={64} rx={4} fill="#0a120c" stroke="rgba(74,222,128,0.5)" />
        <circle cx={255} cy={150} r={8} fill="rgba(74,222,128,0.15)" stroke="rgba(74,222,128,0.4)" />
      </g>
      <Led x={100} y={178} />
      <Caption text="SWING GATE MOTOR" />
    </Scene>
  );
}

function RemoteArt() {
  return (
    <Scene>
      <Device w={90} h={156} x={155} y={70}>
        <rect x={168} y={96} width={64} height={106} rx={8} fill="#0a120c" stroke="rgba(74,222,128,0.35)" />
        {Array.from({ length: 4 }).map((_, i) => (
          <rect key={i} x={176} y={104 + i * 22} width={48} height={16} rx={5} fill="rgba(74,222,128,0.18)" stroke="rgba(74,222,128,0.3)" />
        ))}
        <circle cx={200} cy={184} r={6} fill="none" stroke="rgba(74,222,128,0.5)" />
      </Device>
      <Caption text="REMOTE CONTROL" />
    </Scene>
  );
}

function GsmArt() {
  return (
    <Scene>
      <Device w={170} h={130} x={115} y={84}>
        <rect x={130} y={102} width={140} height={84} rx={6} fill="#0a120c" stroke="rgba(74,222,128,0.4)" />
        <text x="200" y="134" textAnchor="middle" fill="rgba(74,222,128,0.9)" fontSize="14" fontFamily="monospace">
          GSM
        </text>
        <path d="M170 112l4 4m4-4 4 4m0-12-4 4" stroke="rgba(74,222,128,0.5)" fill="none" strokeWidth="1.2" />
        <rect x={230} y={112} width={32} height={20} rx={3} fill="#0a120c" stroke="rgba(255,255,255,0.15)" />
      </Device>
      <Caption text="GSM CONTROLLER" />
    </Scene>
  );
}

function PhotocellArt() {
  return (
    <Scene>
      {[90, 300].map((x) => (
        <Device key={x} w={42} h={70} x={x} y={130}>
          <circle cx={x + 21} cy={150} r={12} fill="rgba(74,222,128,0.25)" stroke="rgba(74,222,128,0.5)" />
        </Device>
      ))}
      <line x1={132} y1={165} x2={280} y2={165} stroke="rgba(74,222,128,0.6)" strokeWidth={3} strokeDasharray="10 6" />
      <Caption text="SAFETY PHOTOCELL" />
    </Scene>
  );
}

function BarrierArt() {
  return (
    <Scene>
      <rect x={96} y={96} width={34} height={150} rx={8} fill="url(#metal)" stroke="rgba(255,255,255,0.12)" />
      <rect x={100} y={120} width={26} height={34} rx={4} fill="#0a120c" stroke="rgba(74,222,128,0.5)" />
      <g transform="rotate(40 113 130)">
        <rect x={113} y={60} width={10} height={200} rx={4} fill="url(#metal2)" stroke="rgba(255,255,255,0.1)" />
        <rect x={110} y={70} width={16} height={24} rx={3} fill="rgba(74,222,128,0.4)" />
      </g>
      <Caption text="BOOM BARRIER" />
    </Scene>
  );
}

function PanelArt() {
  return (
    <Scene>
      {[110, 180, 250].map((x) => (
        <g key={x}>
          <rect x={x} y={120} width={62} height={100} rx={6} fill="#0b1510" stroke="rgba(74,222,128,0.35)" strokeWidth={2} />
          <g stroke="rgba(74,222,128,0.22)" strokeWidth={1}>
            <line x1={x + 4} y1={136} x2={x + 58} y2={136} />
            <line x1={x + 4} y1={152} x2={x + 58} y2={152} />
            <line x1={x + 4} y1={168} x2={x + 58} y2={168} />
            <line x1={x + 4} y1={184} x2={x + 58} y2={184} />
          </g>
          <path d={`M${x + 12} 200v14h${38}v-14`} stroke="rgba(255,255,255,0.15)" fill="none" strokeWidth={2} />
        </g>
      ))}
      <Caption text="SOLAR PANELS" />
    </Scene>
  );
}

function InverterArt({ hybrid = false }: { hybrid?: boolean }) {
  return (
    <Scene>
      <Device w={200} h={130} x={100} y={84}>
        <rect x={118} y={104} width={164} height={90} rx={6} fill="#0a120c" stroke="rgba(74,222,128,0.4)" />
        <text x="200" y="142" textAnchor="middle" fill="rgba(74,222,128,0.9)" fontSize="14" fontFamily="monospace">
          {hybrid ? "HYBRID" : "OFF-GRID"} INVERTER
        </text>
        <rect x={132} y={156} width={70} height={26} rx={3} fill="rgba(74,222,128,0.1)" stroke="rgba(74,222,128,0.3)" />
        <Led x={285} y={120} />
        <Led x={285} y={132} />
      </Device>
      <Caption text="SOLAR INVERTER" />
    </Scene>
  );
}

function LithiumArt() {
  return (
    <Scene>
      <Device w={180} h={120} x={110} y={86}>
        <rect x={128} y={106} width={144} height={80} rx={6} fill="#101a14" stroke="rgba(74,222,128,0.35)" />
        <circle cx={152} cy={134} r={9} fill="rgba(74,222,128,0.15)" stroke="rgba(74,222,128,0.4)" />
        <circle cx={152} cy={160} r={9} fill="rgba(74,222,128,0.15)" stroke="rgba(74,222,128,0.4)" />
        <rect x={180} y={118} width={72} height={56} rx={4} fill="rgba(74,222,128,0.06)" stroke="rgba(74,222,128,0.25)" />
        <text x="216" y="146" textAnchor="middle" fill="rgba(74,222,128,0.8)" fontSize="10" fontFamily="monospace">
          LiFePO4
        </text>
      </Device>
      <Caption text="LITHIUM BATTERY" />
    </Scene>
  );
}

function GelArt() {
  return (
    <Scene>
      {[150, 200, 250].map((x, i) => (
        <rect key={x} x={x} y={110} width={40} height={90} rx={8} fill="url(#metal2)" stroke="rgba(255,255,255,0.1)" strokeWidth={i === 2 ? 2 : 1.5} />
      ))}
      {[150, 200, 250].map((x) => (
        <rect key={`t${x}`} x={x + 8} y={140} width={24} height={18} rx={3} fill="rgba(74,222,128,0.25)" />
      ))}
      <Caption text="DEEP-CYCLE BATTERIES" />
    </Scene>
  );
}

function FloodArt() {
  return (
    <Scene>
      <rect x={70} y={96} width={260} height={8} rx={3} fill="#18241b" />
      <rect x={130} y={104} width={140} height={16} rx={4} fill="url(#metal2)" stroke="rgba(255,255,255,0.1)" />
      <rect x={164} y={120} width={72} height={56} rx={8} fill="#0a120c" stroke="rgba(74,222,128,0.5)" />
      <g fill="rgba(74,222,128,0.8)">
        <circle cx={182} cy={148} r={7} />
        <circle cx={200} cy={148} r={7} />
        <circle cx={218} cy={148} r={7} />
      </g>
      <path d="M164 194c24 26 48 26 72 0" stroke="rgba(74,222,128,0.4)" strokeWidth={2} fill="none" />
      <Caption text="SOLAR FLOODLIGHT" />
    </Scene>
  );
}

function PumpArt() {
  return (
    <Scene>
      <rect x={140} y={70} width={54} height={150} rx={10} fill="url(#metal)" stroke="rgba(74,222,128,0.4)" />
      <rect x={200} y={90} width={26} height={60} rx={4} fill="url(#metal2)" stroke="rgba(255,255,255,0.1)" />
      <path d="M167 70v-18M167 52h-16M167 52h16" stroke="rgba(74,222,128,0.6)" strokeWidth={3} fill="none" strokeLinecap="round" />
      <Caption text="SOLAR WATER PUMP" />
    </Scene>
  );
}

function RouterArt() {
  return (
    <Scene>
      <Device w={200} h={90} x={100} y={92}>
        <rect x={120} y={110} width={140} height={50} rx={6} fill="#0a120c" stroke="rgba(74,222,128,0.4)" />
        {[150, 170, 190, 210, 230, 250].map((x, i) => (
          <rect key={x} x={x} y={132} width={7} height={10} rx={1.5} fill={i % 2 === 0 ? "rgba(74,222,128,0.7)" : "rgba(74,222,128,0.3)"} />
        ))}
        {[140, 152, 164, 176].map((x) => (
          <line key={x} x1={x} y1={112} x2={x} y2={120} stroke="rgba(255,255,255,0.25)" />
        ))}
        <Led x={265} y={122} />
      </Device>
      <Caption text="WI-FI ROUTER" />
    </Scene>
  );
}

function SwitchArt({ ap = false }: { ap?: boolean }) {
  return (
    <Scene>
      <Device w={200} h={92} x={100} y={90}>
        <g>
          {Array.from({ length: 8 }).map((_, i) => (
            <Led key={i} x={118 + i * 18} y={120} />
          ))}
        </g>
        <text x="200" y="152" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="11" fontFamily="monospace">
          {ap ? "ACCESS POINT" : "GIGABIT SWITCH"}
        </text>
      </Device>
      <Caption text={ap ? "WI-FI ACCESS POINT" : "MANAGED SWITCH"} />
    </Scene>
  );
}

function RackArt() {
  return (
    <Scene>
      <rect x={120} y={78} width={160} height={160} rx={8} fill="url(#metal2)" stroke="rgba(255,255,255,0.12)" />
      {Array.from({ length: 6 }).map((_, i) => (
        <g key={i}>
          <rect x={134} y={86 + i * 25} width={54} height={18} rx={3} fill="#0a120c" stroke="rgba(74,222,128,0.3)" />
          <rect x={196} y={86 + i * 25} width={60} height={18} rx={3} fill="#101a14" stroke="rgba(255,255,255,0.08)" />
        </g>
      ))}
      <Caption text="NETWORK RACK" />
    </Scene>
  );
}

function PatchArt() {
  return (
    <Scene>
      <Device w={230} h={90} x={85} y={92}>
        <g>
          {Array.from({ length: 12 }).map((_, i) => (
            <circle key={i} cx={102 + i * 17} cy={126} r={3} fill="rgba(74,222,128,0.6)" />
          ))}
        </g>
        <rect x={102} y={140} width={200} height={16} rx={3} fill="rgba(74,222,128,0.1)" />
      </Device>
      <Caption text="PATCH PANEL · CAT6" />
    </Scene>
  );
}

function StarlinkArt() {
  return (
    <Scene>
      <Device w={120} h={160} x={140} y={70}>
        <rect x={158} y={92} width={84} height={96} rx={14} fill="#0a120c" stroke="rgba(74,222,128,0.5)" />
        <rect x={162} y={98} width={76} height={30} rx={8} fill="rgba(74,222,128,0.18)" />
        <text x="200" y={172} textAnchor="middle" fill="rgba(74,222,128,0.9)" fontSize="11" fontFamily="monospace">
          STARLINK
        </text>
        <Led x={202} y={140} />
      </Device>
      <path d="M96 70c34-38 174-38 208 0" stroke="rgba(255,255,255,0.15)" strokeWidth={2} fill="none" />
      <Caption text="SATELLITE INTERNET" />
    </Scene>
  );
}

function DesktopArt() {
  return (
    <Scene>
      <rect x={96} y={96} width={150} height={110} rx={8} fill="url(#metal)" stroke="rgba(255,255,255,0.1)" />
      <rect x={108} y={108} width={126} height={86} rx={4} fill="#0a120c" stroke="rgba(74,222,128,0.35)" />
      <rect x={108} y={108} width={126} height={10} rx={4} fill="rgba(74,222,128,0.12)" />
      <rect x={120} y={122} width={30} height={20} rx={2} fill="rgba(74,222,128,0.06)" stroke="rgba(74,222,128,0.15)" />
      <rect x={256} y={148} width={70} height={8} rx={3} fill="#18241b" />
      <rect x={266} y={156} width={50} height={34} rx={6} fill="url(#metal2)" stroke="rgba(255,255,255,0.12)" />
      <rect x={110} y={206} width={280} height={16} rx={4} fill="#18241b" />
      <Caption text="BUSINESS COMPUTER" />
    </Scene>
  );
}

function UpsArt() {
  return (
    <Scene>
      <Device w={180} h={130} x={110} y={84}>
        <rect x={128} y={104} width={144} height={88} rx={6} fill="#0a120c" stroke="rgba(74,222,128,0.4)" />
        <rect x={140} y={150} width={120} height={26} rx={4} fill="rgba(74,222,128,0.08)" stroke="rgba(74,222,128,0.25)" />
        <text x="200" y={168} textAnchor="middle" fill="rgba(74,222,128,0.85)" fontSize="11" fontFamily="monospace">
          UPS 1500VA
        </text>
        <Led x={148} y={120} />
      </Device>
      <Caption text="UNINTERRUPTIBLE POWER" />
    </Scene>
  );
}

function SsdArt() {
  return (
    <Scene>
      <Device w={200} h={88} x={100} y={94}>
        <rect x={118} y={112} width={164} height={52} rx={6} fill="#0a120c" stroke="rgba(74,222,128,0.4)" />
        <rect x={258} y={126} width={14} height={24} rx={3} fill="rgba(74,222,128,0.25)" />
        <Led x={132} y={124} />
      </Device>
      <Caption text="SOLID STATE DRIVE" />
    </Scene>
  );
}

function KeyboardArt() {
  return (
    <Scene>
      <rect x={80} y={130} width={240} height={80} rx={8} fill="url(#metal2)" stroke="rgba(255,255,255,0.1)" />
      {Array.from({ length: 6 }).map((_, r) =>
        Array.from({ length: 15 }).map((_, c) => (
          <rect
            key={`${r}${c}`}
            x={92 + c * 15}
            y={140 + r * 11}
            width={11}
            height={7}
            rx={2}
            fill={r === 2 && c === 6 ? "rgba(74,222,128,0.5)" : "rgba(255,255,255,0.08)"}
          />
        ))
      )}
      <Caption text="KEYBOARD &amp; MOUSE" />
    </Scene>
  );
}

function AccessCardArt() {
  return (
    <Scene>
      <rect x={120} y={110} width={160} height={100} rx={10} fill="url(#metal2)" stroke="rgba(74,222,128,0.3)" />
      <rect x={135} y={125} width={48} height={34} rx={6} fill="#0a120c" stroke="rgba(74,222,128,0.5)" />
      <path d="M145 150c0 8 6 12 14 12m-14-12c0-8 6-12 14-12" stroke="rgba(74,222,128,0.7)" fill="none" strokeWidth={2} />
      <rect x={200} y={140} width={64} height={8} rx={3} fill="rgba(255,255,255,0.15)" />
      <rect x={200} y={152} width={40} height={6} rx={3} fill="rgba(255,255,255,0.1)" />
      <Caption text="ACCESS CARD" />
    </Scene>
  );
}

function GsmRemoteArt() {
  return (
    <Scene>
      <g>
        <rect x={110} y={96} width={90} height={130} rx={10} fill="url(#metal)" stroke="rgba(255,255,255,0.12)" />
        <rect x={124} y={112} width={62} height={96} rx={6} fill="#0a120c" stroke="rgba(74,222,128,0.35)" />
        {Array.from({ length: 4 }).map((_, i) => (
          <rect key={i} x={130} y={118 + i * 22} width={50} height={14} rx={4} fill="rgba(74,222,128,0.16)" />
        ))}
      </g>
      <g>
        <rect x={226} y={110} width={66} height={100} rx={8} fill="url(#metal2)" stroke="rgba(74,222,128,0.3)" />
        <text x="259" y={150} textAnchor="middle" fill="rgba(74,222,128,0.9)" fontSize="11" fontFamily="monospace">
          GSM
        </text>
        <Led x={236} y={130} />
      </g>
      <Caption text="REMOTE + GSM CONTROL" />
    </Scene>
  );
}

function GenericArt({ label }: { label: string }) {
  return (
    <Scene>
      <Device w={180} h={110} x={110} y={88}>
        <text x="200" y={152} textAnchor="middle" fill="rgba(74,222,128,0.9)" fontSize="14" fontFamily="monospace">
          {label}
        </text>
      </Device>
    </Scene>
  );
}

const sceneMap: Record<string, React.ReactNode> = {
  camera: <CameraArt />,
  dome: <CameraArt />,
  ptz: <PtzArt />,
  dvr: <RecorderArt />,
  nvr: <RecorderArt nvr />,
  hdd: <HddArt />,
  cable: <CableArt />,
  ethcable: <CableArt />,
  psu: <PsuArt />,
  fingerprint: <FingerprintArt />,
  face: <FaceArt />,
  rfid: <ReaderArt />,
  readers: <ReaderArt />,
  card: <AccessCardArt />,
  maglock: <LockArt />,
  lock: <LockArt />,
  exit: <LockArt />,
  controller: <AccessControllerArt />,
  energizer: <EnergizerArt />,
  fence: <FenceArt />,
  wire: <CableArt />,
  polywire: <CableArt />,
  insulator: <InsulatorArt />,
  sign: <SignArt />,
  battery: <BatteryArt />,
  gate: <GateArt />,
  slidemotor: <GateArt />,
  swingmotor: <SwingArt />,
  remote: <RemoteArt />,
  gsm: <GsmArt />,
  gsmremote: <GsmRemoteArt />,
  photocell: <PhotocellArt />,
  barrier: <BarrierArt />,
  panel: <PanelArt />,
  solar: <PanelArt />,
  "inverter-hybrid": <InverterArt hybrid />,
  "inverter-offgrid": <InverterArt />,
  inverter: <InverterArt />,
  lithium: <LithiumArt />,
  gel: <GelArt />,
  flood: <FloodArt />,
  pump: <PumpArt />,
  network: <RackArt />,
  router: <RouterArt />,
  switch: <SwitchArt />,
  ap: <SwitchArt ap />,
  rack: <RackArt />,
  patch: <PatchArt />,
  keystone: <PatchArt />,
  starlink: <StarlinkArt />,
  it: <DesktopArt />,
  desktop: <DesktopArt />,
  ups: <UpsArt />,
  ssd: <SsdArt />,
  keyboard: <KeyboardArt />,
};

const realPhotos: Record<string, string> = {
  bullet: "/images/photos/cctv-install.jpg",
  camera: "/images/photos/cctv-install.jpg",
  dome: "/images/photos/cctv-install.jpg",
  ptz: "/images/photos/cctv-install.jpg",
  dvr: "/images/photos/cctv-install.jpg",
  nvr: "/images/photos/cctv-install.jpg",
  hdd: "/images/photos/cctv-install.jpg",
  cable: "/images/photos/cctv-install.jpg",
  ethcable: "/images/photos/cctv-install.jpg",
  psu: "/images/photos/cctv-install.jpg",
  fingerprint: "/images/photos/access-plant.jpg",
  face: "/images/photos/access-plant.jpg",
  rfid: "/images/photos/access-plant.jpg",
  readers: "/images/photos/access-plant.jpg",
  card: "/images/photos/access-plant.jpg",
  maglock: "/images/photos/access-plant.jpg",
  lock: "/images/photos/access-plant.jpg",
  exit: "/images/photos/access-plant.jpg",
  controller: "/images/photos/access-plant.jpg",
  energizer: "/images/photos/fence-line.jpg",
  fence: "/images/photos/fence-line.jpg",
  wire: "/images/photos/fence-line.jpg",
  polywire: "/images/photos/fence-line.jpg",
  insulator: "/images/photos/fence-line.jpg",
  sign: "/images/photos/fence-line.jpg",
  battery: "/images/photos/fence-line.jpg",
  gate: "/images/photos/gate-motor.jpg",
  slidemotor: "/images/photos/gate-motor.jpg",
  swingmotor: "/images/photos/gate-motor.jpg",
  remote: "/images/photos/gate-motor.jpg",
  gsm: "/images/photos/gate-motor.jpg",
  gsmremote: "/images/photos/gate-motor.jpg",
  photocell: "/images/photos/gate-motor.jpg",
  barrier: "/images/photos/gate-motor.jpg",
  panel: "/images/photos/solar-panels.jpg",
  solar: "/images/photos/solar-panels.jpg",
  "inverter-hybrid": "/images/photos/solar-panels.jpg",
  "inverter-offgrid": "/images/photos/solar-panels.jpg",
  inverter: "/images/photos/solar-panels.jpg",
  lithium: "/images/photos/solar-panels.jpg",
  gel: "/images/photos/solar-panels.jpg",
  flood: "/images/photos/solar-panels.jpg",
  pump: "/images/photos/solar-panels.jpg",
  network: "/images/photos/networking-rack.jpg",
  router: "/images/photos/networking-rack.jpg",
  switch: "/images/photos/networking-rack.jpg",
  ap: "/images/photos/networking-rack.jpg",
  rack: "/images/photos/networking-rack.jpg",
  patch: "/images/photos/networking-rack.jpg",
  keystone: "/images/photos/networking-rack.jpg",
  starlink: "/images/photos/starlink-dish.jpg",
  it: "/images/photos/it-support.jpg",
  desktop: "/images/photos/it-support.jpg",
  ups: "/images/photos/it-support.jpg",
  ssd: "/images/photos/it-support.jpg",
  keyboard: "/images/photos/it-support.jpg",
};

const productPhotos: Record<string, string> = {
  "4mp-ip-bullet-camera": "/images/products/4mp-ip-bullet-camera.jpg",
  "4mp-ip-dome-camera": "/images/products/4mp-ip-dome-camera.jpg",
  "4tb-surveillance-hdd": "/images/products/4tb-surveillance-hdd.jpg",
  "ptz-ip-camera": "/images/products/ptz-ip-camera.jpg",
  "8ch-dvr": "/images/products/8ch-dvr.jpg",
  "16ch-dvr": "/images/products/16ch-dvr.jpg",
  "8ch-nvr": "/images/products/8ch-nvr.jpg",
  "16ch-nvr": "/images/products/16ch-nvr.jpg",
  "cctv-cable-100m": "/images/products/cctv-cable-100m.jpg",
  "cctv-power-supply": "/images/products/cctv-power-supply.jpg",
  "fingerprint-time-attendance": "/images/products/fingerprint-time-attendance.jpg",
  "face-recognition-terminal": "/images/products/face-recognition-terminal.jpg",
  "exit-button": "/images/products/exit-button.jpg",
  "single-door-controller": "/images/products/single-door-controller.jpg",
  "rfid-standalone-reader": "/images/products/rfid-standalone-reader.jpg",
  "rfid-card-pack-50": "/images/products/rfid-card-pack-50.jpg",
  "magnetic-lock-600lbs": "/images/products/magnetic-lock-600lbs.jpg",
  "galvanized-fence-wire-250m": "/images/products/galvanized-fence-wire-250m.jpg",
  "poly-wire-80m": "/images/products/poly-wire-80m.jpg",
  "electric-fence-energizer-3j": "/images/products/electric-fence-energizer-3j.jpg",
  "electric-fence-energizer-6j": "/images/products/electric-fence-energizer-6j.jpg",
  "fence-insulators-pack-100": "/images/products/fence-insulators-pack-100.jpg",
  "electric-fence-warning-signs": "/images/products/electric-fence-warning-signs.jpg",
  "fence-backup-battery-12v-9ah": "/images/products/fence-backup-battery-12v-9ah.jpg",
  "roll-remote-4-button": "/images/products/roll-remote-4-button.jpg",
  "gsm-gate-controller": "/images/products/gsm-gate-controller.jpg",
  "sliding-gate-motor-800kg": "/images/products/sliding-gate-motor-800kg.jpg",
  "swing-gate-motor": "/images/products/swing-gate-motor.jpg",
  "gate-photocell": "/images/products/gate-photocell.jpg",
  "boom-barrier-6m": "/images/products/boom-barrier-6m.jpg",
  "hybrid-inverter-8kw": "/images/products/hybrid-inverter-8kw.jpg",
  "offgrid-inverter-5kva": "/images/products/offgrid-inverter-5kva.jpg",
  "lithium-battery-5kwh": "/images/products/lithium-battery-5kwh.jpg",
  "gel-battery-200ah": "/images/products/gel-battery-200ah.jpg",
  "solar-flood-light-30w": "/images/products/solar-flood-light-30w.jpg",
  "solar-borehole-pump": "/images/products/solar-borehole-pump.jpg",
  "solar-cable-6mm": "/images/products/solar-cable-6mm.jpg",
  "solar-panel-450w": "/images/products/solar-panel-450w.jpg",
  "wifi6-router": "/images/products/wifi6-router.jpg",
  "24port-gigabit-switch": "/images/products/24port-gigabit-switch.jpg",
  "wifi6-access-point": "/images/products/wifi6-access-point.jpg",
  "wall-mount-rack-6u": "/images/products/wall-mount-rack-6u.jpg",
  "starlink-mount-kit-pro": "/images/products/starlink-mount-kit-pro.jpg",
  "cat6-cable-305m": "/images/products/cat6-cable-305m.jpg",
  "cat6-keystone-rj45": "/images/products/cat6-keystone-rj45.jpg",
  "24port-patch-panel": "/images/products/24port-patch-panel.jpg",
  "ups-1500va": "/images/products/ups-1500va.jpg",
  "business-desktop-core-i5": "/images/products/business-desktop-core-i5.jpg",
  "portable-ssd-1tb": "/images/products/portable-ssd-1tb.jpg",
  "mechanical-keyboard-kit": "/images/products/mechanical-keyboard-kit.jpg",
};

const SCENE_LABEL = "font-mono text-xs font-semibold uppercase tracking-[0.25em] text-green-400";
const SCENE_BAR = "pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-mt-950/95 via-mt-950/70 to-transparent px-4 pb-3 pt-10";

export default function ProductImage({
  art,
  slug,
  label,
  className = "",
}: {
  art: string;
  slug?: string;
  label?: string;
  className?: string;
}) {
  const photo = slug ? productPhotos[slug] : realPhotos[art];
  const scene = sceneMap[art] ?? <GenericArt label={art} />;
  return (
    <div className={`relative overflow-hidden bg-mt-900 ${className}`}>
      {photo ? (
        <img
          src={photo}
          alt={label || art}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <>
          {scene}
          {label && (
            <div className={SCENE_BAR}>
              <span className={SCENE_LABEL}>{label}</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
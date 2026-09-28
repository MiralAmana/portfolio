import { useEffect, useRef, useState } from 'react';

type V = { x: number; y: number };

const RANGE = 6;
const snap = (n: number) => Math.round(n * 4) / 4;
const clamp = (n: number) => Math.max(-RANGE + 0.5, Math.min(RANGE - 0.5, n));
const fmt = (n: number) => (Math.round(n * 100) / 100).toFixed(2).replace(/\.?0+$/, '') || '0';

const DEFAULTS = { v1: { x: 2, y: 1 } as V, v2: { x: -1, y: 2 } as V, a: 1.5, b: 1 };

export interface VectorLabels {
  svgLabel: string;
  tipLabel: string;
  combination: string;
  independent: string;
  dependent: string;
  independentText: string;
  dependentText: string;
  hint: string;
  reset: string;
}

export default function VectorLab({ labels }: { labels: VectorLabels }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [size, setSize] = useState(520);
  const [v1, setV1] = useState<V>(DEFAULTS.v1);
  const [v2, setV2] = useState<V>(DEFAULTS.v2);
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const drag = useRef<'v1' | 'v2' | null>(null);

  // Numbers ease in from 0 the first time the lab is on screen.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setA(DEFAULTS.a);
      setB(DEFAULTS.b);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / 1100);
      const e = 1 - Math.pow(1 - p, 3);
      setA(DEFAULTS.a * e);
      setB(DEFAULTS.b * e);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => setSize(Math.max(280, Math.min(560, Math.round(el.clientWidth))));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const u = size / (RANGE * 2);
  const px = (x: number) => size / 2 + x * u;
  const py = (y: number) => size / 2 - y * u;

  const r: V = { x: a * v1.x + b * v2.x, y: a * v1.y + b * v2.y };
  const det = v1.x * v2.y - v1.y * v2.x;
  const independent = Math.abs(det) > 0.05;

  const toWorld = (e: React.PointerEvent): V => {
    const rect = svgRef.current!.getBoundingClientRect();
    const sx = ((e.clientX - rect.left) / rect.width) * size;
    const sy = ((e.clientY - rect.top) / rect.height) * size;
    return { x: clamp(snap((sx - size / 2) / u)), y: clamp(snap((size / 2 - sy) / u)) };
  };

  const onMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    const p = toWorld(e);
    if (drag.current === 'v1') setV1(p);
    else setV2(p);
  };
  const endDrag = () => {
    drag.current = null;
  };
  const nudge = (which: 'v1' | 'v2') => (e: React.KeyboardEvent) => {
    const d: Record<string, [number, number]> = {
      ArrowLeft: [-0.25, 0],
      ArrowRight: [0.25, 0],
      ArrowUp: [0, 0.25],
      ArrowDown: [0, -0.25]
    };
    const s = d[e.key];
    if (!s) return;
    e.preventDefault();
    const set = which === 'v1' ? setV1 : setV2;
    set((v) => ({ x: clamp(v.x + s[0]), y: clamp(v.y + s[1]) }));
  };

  const arrow = (to: V, color: string, w = 1.6, dash?: string, from: V = { x: 0, y: 0 }) => {
    const x1 = px(from.x), y1 = py(from.y), x2 = px(to.x), y2 = py(to.y);
    const ang = Math.atan2(y2 - y1, x2 - x1);
    const h = 8;
    const hx = (k: number) => x2 - h * Math.cos(ang + k);
    const hy = (k: number) => y2 - h * Math.sin(ang + k);
    return (
      <g stroke={color} strokeWidth={w} strokeLinecap="round" fill="none">
        <line x1={x1} y1={y1} x2={x2} y2={y2} strokeDasharray={dash} />
        {!dash && <path d={`M${hx(0.45)},${hy(0.45)} L${x2},${y2} L${hx(-0.45)},${hy(-0.45)}`} />}
      </g>
    );
  };

  const reset = () => {
    setV1(DEFAULTS.v1);
    setV2(DEFAULTS.v2);
    setA(DEFAULTS.a);
    setB(DEFAULTS.b);
  };

  const ticks = Array.from({ length: RANGE * 2 + 1 }, (_, i) => i - RANGE);
  const A = { x: a * v1.x, y: a * v1.y };
  const B = { x: b * v2.x, y: b * v2.y };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] items-start">
      <div ref={wrapRef} className="w-full min-w-0">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${size} ${size}`}
          width={size}
          height={size}
          className="block mx-auto w-full max-w-[520px] h-auto touch-none select-none rounded-2xl border border-line bg-[rgba(255,255,255,0.02)]"
          onPointerMove={onMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          role="group"
          aria-label={labels.svgLabel}
        >
          {ticks.map((t) => (
            <g key={t}>
              <line x1={px(t)} y1={0} x2={px(t)} y2={size} stroke="#F4F3F1" strokeOpacity={t === 0 ? 0.28 : 0.06} />
              <line x1={0} y1={py(t)} x2={size} y2={py(t)} stroke="#F4F3F1" strokeOpacity={t === 0 ? 0.28 : 0.06} />
            </g>
          ))}

          {/* parallelogram of the combination */}
          <path
            d={`M${px(0)},${py(0)} L${px(A.x)},${py(A.y)} L${px(r.x)},${py(r.y)} L${px(B.x)},${py(B.y)} Z`}
            fill="#A5B4FC"
            fillOpacity={independent ? 0.07 : 0.03}
            stroke="none"
          />
          {arrow(A, '#A5B4FC', 1.2, '3 5')}
          {arrow(B, '#A5B4FC', 1.2, '3 5')}
          {arrow(r, '#F4F3F1', 2)}
          {arrow(v1, '#A5B4FC', 1.8)}
          {arrow(v2, '#A5B4FC', 1.8)}

          <circle cx={px(r.x)} cy={py(r.y)} r="3.5" fill="#F4F3F1" />

          {(['v1', 'v2'] as const).map((k) => {
            const v = k === 'v1' ? v1 : v2;
            return (
              <g
                key={k}
                role="slider"
                tabIndex={0}
                aria-label={labels.tipLabel.replace('{k}', k).replace('{x}', fmt(v.x)).replace('{y}', fmt(v.y))}
                aria-valuetext={`(${fmt(v.x)}, ${fmt(v.y)})`}
                className="cursor-grab outline-none [&:focus-visible>circle:first-child]:stroke-ink active:cursor-grabbing"
                onPointerDown={(e) => {
                  (e.target as Element).setPointerCapture?.(e.pointerId);
                  drag.current = k;
                }}
                onKeyDown={nudge(k)}
              >
                <circle cx={px(v.x)} cy={py(v.y)} r="14" fill="#A5B4FC" fillOpacity="0.14" stroke="transparent" strokeWidth="1.5" />
                <circle cx={px(v.x)} cy={py(v.y)} r="5" fill="#A5B4FC" />
                <text
                  x={px(v.x) + 12}
                  y={py(v.y) - 12}
                  fontFamily="'IBM Plex Mono', monospace"
                  fontSize="12"
                  fill="#F4F3F1"
                  style={{ paintOrder: 'stroke', stroke: '#050506', strokeWidth: 3 }}
                >
                  {k === 'v1' ? 'v₁' : 'v₂'}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="glass rounded-3xl p-7 sm:p-8">
        <p className="label-mono">{labels.combination}</p>
        <p className="mt-4 font-display text-2xl font-light text-ink tabular-nums">
          {fmt(a)}·v₁ + {fmt(b)}·v₂ = ({fmt(r.x)}, {fmt(r.y)})
        </p>

        <div className="mt-8 space-y-6">
          <label className="block">
            <span className="flex justify-between label-mono">
              <span>a</span>
              <span className="tabular-nums text-ink">{fmt(a)}</span>
            </span>
            <input
              type="range"
              min={-2}
              max={2}
              step={0.05}
              value={a}
              onChange={(e) => setA(parseFloat(e.target.value))}
              className="mt-3 w-full accent-[#A5B4FC]"
            />
          </label>
          <label className="block">
            <span className="flex justify-between label-mono">
              <span>b</span>
              <span className="tabular-nums text-ink">{fmt(b)}</span>
            </span>
            <input
              type="range"
              min={-2}
              max={2}
              step={0.05}
              value={b}
              onChange={(e) => setB(parseFloat(e.target.value))}
              className="mt-3 w-full accent-[#A5B4FC]"
            />
          </label>
        </div>

        <div className="mt-8 border-t border-line pt-6" aria-live="polite">
          <p className="label-mono">
            v₁ = ({fmt(v1.x)}, {fmt(v1.y)}) &nbsp; v₂ = ({fmt(v2.x)}, {fmt(v2.y)})
          </p>
          <p className="mt-3 text-ink">
            <span className={independent ? 'text-accent' : 'text-muted'}>
              {independent ? labels.independent : labels.dependent}
            </span>{' '}
            <span className="text-muted">
              {independent ? labels.independentText : labels.dependentText}
            </span>
          </p>
          <p className="mt-3 label-mono">det = {fmt(det)}</p>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <p className="text-sm text-muted">{labels.hint}</p>
          <button
            type="button"
            onClick={reset}
            className="shrink-0 cursor-pointer rounded-full border border-line px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-ink hover:border-white/25"
          >
            {labels.reset}
          </button>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useMemo, useRef, useState } from 'react';

export type Status = 'understood' | 'onmyway';

export interface Topic {
  name: string;
  definition?: string;
  status?: Status;
}

export interface Category {
  id: string;
  title: string;
  topics: Topic[];
}

interface Props {
  categories: Category[];
  initialCategory?: string;
  labels: Labels;
}

export interface Labels {
  center: string;
  svgLabel: string;
  category: string;
  categorySuffix: string;
  understood: string;
  onmyway: string;
  selectTopic: string;
  empty: string;
}

function statusMark(s?: Status) {
  return s === 'understood' ? '✓' : s === 'onmyway' ? '→' : '·';
}

export default function KnowledgeConstellation({ categories, initialCategory, labels }: Props) {
  const STATUS_LABEL: Record<Status, string> = { understood: labels.understood, onmyway: labels.onmyway };
  const wrapRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 620, h: 520 });
  const [catId, setCatId] = useState(initialCategory ?? categories[0]?.id);
  const [topicName, setTopicName] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => {
      const w = Math.max(280, Math.round(el.clientWidth));
      setSize({ w, h: w < 480 ? 560 : Math.min(540, Math.round(w * 0.82)) });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const nodes = useMemo(() => {
    const { w, h } = size;
    const cx = w / 2;
    const cy = h / 2;
    const narrow = w < 480;
    const rx = w * (narrow ? 0.26 : 0.3);
    const ry = h * 0.3;
    const R = Math.min(w, h) * (narrow ? 0.17 : 0.2);
    return categories.map((c, i) => {
      const ang = ((-90 + i * (360 / categories.length)) * Math.PI) / 180;
      const x = cx + Math.cos(ang) * rx;
      const y = cy + Math.sin(ang) * ry;
      const outward = Math.atan2(y - cy, x - cx);
      const n = c.topics.length;
      const spread = Math.min(Math.PI * 0.9, n * 0.5);
      const topics = c.topics.map((t, j) => {
        const a = n === 1 ? outward : outward - spread / 2 + (spread * j) / (n - 1);
        return { ...t, x: x + Math.cos(a) * R, y: y + Math.sin(a) * R };
      });
      return { ...c, x, y, topics, cx, cy };
    });
  }, [categories, size]);

  const active = categories.find((c) => c.id === catId) ?? categories[0];
  const activeTopic = active?.topics.find((t) => t.name === topicName) ?? null;

  const pickCategory = (id: string) => {
    setCatId(id);
    setTopicName(null);
  };
  const pickTopic = (id: string, name: string) => {
    setCatId(id);
    setTopicName(name);
  };
  const onKey = (fn: () => void) => (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      fn();
    }
  };

  const { w, h } = size;
  const labelX = (x: number) => Math.min(Math.max(x, 56), w - 56);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr] items-start">
      <div ref={wrapRef} className="relative w-full">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          width={w}
          height={h}
          role="group"
          aria-label={labels.svgLabel}
          className="block w-full h-auto overflow-visible"
        >
          {/* center */}
          <circle cx={w / 2} cy={h / 2} r="3" fill="#F4F3F1" opacity="0.5" />
          <circle cx={w / 2} cy={h / 2} r="16" fill="none" stroke="#F4F3F1" strokeOpacity="0.08" />
          <text
            x={w / 2}
            y={h / 2 + 32}
            textAnchor="middle"
            fontFamily="'IBM Plex Mono', monospace"
            fontSize="9"
            letterSpacing="2.5"
            fill="#93939C"
          >
            {labels.center}
          </text>

          {nodes.map((c, i) => {
            const isActive = c.id === active?.id;
            const dim = isActive ? 1 : 0.45;
            return (
              <g key={c.id}>
                <g opacity={dim} style={{ transition: 'opacity 0.4s' }}>
                <line
                  x1={c.cx}
                  y1={c.cy}
                  x2={c.x}
                  y2={c.y}
                  stroke="#A5B4FC"
                  strokeOpacity={isActive ? 0.35 : 0.14}
                  strokeDasharray="2 5"
                />
                {c.topics.map((t, j) => {
                  const sel = isActive && t.name === topicName;
                  const show = sel || hovered === `${c.id}:${t.name}`;
                  return (
                    <g key={t.name}>
                      <line
                        x1={c.x}
                        y1={c.y}
                        x2={t.x}
                        y2={t.y}
                        stroke="#F4F3F1"
                        strokeOpacity={isActive ? 0.22 : 0.1}
                      />
                      <g
                        role="button"
                        tabIndex={0}
                        aria-label={`${t.name}, ${c.title}`}
                        className="cursor-pointer outline-none [&:focus-visible>circle:last-of-type]:stroke-accent"
                        onClick={() => pickTopic(c.id, t.name)}
                        onKeyDown={onKey(() => pickTopic(c.id, t.name))}
                        onMouseEnter={() => setHovered(`${c.id}:${t.name}`)}
                        onMouseLeave={() => setHovered(null)}
                        onFocus={() => setHovered(`${c.id}:${t.name}`)}
                        onBlur={() => setHovered(null)}
                      >
                        <g
                          style={{
                            animation: `node-in 0.6s cubic-bezier(0.22,1,0.36,1) ${0.3 + i * 0.1 + j * 0.05}s both`,
                            transformBox: 'fill-box',
                            transformOrigin: 'center'
                          }}
                        >
                          <g
                            style={{
                              animation: `drift ${7 + ((i + j) % 4)}s ease-in-out ${-j}s infinite`
                            }}
                          >
                            <circle cx={t.x} cy={t.y} r={sel || show ? 5 : 3.5} fill={sel ? '#A5B4FC' : '#F4F3F1'} fillOpacity={sel ? 1 : 0.75} style={{ transition: 'r 0.25s' }} />
                            <circle cx={t.x} cy={t.y} r="16" fill="transparent" stroke="none" strokeWidth="1.5" />
                          </g>
                        </g>
                        {show && (
                          <text
                            x={labelX(t.x)}
                            y={t.y - 12}
                            textAnchor="middle"
                            fontFamily="Inter, sans-serif"
                            fontSize="12"
                            fill="#F4F3F1"
                            style={{ paintOrder: 'stroke', stroke: '#050506', strokeWidth: 4 }}
                          >
                            {t.name}
                          </text>
                        )}
                      </g>
                    </g>
                  );
                })}
                </g>

                <g
                  role="button"
                  tabIndex={0}
                  aria-label={`${c.title}, ${labels.categorySuffix}`}
                  aria-pressed={isActive}
                  className="cursor-pointer outline-none group"
                  onClick={() => pickCategory(c.id)}
                  onKeyDown={onKey(() => pickCategory(c.id))}
                >
                  <g
                    style={{
                      animation: `node-in 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 0.1}s both`,
                      transformBox: 'fill-box',
                      transformOrigin: 'center'
                    }}
                  >
                    <circle cx={c.x} cy={c.y} r="22" fill="transparent" />
                    <circle cx={c.x} cy={c.y} r={isActive ? 16 : 12} fill="none" stroke="#A5B4FC" strokeOpacity={isActive ? 0.5 : 0.2} style={{ transition: 'all 0.4s' }} />
                    <circle cx={c.x} cy={c.y} r="6" fill={isActive ? '#A5B4FC' : '#F4F3F1'} style={{ transition: 'fill 0.4s' }} />
                    <text
                      x={labelX(c.x)}
                      y={c.y + (c.y < h / 2 ? 34 : -26)}
                      textAnchor="middle"
                      fontFamily="'IBM Plex Mono', monospace"
                      fontSize="10.5"
                      letterSpacing="2"
                      fill={isActive ? '#F4F3F1' : '#A9A9B2'}
                      style={{ transition: 'fill 0.4s', textTransform: 'uppercase', paintOrder: 'stroke', stroke: '#050506', strokeWidth: 4 }}
                    >
                      {c.title}
                    </text>
                  </g>
                </g>
              </g>
            );
          })}
        </svg>
      </div>

      {/* detail panel */}
      <div className="glass rounded-3xl p-7 sm:p-8 lg:sticky lg:top-28" aria-live="polite">
        <p className="label-mono">{labels.category}</p>
        <h3 className="mt-3 font-display font-light text-3xl text-ink">{active?.title}</h3>

        {active && active.topics.length > 0 ? (
          <ul className="mt-6 flex flex-wrap gap-2">
            {active.topics.map((t) => {
              const sel = t.name === topicName;
              return (
                <li key={t.name}>
                  <button
                    type="button"
                    onClick={() => setTopicName(sel ? null : t.name)}
                    onMouseEnter={() => setHovered(`${active.id}:${t.name}`)}
                    onMouseLeave={() => setHovered(null)}
                    aria-pressed={sel}
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors duration-200 cursor-pointer ${
                      sel
                        ? 'border-accent/60 text-ink bg-accent/10'
                        : 'border-line text-muted hover:text-ink hover:border-white/20'
                    }`}
                  >
                    <span className={`font-mono text-xs ${t.status === 'understood' ? 'text-accent' : ''}`} aria-hidden="true">
                      {statusMark(t.status)}
                    </span>
                    {t.name}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="mt-6 text-muted leading-relaxed">
            {labels.empty}
          </p>
        )}

        <div className="mt-7 min-h-[7.5rem] border-t border-line pt-6">
          {activeTopic ? (
            <>
              <p className="font-display text-xl text-ink">{activeTopic.name}</p>
              {activeTopic.status && (
                <p className="mt-2 label-mono">
                  <span className={activeTopic.status === 'understood' ? 'text-accent' : ''}>
                    {statusMark(activeTopic.status)}
                  </span>{' '}
                  {STATUS_LABEL[activeTopic.status]}
                </p>
              )}
              {activeTopic.definition && (
                <p className="mt-3 text-muted leading-relaxed">{activeTopic.definition}</p>
              )}
            </>
          ) : (
            <p className="text-muted text-sm leading-relaxed">
              {active && active.topics.length > 0
                ? labels.selectTopic
                : ''}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

import { memo, useEffect, useRef, useState } from 'react';

export type Mood = 'neutral' | 'happy' | 'surprised';

type Cell = { x: number; y: number; w: number; h?: number };

// Turns a '#'/'.' bitmap into horizontal runs, so each stroke is one <rect> instead of one per pixel.
const toRuns = (rows: string[], ox = 0, oy = 0): Cell[] =>
  rows.flatMap((row, y) => {
    const runs: Cell[] = [];
    let start = -1;
    for (let x = 0; x <= row.length; x++) {
      if (row[x] === '#') {
        if (start < 0) start = x;
      } else if (start >= 0) {
        runs.push({ x: ox + start, y: oy + y, w: x - start });
        start = -1;
      }
    }
    return runs;
  });

const FOUR = [
  '....######..',
  '....######..',
  '...##.####..',
  '...##.####..',
  '..##..####..',
  '..##..####..',
  '.##...####..',
  '.##...####..',
  '##....####..',
  '##....####..',
  '############',
  '############',
  '......####..',
  '......####..',
  '......####..',
  '......####..',
];

const FACE_RING = [
  '.....######.....',
  '...##......##...',
  '..#..........#..',
  '.#............#.',
  '.#............#.',
  '#..............#',
  '#..............#',
  '#..............#',
  '#..............#',
  '#..............#',
  '#..............#',
  '.#............#.',
  '.#............#.',
  '..#..........#..',
  '...##......##...',
  '.....######.....',
];

const MOUTHS: Record<Mood, Cell[]> = {
  neutral: toRuns(['....########....'], 0, 11),
  happy: toRuns(['...#........#...', '....#......#....', '.....######.....'], 0, 10),
  surprised: toRuns(['.......##.......', '......#..#......', '.......##.......'], 0, 10),
};

const EYES_OPEN: Cell[] = [
  { x: 5, y: 4, w: 2, h: 4 },
  { x: 9, y: 4, w: 2, h: 4 },
];
const EYES_SQUINT: Cell[] = [
  { x: 5, y: 5, w: 2, h: 2 },
  { x: 9, y: 5, w: 2, h: 2 },
];
const EYES_SHUT: Cell[] = [
  { x: 5, y: 6, w: 2, h: 1 },
  { x: 9, y: 6, w: 2, h: 1 },
];

const GAP = 3;
const FACE_X = FOUR[0].length + GAP;
const RIGHT_FOUR_X = FACE_X + FACE_RING[0].length + GAP;
const WIDTH = RIGHT_FOUR_X + FOUR[0].length;
const HEIGHT = FOUR.length;
const FACE_CENTER_X = FACE_X + FACE_RING[0].length / 2;

const LEFT_FOUR_CELLS = toRuns(FOUR);
const RIGHT_FOUR_CELLS = toRuns(FOUR, RIGHT_FOUR_X);
const RING_CELLS = toRuns(FACE_RING);

const Rects = ({ cells }: { cells: Cell[] }) => (
  <>
    {cells.map((c) => (
      <rect key={`${c.x}-${c.y}`} x={c.x} y={c.y} width={c.w} height={c.h ?? 1} />
    ))}
  </>
);

const clampStep = (distance: number, reach: number) => Math.max(-1, Math.min(1, Math.round(distance / reach)));

// "4😐4" drawn as pixel art. The eyes follow the pointer one pixel at a time and blink now and then;
// `mood` swaps the expression.
const Pixel404 = memo(({ mood }: { mood: Mood }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [look, setLook] = useState({ x: 0, y: 0 });
  const [blinking, setBlinking] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = svgRef.current?.getBoundingClientRect();
        if (!r) return;
        const x = clampStep(e.clientX - (r.left + r.width * (FACE_CENTER_X / WIDTH)), r.width * 0.3);
        const y = clampStep(e.clientY - (r.top + r.height / 2), r.height * 0.9);
        setLook((prev) => (prev.x === x && prev.y === y ? prev : { x, y }));
      });
    };
    // relatedTarget is null only when the pointer leaves the window.
    const onOut = (e: PointerEvent) => {
      if (!e.relatedTarget) setLook({ x: 0, y: 0 });
    };

    let blinkTimer = 0;
    let openTimer = 0;
    const scheduleBlink = () => {
      blinkTimer = window.setTimeout(() => {
        setBlinking(true);
        openTimer = window.setTimeout(() => {
          setBlinking(false);
          scheduleBlink();
        }, 140);
      }, 2600 + Math.random() * 2400);
    };

    window.addEventListener('pointermove', onMove);
    document.addEventListener('pointerout', onOut);
    scheduleBlink();

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(blinkTimer);
      window.clearTimeout(openTimer);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerout', onOut);
    };
  }, []);

  const eyes = blinking ? EYES_SHUT : mood === 'happy' ? EYES_SQUINT : EYES_OPEN;

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="block w-full h-auto"
      shapeRendering="crispEdges"
      fill="currentColor"
      aria-hidden="true"
    >
      <Rects cells={LEFT_FOUR_CELLS} />
      <g transform={`translate(${FACE_X} 0)`}>
        <Rects cells={RING_CELLS} />
        <g transform={`translate(${look.x} ${look.y})`}>
          <Rects cells={eyes} />
        </g>
        <Rects cells={MOUTHS[mood]} />
      </g>
      <Rects cells={RIGHT_FOUR_CELLS} />
    </svg>
  );
});

Pixel404.displayName = 'Pixel404';

export default Pixel404;

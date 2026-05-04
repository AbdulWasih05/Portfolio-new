const stack = [
  { cat: 'AI & Agents', items: ['PyTorch', 'HuggingFace', 'AWS Bedrock', 'ONNX Runtime', 'OpenEnv'] },
  { cat: 'Backend', items: ['FastAPI', 'Node.js', 'PostgreSQL', 'Redis'] },
  { cat: 'Web', items: ['React', 'Next.js', 'TypeScript', 'Tailwind'] },
  { cat: 'Infra', items: ['AWS', 'Docker', 'Git'] },
];

const StackList = () => (
  <section aria-label="Stack" className="border-b border-ink">
    {stack.map((row, i) => (
      <div
        key={row.cat}
        className={`grid grid-cols-[120px_1fr] sm:grid-cols-[160px_1fr] font-mono text-[11px] sm:text-[13px] uppercase tracking-[0.1em] transition-colors duration-150 hover:bg-ink hover:text-paper group ${
          i < stack.length - 1 ? 'border-b border-ink' : ''
        }`}
      >
        <div className="px-4 sm:px-[22px] py-[14px] sm:py-[18px] border-r border-ink font-bold text-ink group-hover:text-paper">
          {row.cat}
        </div>
        <div className="px-4 sm:px-[22px] py-[14px] sm:py-[18px] flex flex-wrap gap-y-1 text-ink-2 group-hover:text-rule">
          {row.items.map((it, j) => (
            <span key={it} className="inline-flex items-center">
              {j > 0 && <span className="px-3 text-mute group-hover:text-rule" aria-hidden>·</span>}
              {it}
            </span>
          ))}
        </div>
      </div>
    ))}
  </section>
);

export default StackList;

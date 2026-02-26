interface SeparatorProps {
  className?: string;
  fullWidth?: boolean;
}

export default function Separator({ className = "", fullWidth = false }: SeparatorProps) {
  return (
    <div
      className={`hidden md:block absolute right-6 h-px bg-[var(--pattern-fg)] opacity-90 dark:opacity-15 ${fullWidth ? 'left-0' : 'w-[53rem]'} ${className}`}
    />
  );
}

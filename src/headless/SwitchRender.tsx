type SwitchRendererProps<T extends string | number> = {
  caseBy: Partial<Record<T, React.ReactElement | null>>;
  value: T | null;
  defaultComponent?: React.ReactElement | null;
};

const SwitchRenderer = <T extends string | number>({
  value,
  caseBy,
  defaultComponent = null,
}: SwitchRendererProps<T>) => {
  if (value === null) {
    return defaultComponent;
  }

  return caseBy[value] ?? defaultComponent;
};

export default SwitchRenderer;

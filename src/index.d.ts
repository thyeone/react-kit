type PropsWithStrictChildren<P = unknown, T extends React.ReactNode = ReactNode> = P & {
  children: T;
};

type RenderPropsChildren<P = unknown, T = unknown> = P & {
  children: ((props: T) => React.ReactNode) | React.ReactNode;
};

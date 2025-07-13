import { forwardRef, lazy, Suspense } from 'react';
import type * as Icons from './svgs';
import type { PolymorphicComponentProps } from '@/headless/polymorphics';
import { Flex, type FlexProps } from '@/headless/ui/Flex';

export type IconName = keyof typeof Icons;

export type IconProps = React.SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: number;
};

function IconComponent(props: IconProps) {
  const {
    name,
    width = props.width ?? props.size ?? 24,
    height = props.height ?? props.size ?? 24,
    fill = 'none',
    ...rest
  } = props;

  const IconElement = lazy(() =>
    import(`./svgs/${name}`).then((module) => ({ default: module[name] })),
  ) as React.ComponentType<React.SVGProps<SVGSVGElement>>;

  return (
    <Suspense>
      <IconElement
        width={width}
        height={height}
        fill={fill}
        style={{
          flexShrink: 0,
        }}
        {...rest}
      />
    </Suspense>
  );
}

export const Icon = forwardRef(IconComponent);

export type IconButtonProps<C extends React.ElementType = 'button'> =
  IconProps &
    FlexProps<C> & {
      className?: string;
    };

export const IconButton = <C extends React.ElementType = 'button'>({
  as,
  component,
  name,
  width,
  height,
  size,
  fill = 'none',
  style,
  ...rest
}: PolymorphicComponentProps<C, IconButtonProps<C>>) => {
  const Component = component ?? Flex;

  const iconProps: IconProps = {
    name,
    width: width || size,
    height: height || size,
    fill,
  };

  const componentProps =
    Component === Flex
      ? {
          as: as ?? 'button',
          center: true,
          style: { flexShrink: 0, ...style },
          ...rest,
        }
      : {
          style: { flexShrink: 0, ...style },
          ...rest,
        };

  return (
    <Component {...componentProps}>
      <Icon {...iconProps} />
    </Component>
  );
};

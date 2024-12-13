import React, { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../libs/cn';

export type TagName = keyof React.JSX.IntrinsicElements;

export type FlexProps<K extends TagName = 'div'> = Omit<React.ComponentPropsWithoutRef<K>, 'classID'> & {
  as?: K;
  asChild?: boolean;
  gap?: number;
  direction?: 'row' | 'col';
  centered?: boolean;
  align?: 'start' | 'center' | 'end';
  justify?: 'start' | 'center' | 'end' | 'between';
};

const FlexComponent = <K extends TagName = 'div'>(
  {
    as,
    asChild,
    children,
    className,
    direction = 'row',
    centered = false,
    align,
    justify,
    gap,
    ...props
  }: FlexProps<K>,
  ref: React.ForwardedRef<React.ElementRef<K>>
) => {
  const Element = as || 'div';

  const flexClasses = cn(
    'flex',
    { 'flex-row': direction === 'row' },
    { 'flex-col': direction === 'col' },
    { 'items-start': align === 'start' },
    { 'items-center': align === 'center' },
    { 'items-end': align === 'end' },
    { 'justify-start': justify === 'start' },
    { 'justify-center': justify === 'center' },
    { 'justify-end': justify === 'end' },
    { 'justify-between': justify === 'between' },
    { 'justify-center items-center': centered },
    className
  );

  const componentProps = {
    ...(as === 'button' && { type: 'button' }),
    style: { gap },
    className: flexClasses,
    ref,
    ...props,
  };

  if (asChild) {
    return <Slot {...(componentProps as React.HTMLAttributes<HTMLElement>)}>{children}</Slot>;
  }

  return React.createElement(Element, componentProps, children);
};

export const Flex = forwardRef(FlexComponent) as <K extends TagName = 'div'>(
  props: FlexProps<K> & { ref?: React.Ref<React.ElementRef<K>> }
) => JSX.Element;

import { cva, type VariantProps } from 'class-variance-authority';
import { type ElementType, forwardRef } from 'react';
import { Box, type BoxProps } from '@/headless/ui/Box';
import { cn } from '@/libs/cn';
import type { PolymorphicRef } from '@/headless/polymorphics';

export const textVariants = cva('', {
  variants: {
    variant: {
      '12-rg': 'font-normal text-[12px] leading-[18px]',
      '12-md': 'font-medium text-[12px] leading-[100%]',
      '12-bd': 'font-bold text-[12px] leading-[100%]',
      '13-rg': 'font-normal text-[13px] leading-[100%]',
      '13-md': 'font-medium text-[13px] leading-[100%]',
      '13-bd': 'font-bold text-[13px] leading-[100%]',
      '14-rg': 'font-normal text-[14px] leading-[100%]',
      '14-md': 'font-medium text-[14px] leading-[100%]',
      '14-bd': 'font-bold text-[14px] leading-[100%]',
      '15-rg': 'font-normal text-[15px] leading-[100%]',
      '15-md': 'font-medium text-[15px] leading-[100%]',
      '15-bd': 'font-bold text-[15px] leading-[100%]',
      '16-rg': 'font-normal text-[16px] leading-[100%]',
      '16-md': 'font-medium text-[16px] leading-[100%]',
      '16-bd': 'font-bold text-[16px] leading-[100%]',
      '18-rg': 'font-normal text-[18px] leading-[100%]',
      '18-md': 'font-medium text-[18px] leading-[100%]',
      '18-bd': 'font-bold text-[18px] leading-[100%]',
      '20-rg': 'font-normal text-[20px] leading-[100%]',
      '20-md': 'font-medium text-[20px] leading-[100%]',
      '20-bd': 'font-bold text-[20px] leading-[100%]',
      '24-rg': 'font-normal text-[24px] leading-[100%]',
      '24-md': 'font-medium text-[24px] leading-[100%]',
      '24-bd': 'font-bold text-[24px] leading-[100%]',
      '28-rg': 'font-normal text-[28px] leading-[100%]',
      '28-md': 'font-medium text-[28px] leading-[100%]',
      '28-bd': 'font-bold text-[28px] leading-[100%]',
      '32-rg': 'font-normal text-[32px] leading-[100%]',
      '32-md': 'font-medium text-[32px] leading-[100%]',
      '32-bd': 'font-bold text-[32px] leading-[100%]',
      '40-rg': 'font-normal text-[40px] leading-[100%]',
      '40-md': 'font-medium text-[40px] leading-[100%]',
      '40-bd': 'font-bold text-[40px] leading-[100%]',
    },
  },
});
type TextProps = VariantProps<typeof textVariants>;

export const Text = forwardRef(function Text<C extends ElementType = 'span'>(
  { as, className, variant, ...rest }: BoxProps<C> & TextProps,
  ref?: PolymorphicRef<C>,
) {
  const typesRest = rest as BoxProps<C>;
  return (
    <Box
      className={cn(textVariants({ variant }), className)}
      ref={ref}
      as={as ?? 'span'}
      {...typesRest}
    />
  );
}) as <C extends ElementType = 'span'>(
  props: BoxProps<C> & { ref?: PolymorphicRef<C> } & TextProps,
) => JSX.Element;

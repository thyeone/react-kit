import { cn } from "../libs/cn";
import { cva } from "class-variance-authority";
import {
  type ComponentPropsWithoutRef,
  type ReactNode,
  type Ref,
  forwardRef,
  useState,
} from "react";

type ImgElementStyle = NonNullable<JSX.IntrinsicElements["img"]["style"]>;

type ObjectFitProps = Extract<
  ImgElementStyle["objectFit"],
  "contain" | "cover" | "fill" | "none" | "scale-down"
>;
type ObjectPositionProps = Extract<
  ImgElementStyle["objectPosition"],
  | "center"
  | "left"
  | "right"
  | "top"
  | "bottom"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
>;

type ObjectFitVariants = Record<ObjectFitProps, string>;
type ObjectPositionVariants = Record<ObjectPositionProps, string>;

const imageVariants = cva<{
  objectFit: ObjectFitVariants;
  objectPosition: ObjectPositionVariants;
}>("", {
  variants: {
    objectFit: {
      contain: "object-contain",
      cover: "object-cover",
      fill: "object-fill",
      none: "object-none",
      "scale-down": "object-scale-down",
    },
    objectPosition: {
      center: "object-center",
      left: "object-left",
      right: "object-right",
      top: "object-top",
      bottom: "object-bottom",
      "top-left": "object-top-left",
      "top-right": "object-top-right",
      "bottom-left": "object-bottom-left",
      "bottom-right": "object-bottom-right",
    },
  },
});

type ImageProps = ComponentPropsWithoutRef<"img"> & {
  objectFit?: ObjectFitProps;
  objectPosition?: ObjectPositionProps;
  fallback?: ReactNode;
  errorFallback?: ReactNode;
  isError?: boolean;
  isLoading?: boolean;
};

export const Image = forwardRef(function Image(
  props: ImageProps,
  ref: Ref<HTMLImageElement>
) {
  const {
    alt,
    isLoading: injectIsLoading,
    isError: injectIsError,
    className,
    onLoad,
    onError,
    src,
    fallback,
    errorFallback,
    objectFit,
    objectPosition,
    ...rest
  } = props;
  const [_isLoading, setIsLoading] = useState(true);
  const [_isError, setIsError] = useState(false);
  const isError = typeof injectIsError === "boolean" ? injectIsError : _isError;
  const isLoading =
    typeof injectIsLoading === "boolean" ? injectIsLoading : _isLoading;

  const __onLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoading(false);
    onLoad?.(e);
  };

  const __onError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsError(true);
    onError?.(e);
  };

  const ImageElement = (
    <img
      loading="lazy"
      onLoad={__onLoad}
      onError={__onError}
      src={src}
      aria-labelledby={alt}
      alt={alt}
      aria-label={alt}
      ref={ref}
      className={cn(imageVariants({ objectFit, objectPosition }), className)}
      {...rest}
    />
  );

  if (isLoading) {
    return (
      <>
        {fallback}
        <div className="invisible absolute">{ImageElement}</div>
      </>
    );
  }

  if (isError) {
    return errorFallback ?? ImageElement;
  }

  return ImageElement;
});

'use client';

import { Slot } from '@radix-ui/react-slot';
import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import Portal from './overlay/Portal';

type DropdownPosition = {
  top: number;
  left: number;
  width: number;
  triggerHeight: number;
  popoverHeight: number;
};

type ContextValue = {
  position: DropdownPosition;
  setPosition: React.Dispatch<React.SetStateAction<DropdownPosition>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dropDownRef: React.MutableRefObject<HTMLDivElement | null>;
  trigger: 'click' | 'hover';
};

type RenderProps = {
  isOpen: boolean;
  onClose: VoidFunction;
};

type Props = {
  trigger: 'click' | 'hover';
};

const PopoverContext = createContext<ContextValue | undefined>(undefined);

function usePopoverContext() {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error();
  }

  return context;
}

export function Popover({ children, trigger }: RenderPropsChildren<Props, RenderProps>) {
  const [dropdownPosition, setDropdownPosition] = useState<DropdownPosition>({
    top: 0,
    left: 0,
    width: 0,
    triggerHeight: 0,
    popoverHeight: 0,
  });
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  const contextValue = useMemo(
    () => ({
      position: dropdownPosition,
      setPosition: setDropdownPosition,
      isOpen,
      setIsOpen,
      dropDownRef,
      trigger,
    }),
    [dropdownPosition, isOpen]
  );

  return (
    <PopoverContext.Provider value={contextValue}>
      {typeof children === 'function' ? children({ isOpen, onClose: () => setIsOpen(false) }) : children}
    </PopoverContext.Provider>
  );
}

function Trigger({ children }: PropsWithStrictChildren) {
  const { setPosition, isOpen, setIsOpen, dropDownRef, trigger } = usePopoverContext();
  const triggerRef = useRef<HTMLDivElement>(null);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const eventHandlers =
    trigger === 'hover'
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            e.stopPropagation();
            onOpen();
          },
          onMouseLeave: (e: React.MouseEvent) => {
            e.stopPropagation();
            onClose();
          },
        }
      : {
          onClick: (e: React.MouseEvent) => {
            e.stopPropagation();
            setIsOpen((prev) => !prev);
          },
        };

  useEffect(() => {
    if (isOpen && triggerRef.current && dropDownRef.current) {
      const rect = triggerRef.current?.getBoundingClientRect();
      const dropdownRect = dropDownRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom,
        left: rect.left,
        width: rect.width,
        triggerHeight: rect.height,
        popoverHeight: dropdownRect.height,
      });
    }
  }, [isOpen]);

  return (
    <Slot ref={triggerRef} {...eventHandlers}>
      {children}
    </Slot>
  );
}

function Content({
  children,
  left,
  renderOver,
  margin = 10,
}: PropsWithStrictChildren<{
  left?: number;
  renderOver?: boolean;
  margin?: number;
}>) {
  const { position, isOpen, dropDownRef, setIsOpen, trigger } = usePopoverContext();

  useEffect(() => {
    if (trigger === 'hover') {
      const handleScroll = () => {
        setIsOpen(false);
      };

      document.addEventListener('scroll', handleScroll);

      return () => document.removeEventListener('scroll', handleScroll);
    }
  }, [trigger, setIsOpen]);

  return (
    <Portal>
      {isOpen && (
        <div
          ref={dropDownRef}
          style={{
            position: 'fixed',
            top: renderOver
              ? position.top - position.popoverHeight - position.triggerHeight - margin
              : position.top - margin,
            left: left ? position.left + left : position.left,
            zIndex: 1000,
          }}
        >
          {children}
        </div>
      )}
    </Portal>
  );
}

Popover.Trigger = Trigger;
Popover.Content = Content;

"use client";
import React, { useRef, useState, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";

const transition = {
  type: "spring" as const,
  mass: 0.5,
  damping: 14,
  stiffness: 120,
};

interface MenuContextType {
  active: string | null;
  setActive: (item: string | null) => void;
  openMenu: (item: string) => void;
  closeMenuDelayed: (delayMs?: number) => void;
  cancelClose: () => void;
}

const MenuContext = createContext<MenuContextType | null>(null);

export const Menu = ({
  setActive,
  children,
  closeDelay = 2000, // 2-second grace period as requested
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
  closeDelay?: number;
}) => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const cancelClose = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const openMenu = (item: string) => {
    cancelClose();
    setActiveItem(item);
    setActive(item);
  };

  const closeMenuDelayed = (delayMs = closeDelay) => {
    cancelClose();
    timeoutRef.current = setTimeout(() => {
      setActiveItem(null);
      setActive(null);
    }, delayMs);
  };

  return (
    <MenuContext.Provider
      value={{
        active: activeItem,
        setActive: (item) => {
          cancelClose();
          setActiveItem(item);
          setActive(item);
        },
        openMenu,
        closeMenuDelayed,
        cancelClose,
      }}
    >
      <nav
        onMouseEnter={cancelClose}
        onMouseLeave={() => closeMenuDelayed(closeDelay)}
        className="relative rounded-full border border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 shadow-xs flex justify-center items-center space-x-1.5 sm:space-x-2.5 px-3.5 py-1.5"
      >
        {children}
      </nav>
    </MenuContext.Provider>
  );
};

export const MenuItem = ({
  setActive: _ignoredSetActive,
  active: _ignoredActive,
  item,
  children,
}: {
  setActive?: (item: string | null) => void;
  active?: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  const menuCtx = useContext(MenuContext);
  const isItemActive = menuCtx ? menuCtx.active === item : false;

  const handleMouseEnter = () => {
    menuCtx?.openMenu(item);
  };

  const handleMouseLeave = () => {
    menuCtx?.closeMenuDelayed(2000);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isItemActive) {
      menuCtx?.closeMenuDelayed(0);
    } else {
      menuCtx?.openMenu(item);
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative"
    >
      <button
        type="button"
        onClick={handleClick}
        className={`cursor-pointer font-semibold text-xs transition-all whitespace-nowrap px-3 py-1.5 rounded-full select-none ${
          isItemActive
            ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 shadow-xs"
            : "text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100/70 dark:hover:bg-slate-800/70"
        }`}
      >
        {item}
      </button>

      <AnimatePresence>
        {isItemActive && children && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 6 }}
            transition={transition}
            onMouseEnter={() => menuCtx?.cancelClose()}
            onMouseLeave={() => menuCtx?.closeMenuDelayed(2000)}
            className="absolute top-[calc(100%_+_0.5rem)] left-1/2 transform -translate-x-1/2 z-50 pt-2 pointer-events-auto"
          >
            {/* Invisible hover bridge connecting trigger button to popup */}
            <div className="absolute -top-3 left-0 right-0 h-4 bg-transparent" />

            <div className="bg-white dark:bg-slate-900 backdrop-blur-md rounded-2xl overflow-hidden border border-slate-200/90 dark:border-slate-800 shadow-2xl">
              <div className="w-max h-full p-4">
                {children}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
  onClick,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
  onClick?: () => void;
}) => {
  const menuCtx = useContext(MenuContext);

  const handleClick = (e: React.MouseEvent) => {
    if (menuCtx) {
      menuCtx.closeMenuDelayed(0);
    }
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="flex space-x-3 group p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
    >
      <img
        src={src}
        width={100}
        height={60}
        alt={title}
        className="shrink-0 rounded-lg shadow-xs object-cover group-hover:scale-105 transition-transform duration-300 w-24 h-16"
      />
      <div>
        <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h4>
        <p className="text-slate-500 dark:text-slate-400 text-xs max-w-[12rem] leading-tight mt-0.5">
          {description}
        </p>
      </div>
    </a>
  );
};

export const HoveredLink = ({ children, onClick, ...rest }: any) => {
  const menuCtx = useContext(MenuContext);

  const handleClick = (e: React.MouseEvent) => {
    if (menuCtx) {
      menuCtx.closeMenuDelayed(0);
    }
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <a
      {...rest}
      onClick={handleClick}
      className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 px-2.5 py-2 rounded-lg transition-colors font-medium text-xs block cursor-pointer"
    >
      {children}
    </a>
  );
};

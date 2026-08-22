"use client";
import React, { useRef, useState, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";

const dropdownTransition = {
  y: { type: "spring" as const, stiffness: 350, damping: 28 },
  scale: { type: "spring" as const, stiffness: 350, damping: 28 },
  opacity: { duration: 0.12, ease: "easeOut" as const },
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
  closeDelay = 500, // 0.5-second buffer delay
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
        className="relative rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex justify-center items-center space-x-1 sm:space-x-1.5 px-3 py-1.5 z-30"
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
  dropdownPosition = "center",
}: {
  setActive?: (item: string | null) => void;
  active?: string | null;
  item: string;
  children?: React.ReactNode;
  dropdownPosition?: "center" | "left" | "right";
}) => {
  const menuCtx = useContext(MenuContext);
  const isItemActive = menuCtx ? menuCtx.active === item : false;

  const handleMouseEnter = () => {
    menuCtx?.openMenu(item);
  };

  const handleMouseLeave = () => {
    menuCtx?.closeMenuDelayed(500); // 0.5s delay
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isItemActive) {
      menuCtx?.closeMenuDelayed(0);
    } else {
      menuCtx?.openMenu(item);
    }
  };

  const positionClass =
    dropdownPosition === "left"
      ? "left-0"
      : dropdownPosition === "right"
      ? "right-0"
      : "left-1/2 -translate-x-1/2";

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center justify-center"
    >
      <button
        type="button"
        onClick={handleClick}
        onFocus={handleMouseEnter}
        className={`cursor-pointer font-semibold text-xs transition-all whitespace-nowrap px-3.5 py-1.5 rounded-full select-none flex items-center justify-center leading-none ${
          isItemActive
            ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/80 shadow-xs font-bold"
            : "text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800"
        }`}
      >
        {item}
      </button>

      <AnimatePresence>
        {isItemActive && children && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 6 }}
            transition={dropdownTransition}
            onMouseEnter={() => menuCtx?.cancelClose()}
            onMouseLeave={() => menuCtx?.closeMenuDelayed(500)}
            className={`absolute top-full pt-3 z-50 pointer-events-auto ${positionClass}`}
          >
            {/* Invisible hover bridge connecting trigger button to popup */}
            <div className="absolute -top-3 left-0 right-0 h-4 bg-transparent" />

            {/* 100% Solid Opaque Card Container with Deep Drop Shadow */}
            <div
              className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.35)] ring-1 ring-black/5 dark:ring-white/10"
              style={{ backgroundColor: '#ffffff' }}
            >
              <div
                className="w-max h-full p-4 text-slate-900 dark:text-white"
                style={{ backgroundColor: '#ffffff' }}
              >
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
      className="flex space-x-3 group p-2.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer text-left items-center"
      style={{ backgroundColor: '#ffffff' }}
    >
      <img
        src={src}
        width={100}
        height={60}
        alt={title}
        className="shrink-0 rounded-lg shadow-xs object-cover group-hover:scale-105 transition-transform duration-300 w-24 h-16 border border-slate-200"
      />
      <div>
        <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
          {title}
        </h4>
        <p className="text-slate-600 text-xs max-w-[13rem] leading-snug mt-0.5 font-normal">
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
      className="text-slate-700 hover:text-blue-600 hover:bg-slate-100 px-3 py-2 rounded-lg transition-colors font-medium text-xs block cursor-pointer text-left"
      style={{ backgroundColor: '#ffffff' }}
    >
      {children}
    </a>
  );
};

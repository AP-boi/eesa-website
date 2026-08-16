"use client";
import React from "react";
import { motion } from "framer-motion";

const transition = {
  type: "spring" as const,
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <motion.p
        transition={{ duration: 0.2 }}
        className="cursor-pointer text-slate-800 dark:text-slate-200 font-semibold text-xs hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap"
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1rem)] left-1/2 transform -translate-x-1/2 pt-2 z-50">
              <motion.div
                transition={transition}
                layoutId="active"
                className="bg-white dark:bg-slate-900 backdrop-blur-md rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl"
              >
                <motion.div
                  layout
                  className="w-max h-full p-4"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative rounded-full border border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 shadow-xs flex justify-center items-center space-x-4 sm:space-x-5 px-5 py-2.5"
    >
      {children}
    </nav>
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
  return (
    <a
      href={href}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      className="flex space-x-3 group"
    >
      <img
        src={src}
        width={100}
        height={60}
        alt={title}
        className="shrink-0 rounded-lg shadow-sm object-cover group-hover:scale-105 transition-transform duration-300 w-24 h-16"
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
  return (
    <a
      {...rest}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium text-xs block py-1"
    >
      {children}
    </a>
  );
};

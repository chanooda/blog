import { ComponentProps } from "react";

interface HrProps {
  className?: string;
}

export const Hr = ({ className }: HrProps) => {
  return <div className={`h-[1px] w-full dark:bg-gray-500 bg-gray-300 ${className}`} />;
};

interface BadgeProps {
  label: string;
  iconColor?: string;
  color: string;
}
export const Badge = ({ label, iconColor = "ffffff", color }: BadgeProps) => {
  return (
    <img
      className="h-[20px]"
      src={`https://img.shields.io/badge/${label}-${color}?style=flat&logo=${label}&logoColor=${iconColor}`}
      alt={label}
    />
  );
};

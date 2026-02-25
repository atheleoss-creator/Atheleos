import React from "react";
import { BadgeIcon } from "./Icons";

type BadgeLevel = "state" | "national" | "international";

interface BadgeProps {
    level: string;
    className?: string;
    showTooltip?: boolean;
}

export default function Badge({ level, className = "", showTooltip = false }: BadgeProps) {
    const getBadgeColor = (level: string) => {
        switch (level?.toLowerCase()) {
            case "struggler": return "#3B82F6"; // Blue
            case "state": return "#9CA3AF"; // Grey
            case "national": return "#FCD34D"; // Gold
            case "international": return "#000000"; // Black
            default: return "#3B82F6"; // Blue default
        }
    };

    const color = getBadgeColor(level);
    const tickColor = level?.toLowerCase() === "international" ? "white" : "black";
    const title = level ? `${level.charAt(0).toUpperCase() + level.slice(1)} Athlete` : "Verified Athlete";

    return (
        <div className={`relative flex items-center justify-center ${className}`} title={showTooltip ? title : undefined}>
            <BadgeIcon className="w-full h-full" color={color} tickColor={tickColor} />
        </div>
    );
}

import { useEffect, useState } from "react";
import {
  mergeAnimationDuration,
} from "@/constants";
import { Tile as TileProps } from "@/schema/tile";
import styles from "@/styles/tile.module.css";
import usePreviousProps from "@/hooks/use-previous-props";

export default function Tile({ position, value }: TileProps) {
  const [scale, setScale] = useState(1);
  const previousValue = usePreviousProps<number>(value);
  const hasChanged = previousValue !== value;

  useEffect(() => {
    if (hasChanged) {
      setScale(1.1);
      const timer = setTimeout(() => setScale(1), mergeAnimationDuration);
      return () => clearTimeout(timer);
    }
  }, [hasChanged]);

  // Use simple percentage-based positioning that matches CSS Grid exactly
  const style = {
    left: `${position[0] * 25}%`,
    top: `${position[1] * 25}%`,
    width: '25%',
    height: '25%',
    transform: `scale(${scale})`,
    zIndex: value,
  };

  return (
    <div 
      className={`${styles.tile} ${styles[`tile-${value}`]}`} 
      style={style}
    >
      {value}
    </div>
  );
}
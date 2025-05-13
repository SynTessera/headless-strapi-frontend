"use client";

import { easeIn, useScroll, useTransform } from "framer-motion";
import { PropsWithChildren, useContext } from "react";
import { sectionCtx } from "@/components/AnimatedSection";
import { useParallax } from "@/lib/hooks";
import { MotionDiv } from "./client/Motion";
// import { IconButton } from "../Button";
// import { useNavigate } from "react-router";

export type ParallaxProps = PropsWithChildren<{
  distance: number;
  offset?: number;
  range?: [number, number];
  className?: string;
  trans?: number[];
  style?: Record<string, string>;
}>;
export const Parallax = ({
  children,
  distance,
  className,
  offset = 0,
  range = [1, 0],
  trans = [1, 0],
  style = {},
}: ParallaxProps) => {
  const { ref } = useContext(sectionCtx);
  const { scrollYProgress } = useScroll({
    layoutEffect: false,
    target: ref || undefined,
    offset: ["start start", "end end"],
  });
  const t = useTransform(scrollYProgress, trans, range);
  const y = useParallax(t, distance, offset, easeIn, range);

  return (
    <MotionDiv className={className} style={{ y, ...style }}>
      {children}
    </MotionDiv>
  );
};

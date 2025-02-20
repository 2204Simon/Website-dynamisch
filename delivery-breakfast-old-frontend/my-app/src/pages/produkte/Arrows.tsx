import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { ArrowCircleLeft, ArrowCircleRight } from "phosphor-react";
import { colors } from "../general/constants";

interface ScrollContainerProps {
  children: React.ReactNode;
  scrollAmount: number;
  className?: string;
}

const ScrollContainer: React.FC<ScrollContainerProps> = ({
  children,
  scrollAmount,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollLeftVisible, setScrollLeftVisible] = useState(false);
  const [scrollRightVisible, setScrollRightVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const checkScroll = () => {
    if (!isScrolling && containerRef.current) {
      setScrollLeftVisible(containerRef.current.scrollLeft > 0);
      setScrollRightVisible(
        containerRef.current.scrollLeft <
          containerRef.current.scrollWidth - containerRef.current.clientWidth
      );
    }
  };
  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollLeft - scrollAmount,
        behavior: "smooth",
      });
      setScrollLeftVisible(containerRef.current.scrollLeft - scrollAmount > 0);
      setScrollRightVisible(true);
      setIsScrolling(true); // Setze isScrolling auf true
      setTimeout(() => {
        setIsScrolling(false); // Setze isScrolling auf false nach einer bestimmten Zeit
      }, 500);
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollLeft + scrollAmount,
        behavior: "smooth",
      });
      setScrollLeftVisible(true);
      setScrollRightVisible(
        containerRef.current.scrollLeft + scrollAmount <
          containerRef.current.scrollWidth - containerRef.current.clientWidth
      );
      setIsScrolling(true); // Setze isScrolling auf true
      setTimeout(() => {
        setIsScrolling(false); // Setze isScrolling auf false nach einer bestimmten Zeit
      }, 500);
    }
  };

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const handleMouseMove = () => {
      checkScroll();
      clearTimeout(timer);
      timer = setTimeout(() => {
        setScrollLeftVisible(false);
        setScrollRightVisible(false);
      }, 3000);
    };

    if (containerRef.current) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      clearTimeout(timer);
      if (containerRef.current) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [scrollLeftVisible, scrollRightVisible]);

  const ArrowContainer = styled.div({
    position: "absolute",
    width: "100%",
    height: "50px",
    marginTop: "250px",
    padding: "10px",
    display: "flex",
    justifyContent: "space-between",
    zIndex: 1,
  });

  return (
    <div style={{ margin: 0, padding: 0 }}>
      <ArrowContainer>
        <ArrowCircleLeft
          style={{
            zIndex: "2",
            backgroundColor: colors.black,
            color: colors.companycolor,
            borderRadius: "50px",
            visibility: scrollLeftVisible ? "visible" : "hidden",
          }}
          size={50}
          onClick={scrollLeft}
          cursor={"pointer"}
        />
        <ArrowCircleRight
          style={{
            zIndex: "2",
            backgroundColor: colors.black,
            color: colors.companycolor,
            borderRadius: "50px",
            visibility: scrollRightVisible ? "visible" : "hidden",
            marginRight: "15px",
          }}
          size={50}
          onClick={scrollRight}
          cursor={"pointer"}
        />
      </ArrowContainer>
      <div
        style={{
          display: "flex",
          flexWrap: "nowrap",
          overflowX: "hidden",
          marginTop: 0,
          paddingTop: 0,
        }}
        ref={containerRef}
      >
        {children}
      </div>
    </div>
  );
};

export default ScrollContainer;

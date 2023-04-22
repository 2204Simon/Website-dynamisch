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
  const [scrollRightVisible, setScrollRightVisible] = useState(true);

  const checkScroll = () => {
    if (containerRef.current) {
      setScrollLeftVisible(containerRef.current.scrollLeft > 0);
      setScrollRightVisible(
        containerRef.current.scrollLeft <
          containerRef.current.scrollWidth - containerRef.current.clientWidth
      );
    }
  };

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= scrollAmount;
      checkScroll();
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += scrollAmount;
      checkScroll();
    }
  };

  useEffect(() => {
    checkScroll();
  }, [scrollLeftVisible, scrollRightVisible]);

  const ArrowContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    margin-top: 250px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    z-index: 0;
  `;

  return (
    <div style={{ margin: 0, padding: 0 }}>
      <ArrowContainer>
        <ArrowCircleLeft
          style={{
            zIndex: "2",
            backgroundColor: colors.companycolor,
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
            backgroundColor: colors.companycolor,
            borderRadius: "50px",
            visibility: scrollRightVisible ? "visible" : "hidden",
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

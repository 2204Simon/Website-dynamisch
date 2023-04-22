import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { ArrowRight, ArrowLeft } from "phosphor-react";

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
  }, []);

  const ArrowContainer = styled.div`
    position: relative;
    top: 300px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
  `;

  const ArrowLeft = styled.div<{ visible: boolean }>`
    cursor: pointer;
    z-index: 1;
    background-color: #ccc;
    padding: 5px;
    border-radius: 50%;
    visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
  `;

  const ArrowRight = styled.div<{ visible: boolean }>`
    cursor: pointer;
    z-index: 1;
    background-color: #ccc;
    padding: 5px;
    border-radius: 50%;
    visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
  `;

  return (
    <div className={className}>
      <ArrowContainer>
        <ArrowLeft visible={scrollLeftVisible} onClick={scrollLeft}>
          {"<"}
        </ArrowLeft>
        <ArrowRight visible={scrollRightVisible} onClick={scrollRight}>
          {">"}
        </ArrowRight>
      </ArrowContainer>
      <div
        style={{ display: "flex", flexWrap: "nowrap", overflowX: "hidden" }}
        ref={containerRef}
      >
        {children}
      </div>
    </div>
  );
};

export default ScrollContainer;

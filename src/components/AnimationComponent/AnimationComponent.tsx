import { keyframes } from "@emotion/react";
import { styled } from "@mui/system";
import { useEffect, useRef, useState, type ReactNode, memo } from "react";

interface AnimationComponentProps {
  children: ReactNode;
  moveDirection: "left" | "right";
}

const moveFromLeftToRight = keyframes`
  0% { transform: translateX(-20vw); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
`;

const moveFromRightToLeft = keyframes`
  0% { transform: translateX(20vw); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
`;

const StyledAnimationComponent = styled("div")<{
  startAnimation: boolean;
  moveDirection: "left" | "right";
}>(({ startAnimation, moveDirection }) => ({
  animation:
    startAnimation
      ? `${moveDirection === "right" ? moveFromLeftToRight : moveFromRightToLeft
        } 1s ease-out`
      : "none",
  willChange: "transform, opacity",
}));

const AnimationComponentBase: React.FC<AnimationComponentProps> = ({
  children,
  moveDirection,
}) => {
  const componentRef = useRef<HTMLDivElement | null>(null);
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setStartAnimation(true);
          observer.disconnect();
        }
      });
    });

    if (componentRef.current) observer.observe(componentRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <StyledAnimationComponent
      ref={componentRef}
      startAnimation={startAnimation}
      moveDirection={moveDirection}
    >
      {children}
    </StyledAnimationComponent>
  );
};

// 👇 impede re-renderização desnecessária
const AnimationComponent = memo(AnimationComponentBase);
export default AnimationComponent;

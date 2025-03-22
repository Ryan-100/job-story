import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export const DesktopView = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted && isDesktop ? children : null;
};

export const TabletView = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const isTablet = useMediaQuery({ minWidth: 768 });

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted && isTablet ? children : null;
};

export const MobileView = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted && isMobile ? children : null;
};

// src/App.jsx
import { Transition } from "@headlessui/react";
import React from "react";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { usePageContext } from "./hooks/usePageContext";

export default function App({ children }) {
  const { urlPathname } = usePageContext();

  // State for page transitions
  const [isShowing, setIsShowing] = React.useState(false);

  React.useEffect(() => {
    setIsShowing(true);
    return () => setIsShowing(false);
  }, [urlPathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Transition
          show={isShowing}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {children}
        </Transition>
      </main>
      <Footer />
    </div>
  );
}

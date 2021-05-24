import React, { useEffect, useState } from "react";
import "./Sidebar.scss";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    // Example of how to send a message to eventPage.ts.
    chrome.runtime.sendMessage({ sidebarMounted: true });
  }, []);

  return <div className="Sidebar">Hello, world!</div>;
}

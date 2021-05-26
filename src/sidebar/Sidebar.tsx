import React, { useEffect, useState } from "react";
import * as utils from "../utils/utils";
import * as prefill from "../prefill";
import "./Sidebar.scss";

async function advancePage() {
  await prefill.fillTask();
  prefill.advancePage();
}

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  useEffect(() => {
    // Example of how to send a message to eventPage.ts.
    chrome.runtime.sendMessage({ sidebarMounted: true });
  }, []);

  return (
    <aside className={utils.classnames("Sidebar", isOpen && "Sidebar-isOpen")}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="Sidebar-toggleOpenButton"
      >
        {isOpen ? "▶" : "◀"}
      </button>
      <h1>Blend Application Tools</h1>
      <button onClick={advancePage}>Next page</button>
    </aside>
  );
}

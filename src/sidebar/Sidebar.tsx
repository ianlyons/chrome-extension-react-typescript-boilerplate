import React, { useState } from "react";
import { useChromeStorageLocal } from "use-chrome-storage";
import * as utils from "../utils/utils";
import * as prefill from "../applicationFlow";
import "./Sidebar.scss";

async function advancePage() {
  await prefill.fillTaskAndAdvancePage();
}

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useChromeStorageLocal("username", "");
  const [isDebugMode, setIsDebugMode] = useChromeStorageLocal(
    "isDebugMode",
    false
  );

  // heuristic for being on a task-related page in the borrower app
  const isValidScenario = location.href.indexOf("/section/") > -1;
  if (!isValidScenario) return null;

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
      <div className="Sidebar-inputWrapper">
        <label htmlFor="appToolsUsername">Your Blend username</label>
        <input
          id="appToolsUsername"
          type="text"
          placeholder="nima"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="Sidebar-inputWrapper">
        <label htmlFor="appToolsDebugMode">Debug mode?</label>
        <input
          id="appToolsDebugMode"
          type="checkbox"
          checked={isDebugMode}
          onChange={(e) => setIsDebugMode(e.target.checked)}
        />
      </div>
      <div className="Sidebar-inputWrapper">
        <button onClick={advancePage}>Next page</button>
      </div>
    </aside>
  );
}

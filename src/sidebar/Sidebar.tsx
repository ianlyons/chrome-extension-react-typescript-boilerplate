import React, { useState } from "react";
import { useChromeStorageLocal } from "use-chrome-storage";
import * as utils from "../utils/utils";
import * as applicationFlow from "../applicationFlow";
import * as accountCreation from "../account";
import "./Sidebar.scss";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useChromeStorageLocal("username", "");
  const [isDebugMode, setIsDebugMode] = useChromeStorageLocal(
    "isDebugMode",
    false
  );

  async function advancePage() {
    await applicationFlow.fillTaskAndAdvancePage({ isDebugMode });
  }

  return (
    <aside className={utils.classnames("Sidebar", isOpen && "Sidebar-isOpen")}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="Sidebar-toggleOpenButton"
      >
        {isOpen ? "▶" : "◀"}
      </button>
      <h1 className="Sidebar-title">Blend Application Tools</h1>
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
      <div className="Sidebar-inputWrapper">
        <button onClick={accountCreation.createAccount}>Create account</button>
      </div>
    </aside>
  );
}

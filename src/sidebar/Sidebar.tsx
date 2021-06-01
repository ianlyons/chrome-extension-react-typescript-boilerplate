import React, { useEffect, useState } from "react";
import * as utils from "../utils/utils";
import * as prefill from "../prefill";
// import * as prefillUtils from "../prefill/prefillUtils";
import "./Sidebar.scss";

async function advancePage() {
  prefill.fillTaskAndAdvancePage();
}

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

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
      <button onClick={advancePage}>Next page</button>
    </aside>
  );
}

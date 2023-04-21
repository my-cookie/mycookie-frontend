import React, { useState } from "react";

function MsgTabs({ tabs }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const onSelectedIndex = (index) => {
    setActiveIndex(index);
  };

  const titles = tabs.map((tab, i) => {
    return (
      <li
        className={`tab${i === activeIndex ? " active" : ""}`}
        key={i}
        onClick={() => onSelectedIndex(i)}
      >
        {tab.title}
      </li>
    );
  });

  const contents = tabs
    .filter((tab, i) => i === activeIndex)
    .map((tab, i) => {
      return (
        <div className="tab-content" key={i}>
          {tab.content}
        </div>
      );
    });

  return (
    <div>
      <div className="tabs">
        <ul className="tab-group">{titles}</ul>
        <div className="tab-content-group">{contents}</div>
      </div>
    </div>
  );
}

export default MsgTabs;

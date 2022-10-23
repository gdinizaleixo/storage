import React, { useState } from "react";

const Sandwich = () => {
  const [name, setName] = useState<string>("menu");
  const [SandwichIcon, setSandwichIcon] = useState<string>("/icons/open-menu.svg");

  function Menu() {
    let list: HTMLUListElement | null = document.querySelector("ul");
    name === "menu"
      ? (setName("close"),
        setSandwichIcon("/icons/close-menu.svg"),
        list?.classList.add("top-[40px]"),
        list?.classList.add("opacity-100"))
      : (setName("menu"),
        setSandwichIcon("/icons/open-menu.svg"),
        list?.classList.remove("top-[40px]"),
        list?.classList.remove("opacity-100"));
  }

  return (
    <div onClick={Menu} className="text-3x1 cursor-pointer mx-2 md:hidden block  h-5 w-5">
      <img className="menu " src={SandwichIcon} alt="" />
    </div>
  );
};

export default Sandwich;

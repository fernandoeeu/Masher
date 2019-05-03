import React from "react";

import Sidebar from "../sidebar/Sidebar";

const Wrapper = () => {
  return (
    <div className="flex-div">
      <div className="item-1">
        <Sidebar />
      </div>
      <div className="item-2" />
    </div>
  );
};

export default Wrapper;

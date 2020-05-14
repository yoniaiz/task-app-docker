import React from "react";

import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

export default ({ children, onClick, btnClassName, tipClassName, tip }) => {
  return (
    <Tooltip title={tip} placement="top" className={tipClassName}>
      <IconButton onClick={onClick} className={btnClassName} color="primary">
        {children}
      </IconButton>
    </Tooltip>
  );
};

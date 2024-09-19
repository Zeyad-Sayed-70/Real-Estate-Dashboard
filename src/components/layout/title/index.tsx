import React from "react";
import { useRouterContext, TitleProps } from "@pankod/refine-core";
import { Button } from "@pankod/refine-mui";

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
  const { Link } = useRouterContext();

  return (
    <Button fullWidth variant="text" disableRipple>
      <Link to="/">
        {collapsed ? (
          <img src="/logo.png" alt="Yariga" width="38px" />
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <img
              src="/logo.png"
              alt="Real-Estate Dashboard Logo"
              width="40px"
            />
            <h1
              style={{ fontSize: "18px", fontWeight: "bold", color: "#11142D" }}
            >
              Blue-Estate
            </h1>
          </div>
        )}
      </Link>
    </Button>
  );
};

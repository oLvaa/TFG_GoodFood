import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useRouter } from "next/router";
import { CircularProgress } from "@mui/material";
import Drawer from "./Drawer";

const Dashboard = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const { auth } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth) {
      if (!auth.admin) {
        router.push("/");
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } else {
        setLoading(false);
      }
    } else {
      router.push("/");
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, []);

  const handleDrawerState = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawerWidth = "pl-[15rem]";
  return (
    <div>
      {loading ? (
        <div className="flex w-screen h-screen justify-center items-center">
          <CircularProgress color="success" />
        </div>
      ) : (
        <div className="relative">
          <div className="shadow-2xl">
            <Drawer handleDrawerState={handleDrawerState} />
          </div>

          <div
            className={`bg-fondoBlanco w-screen min-h-screen absolute top-0 left-0 ${
              drawerOpen ? drawerWidth : "pl-[4rem]"
            }`}
          >
            <div className="p-12">{children}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

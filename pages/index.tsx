import type { NextPage } from "next";
import Layout from "../app/components/layout/Layout";
import Home from "../app/modules/home/Home";
import { atom, useAtom } from "jotai";
import Dashboard from "../app/modules/dashboard/Dashboard";
import { AnimatePresence } from "framer-motion";
import { authAtom } from "./_app";

const HomePage: NextPage = () => {
  const [authenticationStatus, setAuthenticationStatus] = useAtom(authAtom);

  return (
    <Layout>
      <AnimatePresence mode="wait">
        {authenticationStatus === "authenticated" && (
          <Dashboard key="Dashboard" />
        )}
        {authenticationStatus === "unauthenticated" && <Home key="Home" />}
      </AnimatePresence>
    </Layout>
  );
};

export default HomePage;

import type { NextPage } from "next";
import Layout from "../app/components/layout/Layout";
import Home from "../app/modules/home/Home";
import { atom, useAtom } from "jotai";
import Dashboard from "../app/modules/dashboard/Dashboard";
import { AnimatePresence } from "framer-motion";

export const isAuthenticatedAtom = atom(false);

const HomePage: NextPage = () => {
  const [isAutenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);

  return (
    <Layout>
      <AnimatePresence mode="wait">
        {isAutenticated ? <Dashboard key="Dashboard" /> : <Home key="Home" />}
      </AnimatePresence>
    </Layout>
  );
};

export default HomePage;

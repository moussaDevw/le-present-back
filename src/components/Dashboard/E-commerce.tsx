"use client";
import dynamic from "next/dynamic";
import React from "react";
import ChartOne from "../Charts/ChartOne";
import ChartTwo from "../Charts/ChartTwo";
import ChatCard from "../Chat/ChatCard";
import TableOne from "../Tables/TableOne";
import CardDataStats from "../CardDataStats";
import { Car, ShoppingBasketIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

const MapOne = dynamic(() => import("@/components/Maps/MapOne"), {
  ssr: false,
});

const ChartThree = dynamic(() => import("@/components/Charts/ChartThree"), {
  ssr: false,
});

const ECommerce: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats
          className="bg-gradient-to-l from-[#305FEC] to-[#6BAAFC]"
          title="Commandes livrées"
          total="68"
          icon={<Car className="size-10 -rotate-45 opacity-50" />}
        ></CardDataStats>
        <CardDataStats
          className="bg-gradient-to-l from-[#D35385] to-[#EF5E7A]"
          title="Commandes en attente"
          total="90"
          icon={
            <ShoppingBasketIcon className="size-10 -rotate-45 opacity-50" />
          }
        ></CardDataStats>
        <CardDataStats
          className="bg-gradient-to-l from-[#A530F2] to-[#D623FE]"
          title="Nouvelles commandes"
          total="90"
          icon={<Car className="size-10 -rotate-45 opacity-50" />}
        />
        <CardDataStats
          className="bg-gradient-to-l from-[#2A4178] to-[#000]"
          title="Nouvelles commandes"
          total="90"
          icon={<Car className="size-10 -rotate-45 opacity-50" />}
        />
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div>
    </>
  );
};

export default ECommerce;

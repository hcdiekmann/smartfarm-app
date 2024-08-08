import React from 'react';
import { CreateFarmForm } from "@/pages/root/home/CreateFarmForm";
import { FarmIcon } from "@/components/ui/icons";
import { ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import Greeting from "@/pages/root/home/Greeting";
import { useFarm } from '@/provider/FarmProvider';
import { RoleBadge } from '@/components/people/RoleBadge';

const HomePage: React.FC = () => {
  const { farms, isLoading, getUserRole } = useFarm();

  return (
    <>
      <Greeting />
      <h2 className="text-muted-foreground uppercase tracking-wide text-sm">
        Farms
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {isLoading ? (
          [1, 2, 3].map((index) => (
            <Card key={index} className="shadow-sm bg-muted/40">
              <CardHeader className="flex items-center">
                <Skeleton className="h-6 w-6 mr-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          ))
        ) : farms && farms.length > 0 ? (
          farms.map((farm) => (
            <Link to={`/farm/${farm.short_reference}`} key={farm.short_reference} className="block">
              <Card className="shadow-sm bg-muted/40 hover:shadow-custom-md transition-shadow duration-300">
                <CardHeader className="flex-row items-center">
                  <FarmIcon className="h-6 w-6 mr-2 text-sfagreen dark:text-current" />
                  <CardTitle className="text-lg">{farm.name}</CardTitle>
                  <ChevronRight className="h-5 w-5 ml-auto" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <RoleBadge role={getUserRole(farm.id)} />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm col-span-full">
            <div className="flex flex-col items-center gap-1 text-center p-6">
              <FarmIcon className="w-24 h-24" />
              <h3 className="text-2xl font-bold tracking-tight">
                You have no farms
              </h3>
              <CreateFarmForm />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
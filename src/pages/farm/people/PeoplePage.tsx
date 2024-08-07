import { useFarm } from "@/provider/FarmProvider";
import { useFetchPeople } from "@/hooks/farm/usePeople";
import React from "react";
import { Button } from "@/components/ui/button";
import { IconUserPlus } from '@tabler/icons-react';
import { columns } from "./data-table/columns";
import { DataTable } from "./data-table/data-table";

const PeoplePage: React.FC = () => {
  const { currentFarm } = useFarm();
  const { data: people } = useFetchPeople(currentFarm?.id);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">People</h1>
        <Button >
          <IconUserPlus stroke={2} className="mr-2 h-4 w-4" /> 
          Add Person
        </Button>
      </div>
      

      <DataTable columns={columns} data={people || []} />
      
    </div>
  );
};

export default PeoplePage;

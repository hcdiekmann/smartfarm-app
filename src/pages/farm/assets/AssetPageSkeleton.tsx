import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { CirclePlus } from 'lucide-react';

const AssetsPageSkeleton: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">Assets</h1>
        <Button disabled>
          <CirclePlus className="mr-2 h-4 w-4" /> Add Asset
        </Button>
      </div>

      <div className="space-y-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
};

export default AssetsPageSkeleton;
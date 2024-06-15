import { IconLoader2 } from "@tabler/icons-react";

// TODO: Add a skeleton of the dashboard 
const Skeleton = () => {
  return (
    <div className="flex flex-col justify-center items-center space-y-3 bg-gradient-custom min-h-screen">
      <IconLoader2 className="w-12 h-12 text-white animate-spin" />
    </div>
  );
};

export default Skeleton;
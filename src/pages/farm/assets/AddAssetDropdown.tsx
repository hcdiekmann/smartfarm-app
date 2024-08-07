import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CirclePlus, ChevronDown } from "lucide-react";
import { assets } from "./asset-types";
import { useLocation, useNavigate } from "react-router-dom";

export default function AddAssetDropdown() {
    const location = useLocation();
    const navigate = useNavigate();

    const handleAddAssetClick = (assetType: string) => {
        navigate(`${location.pathname}/${assetType}/add`);
      };

    return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>
              <CirclePlus className="mr-2 h-4 w-4" />
              Add Asset
              <ChevronDown className="ml-1 h-3.5 w-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuGroup>
              {assets.map((asset) => (
                <DropdownMenuItem key={asset.value} onSelect={() => handleAddAssetClick(asset.value)}>
                  <asset.icon className="mr-2 h-5 w-5" />
                  <span className='font-medium
                  '>{asset.label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
    );
    }

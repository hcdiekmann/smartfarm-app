import { 
    Wrench,
    Tractor,
    LandPlot, 
    PawPrint, 
    Sprout, 
    Building, 
    Droplet, 
    Package, 
    Fence,
    BrickWall,
    Group 
  } from 'lucide-react';

export const assets = [
    {
        value: "land",
        label: "Land",
        icon: LandPlot
    },
    {
        value: "field",
        label: "Field",
        icon: Fence
    },
    {
        value: "animal",
        label: "Animal",
        icon: PawPrint
    },
    {
        value: "plant",
        label: "Plant",
        icon: Sprout
    },
    {
        value: "water",
        label: "Water",
        icon: Droplet
    },
    {
        value: "vehicle",
        label: "Vehicle",
        icon: Tractor
    },
    {
        value: "equipment",
        label: "Equipment",
        icon: Wrench
    },
    {
        value: "structure",
        label: "Structure",
        icon: Building
    },
    {
        value: "material",
        label: "Material",
        icon: BrickWall
    },
    {
        value: "product",
        label: "Product",
        icon: Package
    },
    {
        value: "group",
        label: "Group",
        icon: Group
    }
];
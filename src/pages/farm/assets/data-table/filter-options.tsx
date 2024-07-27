import { 
    Wrench,
    LandPlot, 
    PawPrint, 
    Leaf, 
    Building, 
    Droplet, 
    Package, 
    Fence,
    Group 
  } from 'lucide-react';

export const assets = [
    {
        value: "land",
        label: "Land",
        icon: LandPlot
    },
    {
        value: "animal",
        label: "Animal",
        icon: PawPrint
    },
    {
        value: "plant",
        label: "Plant",
        icon: Leaf
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
        value: "water",
        label: "Water",
        icon: Droplet
    },
    {
        value: "material",
        label: "Material",
        icon: Fence
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
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { useMediaQuery } from '@/hooks/ui/useMediaQuery';

export function ResponsiveDialog({
  children,
  isOpen,
  setIsOpen,
  title,
  description,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  description?: string;
}) {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const DialogComponent = isDesktop ? Dialog : Drawer;
  const ContentComponent = isDesktop ? DialogContent : DrawerContent;
  const HeaderComponent = isDesktop ? DialogHeader : DrawerHeader;
  const TitleComponent = isDesktop ? DialogTitle : DrawerTitle;

  return (
    <DialogComponent open={isOpen} onOpenChange={setIsOpen}>
      <ContentComponent className={isDesktop ? "sm:max-w-[600px]" : ""}>
        <HeaderComponent className={isDesktop ? "" : "text-left"}>
          <TitleComponent>{title}</TitleComponent>
          {description && <DialogDescription>{description}</DialogDescription>}
        </HeaderComponent>
        {children}
        {!isDesktop && (
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        )}
      </ContentComponent>
    </DialogComponent>
  );
}
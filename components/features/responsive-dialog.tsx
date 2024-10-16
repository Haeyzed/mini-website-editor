import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"

import { useMediaQuery } from "@/hooks/use-media-query"

interface ResponsiveDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    desktopContent: React.ReactNode;
    mobileContent: React.ReactNode;
}

const ResponsiveDialog: React.FC<ResponsiveDialogProps> = ({
                                                               open,
                                                               onOpenChange,
                                                               title,
                                                               desktopContent,
                                                               mobileContent
                                                           }) => {
    const isDesktop = useMediaQuery("(min-width: 768px)")

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className='bg-card w-[659px]'>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                    </DialogHeader>
                    {desktopContent}
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>{title}</DrawerTitle>
                </DrawerHeader>
                <div className="px-4 py-4">
                    {mobileContent}
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default ResponsiveDialog
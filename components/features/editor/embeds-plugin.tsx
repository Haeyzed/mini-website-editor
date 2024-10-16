import React from 'react'
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ImageIcon, Video, Link as LinkIcon, Plus, LucideIcon } from 'lucide-react'

interface EmbedOption {
    icon: LucideIcon;
    title: string;
    description: string;
    onClick: () => void;
}

interface EmbedsPluginProps {
    setImageDialogOpen: (open: boolean) => void;
    setVideoDialogOpen: (open: boolean) => void;
    setSocialDialogOpen: (open: boolean) => void;
}

export default function Component({ setImageDialogOpen, setVideoDialogOpen, setSocialDialogOpen }: EmbedsPluginProps = {
    setImageDialogOpen: () => {},
    setVideoDialogOpen: () => {},
    setSocialDialogOpen: () => {}
}) {
    const embedOptions: EmbedOption[] = [
        {
            icon: ImageIcon,
            title: "Picture",
            description: "Jpeg, png",
            onClick: () => setImageDialogOpen(true)
        },
        {
            icon: Video,
            title: "Video",
            description: "JW player, Youtube, Vimeo",
            onClick: () => setVideoDialogOpen(true)
        },
        {
            icon: LinkIcon,
            title: "Social",
            description: "Instagram, Twitter, TikTok, Snapchat, Facebook",
            onClick: () => setSocialDialogOpen(true)
        }
    ];

    return (
        <div className="embeds">
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full bg-[#f0f9f6] border-0 hover:bg-[#d0e6dd] transition-colors duration-200 w-10 h-10"
                    >
                        <Plus className="h-5 w-5 text-[#3a3a3a]" />
                        <span className="sr-only">Add embed</span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-277 h-164 p-0 bg-white shadow-lg rounded-lg">
                    <div className="p-4 h-full flex flex-col">
                        <h3 className="text-sm mb-2 text-[#3a3a3a]">EMBEDS</h3>
                        <div className="space-y-2 flex-grow">
                            {embedOptions.map((option) => (
                                <React.Fragment key={option.title}>
                                    <button
                                        className="w-full text-left focus:outline-none group py-1 px-2 rounded-md hover:bg-[#F7FCF8]"
                                        onClick={option.onClick}
                                    >
                                        <div className="flex items-center mb-1">
                                            <option.icon
                                                className="h-5 w-5 mr-3 text-[#3a3a3a]"
                                            />
                                            <span
                                                className="text-base font-medium text-[#3a3a3a]"
                                            >
                                                {option.title}
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-500 ml-8">{option.description}</div>
                                    </button>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}
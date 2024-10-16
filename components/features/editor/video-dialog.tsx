import React, { useState } from 'react'
import { Editor } from '@tiptap/react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface VideoDialogProps {
    editor: Editor | null;
    setOpen: (open: boolean) => void;
}

const VideoDialog: React.FC<VideoDialogProps> = ({ editor, setOpen }) => {
    const [url, setUrl] = useState('')
    const [videoProvider, setVideoProvider] = useState('Youtube')

    const handleEmbed = () => {
        if (editor) {
            if (videoProvider === 'Youtube') {
                editor.chain().focus().setYoutubeVideo({ src: url }).run()
            } else if (videoProvider === 'Vimeo') {
                // Implement Vimeo embedding logic here
                console.log('Embedding Vimeo video:', url)
            } else {
                // Implement logic for other video providers here
                console.log('Embedding video from:', videoProvider, url)
            }
            setOpen(false)
            setUrl('')
        }
    }

    return (
        <>
            <Label htmlFor="video-provider" className="block mb-2">VIDEO PROVIDER</Label>
            <Select value={videoProvider} onValueChange={setVideoProvider}>
                <SelectTrigger id="video-provider" className="w-full mb-4">
                    <SelectValue placeholder="Select video provider" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Youtube">Youtube</SelectItem>
                    <SelectItem value="Vimeo">Vimeo</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
            </Select>
            <Label htmlFor="video-url" className="block mb-2">URL</Label>
            <Input
                id="video-url"
                type="text"
                placeholder={`Enter ${videoProvider} video URL`}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="mb-4"
            />
            <div className="flex justify-start space-x-2">
                <Button onClick={handleEmbed}>Embed</Button>
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            </div>
        </>
    )
}

export default VideoDialog
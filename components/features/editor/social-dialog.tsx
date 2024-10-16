import React, { useState } from 'react'
import { Editor } from '@tiptap/react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

interface SocialDialogProps {
    editor: Editor | null;
    setOpen: (open: boolean) => void;
}

const SocialDialog: React.FC<SocialDialogProps> = ({ editor, setOpen }) => {
    const [url, setUrl] = useState('')
    const [platform, setPlatform] = useState('Facebook')
    const [embedCode, setEmbedCode] = useState('')
    const [disableCaption, setDisableCaption] = useState(false)

    const handleEmbed = () => {
        if (editor) {
            let finalEmbedCode = embedCode || `<blockquote class="social-media-embed" data-platform="${platform}">Embedded content from ${url}</blockquote>`
            if (disableCaption) {
                finalEmbedCode = finalEmbedCode.replace(/<figcaption.*?<\/figcaption>/g, '')
            }
            editor.chain().focus().insertContent(finalEmbedCode).run()
            setOpen(false)
            setUrl('')
            setEmbedCode('')
            setPlatform('Facebook')
            setDisableCaption(false)
        }
    }

    return (
        <>
            <Label htmlFor="social-platform" className="block mb-2">SOCIAL MEDIA PLATFORM</Label>
            <Select value={platform} onValueChange={setPlatform}>
                <SelectTrigger id="social-platform" className="w-full mb-4">
                    <SelectValue placeholder="Select social media platform" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Facebook">Facebook</SelectItem>
                    <SelectItem value="Instagram">Instagram</SelectItem>
                    <SelectItem value="Twitter">Twitter</SelectItem>
                    <SelectItem value="TikTok">TikTok</SelectItem>
                    <SelectItem value="Snapchat">Snapchat</SelectItem>
                </SelectContent>
            </Select>
            <Label htmlFor="social-url" className="block mb-2">URL</Label>
            <Input
                id="social-url"
                type="text"
                placeholder={`Enter ${platform} post URL`}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="mb-4"
            />
            <Label htmlFor="embed-code" className="block mb-2">CODE</Label>
            <Input
                id="embed-code"
                type="text"
                placeholder="Enter embed code"
                value={embedCode}
                onChange={(e) => setEmbedCode(e.target.value)}
                className="mb-4"
            />
            <div className="flex items-center justify-between mb-4">
                <Label htmlFor="disable-caption" className="mr-2">DISABLE CAPTION</Label>
                <Switch
                    id="disable-caption"
                    checked={disableCaption}
                    onCheckedChange={setDisableCaption}
                />
            </div>
            <div className="flex justify-start space-x-2">
                <Button onClick={handleEmbed}>Embed</Button>
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            </div>
        </>
    )
}

export default SocialDialog
'use client'

import React, {useState, useCallback} from 'react'
import {EditorContent, useEditor} from '@tiptap/react'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
import Heading from '@tiptap/extension-heading'
import Blockquote from '@tiptap/extension-blockquote'
import Placeholder from '@tiptap/extension-placeholder'
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import CharacterCount from '@tiptap/extension-character-count'
import Youtube from '@tiptap/extension-youtube'
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {useToast} from "@/hooks/use-toast"
import Toolbar from './toolbar'
import EmbedsPlugin from './embeds-plugin'
import ImageDialog from './image-dialog'
import VideoDialog from './video-dialog'
import SocialDialog from './social-dialog'
import ResponsiveDialog from '@/components/features/responsive-dialog'

export default function Component({
                                      initialContent = 'Start typing here...',
                                      initialTitle = 'This is the title',
                                      placeholder = 'Enter some text...'
                                  }) {
    const [imageDialogOpen, setImageDialogOpen] = useState(false)
    const [videoDialogOpen, setVideoDialogOpen] = useState(false)
    const [socialDialogOpen, setSocialDialogOpen] = useState(false)
    const [title, setTitle] = useState(initialTitle)
    const {toast} = useToast()

    const editor = useEditor({
        extensions: [
            Document,
            Paragraph,
            Text,
            Bold,
            Italic,
            BulletList,
            OrderedList,
            ListItem,
            Heading.configure({
                levels: [1, 2, 3, 4, 5, 6],
            }),
            Blockquote,
            Placeholder.configure({
                placeholder,
            }),
            Image,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Link.configure({
                openOnClick: false,
            }),
            CharacterCount.configure({
                limit: 10000,
            }),
            Youtube.configure({
                controls: false,
                nocookie: true,
                modestBranding: true,
            }),
        ],
        content: initialContent,
    })

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const handlePost = useCallback(() => {
        if (editor) {
            const content = editor.getHTML()
            console.log('Posted content:', {title, content})
            toast({
                title: "Post successful",
                description: `Title: ${title}\nContent: ${content.substring(0, 100)}...`,
            })
        }
    }, [editor, title, toast])

    const wordCount = editor ? editor.storage.characterCount.words() : 0

    if (!editor) {
        return null
    }

    return (
        <div className="flex justify-center items-start min-h-screen bg-gray-100 py-8">
            <div className="flex flex-col w-[662px]">
                <div className="editor-container bg-background rounded-lg shadow-md">
                    <div className="p-4">
                        <Input
                            value={title}
                            onChange={handleTitleChange}
                            className="text-4xl font-bold mb-4 border-none p-0 focus-visible:ring-0"
                            aria-label="Edit title"
                        />
                        <Toolbar editor={editor}/>
                        <EditorContent editor={editor} className="prose max-w-full mt-4"/>
                        <div className="flex justify-between items-center mt-4">
                            <EmbedsPlugin
                                setImageDialogOpen={setImageDialogOpen}
                                setVideoDialogOpen={setVideoDialogOpen}
                                setSocialDialogOpen={setSocialDialogOpen}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end items-center bg-card rounded-b-lg p-1">
                        <span className="text-sm text-gray-500">{wordCount}/1000 words</span>
                    </div>
                </div>
                <div className="flex justify-end items-center mt-4">
                    <Button onClick={handlePost} className="bg-green-600 hover:bg-green-700 text-white">Post</Button>
                </div>
                <ResponsiveDialog
                    open={imageDialogOpen}
                    onOpenChange={setImageDialogOpen}
                    desktopContent={<ImageDialog editor={editor} setOpen={setImageDialogOpen}/>}
                    mobileContent={<ImageDialog editor={editor} setOpen={setImageDialogOpen}/>}
                    title="Embed"
                />
                <ResponsiveDialog
                    open={videoDialogOpen}
                    onOpenChange={setVideoDialogOpen}
                    desktopContent={<VideoDialog editor={editor} setOpen={setVideoDialogOpen}/>}
                    mobileContent={<VideoDialog editor={editor} setOpen={setVideoDialogOpen}/>}
                    title="Embed"
                />
                <ResponsiveDialog
                    open={socialDialogOpen}
                    onOpenChange={setSocialDialogOpen}
                    desktopContent={<SocialDialog editor={editor} setOpen={setSocialDialogOpen}/>}
                    mobileContent={<SocialDialog editor={editor} setOpen={setSocialDialogOpen}/>}
                    title="Embed"
                />
            </div>
        </div>
    )
}
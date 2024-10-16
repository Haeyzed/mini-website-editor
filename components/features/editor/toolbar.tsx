import React from 'react'
import { Editor } from '@tiptap/react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    AlignCenter,
    AlignLeft,
    AlignRight,
    Bold as BoldIcon,
    Italic as ItalicIcon,
    Link as LinkIcon,
    Image as ImageIcon,
    List,
    ListOrdered,
    Quote,
} from 'lucide-react'

interface ToolbarProps {
    editor: Editor | null;
}

const Toolbar: React.FC<ToolbarProps> = ({ editor }) => {
    if (!editor) {
        return null
    }

    const setLink = () => {
        const previousUrl = editor.getAttributes('link').href
        const url = window.prompt('URL', previousUrl)

        if (url === null) {
            return
        }

        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run()
            return
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    }

    return (
        <div className="toolbar flex items-center gap-0.5 mb-2 bg-white p-1.5 rounded-md border border-gray-200">
            <Select
                onValueChange={(value) => {
                    if (value === 'paragraph') {
                        editor.chain().focus().setParagraph().run()
                    } else {
                        editor.chain().focus().toggleHeading({ level: parseInt(value) as 1 | 2 | 3 | 4 | 5 | 6 }).run()
                    }
                }}
            >
                <SelectTrigger className="w-[130px] h-8 text-sm border-none">
                    <SelectValue placeholder="Paragraph" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="paragraph">Paragraph</SelectItem>
                    <SelectItem value="1">Heading 1</SelectItem>
                    <SelectItem value="2">Heading 2</SelectItem>
                    <SelectItem value="3">Heading 3</SelectItem>
                    <SelectItem value="4">Heading 4</SelectItem>
                    <SelectItem value="5">Heading 5</SelectItem>
                    <SelectItem value="6">Heading 6</SelectItem>
                </SelectContent>
            </Select>
            <div className="h-6 w-px bg-gray-200 mx-1" />
            <Button
                variant="ghost"
                size="icon"
                onClick={setLink}
                className={`h-8 w-8 ${editor.isActive('link') ? 'bg-gray-100' : ''}`}
            >
                <LinkIcon className="h-4 w-4" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                onClick={() => {/* Add image functionality */}}
                className="h-8 w-8"
            >
                <ImageIcon className="h-4 w-4" />
            </Button>
            <div className="h-6 w-px bg-gray-200 mx-1" />
            <Button
                variant="ghost"
                size="icon"
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                className={`h-8 w-8 ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-100' : ''}`}
            >
                <AlignLeft className="h-4 w-4" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                className={`h-8 w-8 ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-100' : ''}`}
            >
                <AlignCenter className="h-4 w-4" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                className={`h-8 w-8 ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-100' : ''}`}
            >
                <AlignRight className="h-4 w-4" />
            </Button>
            <div className="h-6 w-px bg-gray-200 mx-1" />
            <Button
                variant="ghost"
                size="icon"
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={`h-8 w-8 ${editor.isActive('bold') ? 'bg-gray-100' : ''}`}
            >
                <BoldIcon className="h-4 w-4" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={`h-8 w-8 ${editor.isActive('italic') ? 'bg-gray-100' : ''}`}
            >
                <ItalicIcon className="h-4 w-4" />
            </Button>
            <div className="h-6 w-px bg-gray-200 mx-1" />
            <Button
                variant="ghost"
                size="icon"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`h-8 w-8 ${editor.isActive('bulletList') ? 'bg-gray-100' : ''}`}
            >
                <List className="h-4 w-4" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`h-8 w-8 ${editor.isActive('orderedList') ? 'bg-gray-100' : ''}`}
            >
                <ListOrdered className="h-4 w-4" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`h-8 w-8 ${editor.isActive('blockquote') ? 'bg-gray-100' : ''}`}
            >
                <Quote className="h-4 w-4" />
            </Button>
        </div>
    )
}

export default Toolbar
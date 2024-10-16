import React, { useState } from 'react'
import { Editor } from '@tiptap/react'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

interface ImageDialogProps {
    editor: Editor | null;
    setOpen: (open: boolean) => void;
}

const ImageDialog: React.FC<ImageDialogProps> = ({ editor, setOpen }) => {
    const [dragActive, setDragActive] = useState(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true)
        } else if (e.type === 'dragleave') {
            setDragActive(false)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setSelectedFile(e.dataTransfer.files[0])
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0])
        }
    }

    const handleEmbed = () => {
        if (editor && selectedFile) {
            const reader = new FileReader()

            reader.onload = (e) => {
                if (e.target && typeof e.target.result === 'string') {
                    editor.chain().focus().setImage({ src: e.target.result }).run()
                }
            }
            reader.readAsDataURL(selectedFile)
            setOpen(false)
            setSelectedFile(null)
        }
    }

    return (
        <>
            <Label htmlFor="image-upload" className="block mb-2">File Upload</Label>
            <div
                className={`border-2 border-dashed rounded-lg p-8 text-center h-48 flex items-center justify-center ${dragActive ? 'border-primary' : 'border-gray-300'}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    id="image-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleChange}
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                    {selectedFile ? (
                        <p>{selectedFile.name}</p>
                    ) : (
                        <p>Drag and drop an image here, or click to select a file</p>
                    )}
                </label>
            </div>
            <div className="flex justify-start space-x-2 mt-4">
                <Button onClick={handleEmbed} disabled={!selectedFile}>Embed</Button>
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            </div>
        </>
    )
}

export default ImageDialog
import React, { useState } from 'react'
import TagInput from '../../components/Input/TagInput'
import { MdClose } from 'react-icons/md';
import axiosInstance from '../../utils/axiosInstance';

const AddEditNotes = ({ noteData, type, onclose, showToastMessage, onNoteAdded, onNoteUpdated }) => {

    const [title, setTitle] = useState(noteData?.title || "");
    const [content, setContent] = useState(noteData?.content || "");
    const [tags, setTags] = useState(noteData?.tags || []);

    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Add Note (no refetch, optimistic parent update)
    const addNewNote = async () => {
        try {
            setIsSubmitting(true);
            const response = await axiosInstance.post("/add-note", {
                title,
                content,
                tags
            });

            if (response.data && response.data.note) {
                showToastMessage("Note added successfully.");
                onNoteAdded?.(response.data.note);
                onclose();
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    // Edit Note (no refetch, optimistic parent update)
    const editNote = async () => {
        const noteId = noteData._id;
        try {
            setIsSubmitting(true);
            const response = await axiosInstance.put("/edit-note/" + noteId, {
                title,
                content,
                tags
            });

            if (response.data && response.data.note) {
                showToastMessage("Note updated successfully.");
                onNoteUpdated?.(response.data.note);
                onclose();
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            }
        } finally {
            setIsSubmitting(false);
        }
    };


    const handleAddNote = () => {
        if (!title.trim()) {
            setError("Please enter a title.");
            return;
        }

        if (!content.trim()) {
            setError("Please add some content to your note.");
            return;
        }

        setError("");

        if (type === 'edit') {
            editNote();
        } else {
            addNewNote();
        }
    }

    return (
        <div className="relative">

            <button 
                className="absolute -top-2 -right-2 w-9 h-9 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-60 disabled:cursor-not-allowed" 
                onClick={onclose}
                aria-label="Close modal"
                disabled={isSubmitting}
            >
                <MdClose className="text-xl text-gray-600 dark:text-gray-400" />
            </button>

            <div className="space-y-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                        {type === 'edit' ? 'Edit Note' : 'Create New Note'}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Capture your thoughts and ideas</p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="input-label block mb-2">Title</label>
                        <input
                            type="text"
                            className="w-full text-lg font-medium text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                            placeholder="Enter note title..."
                            value={title}
                            onChange={({ target }) => setTitle(target.value)}
                            disabled={isSubmitting}
                        />
                    </div>

                    <div>
                        <label className="input-label block mb-2">Content</label>
                        <textarea
                            className="w-full text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none leading-relaxed disabled:opacity-60 disabled:cursor-not-allowed"
                            placeholder="Write your note content here..."
                            rows={10}
                            value={content}
                            onChange={({ target }) => setContent(target.value)}
                            disabled={isSubmitting}
                        />
                    </div>

                    <div>
                        <label className="input-label block mb-2">Tags</label>
                        <TagInput tags={tags} setTags={setTags} />
                    </div>
                </div>

                {error && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                    </div>
                )}

                <button 
                    className="btn-primary font-semibold inline-flex items-center justify-center gap-2 min-w-[150px] disabled:opacity-70 disabled:cursor-not-allowed" 
                    onClick={handleAddNote}
                    disabled={isSubmitting}
                >
                    {isSubmitting && (
                        <span className="inline-block w-4 h-4 border-2 border-white/70 border-t-transparent rounded-full animate-spin" />
                    )}
                    <span>{type === 'edit' ? 'Update Note' : 'Add Note'}</span>
                </button>
            </div>

        </div>
    )
}

export default AddEditNotes

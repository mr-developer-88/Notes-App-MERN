import React, { useState } from 'react'
import { MdAdd, MdClose } from 'react-icons/md'

const TagInput = ( { tags, setTags} ) => {
    const [ inputValue, setInputValue] = useState("");

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const addNewTag = () => {
        if(inputValue.trim() !== "") {
            setTags([...tags, inputValue.trim()]);
            setInputValue("");
        } 
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            addNewTag();
        }
    }

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove))
    }

  return (
    <div className="space-y-3">

        {tags?.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
                {tags.map((tag, index) => (
                    <span 
                        key={index} 
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary bg-primary/10 dark:bg-primary/20 border border-primary/20 px-3 py-1.5 rounded-lg group"
                    >
                        <span>#{tag}</span>
                        <button 
                            onClick={() => handleRemoveTag(tag)}
                            className="hover:text-red-600 transition-colors"
                            aria-label={`Remove ${tag} tag`}
                        >
                            <MdClose className="w-4 h-4" />
                        </button>
                    </span>
                ))}
            </div>
        )}

        <div className="flex items-center gap-2">
            <input 
                type="text" 
                value={inputValue} 
                className="flex-1 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-2.5 rounded-lg outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary dark:text-gray-100 transition-all" 
                placeholder="Add tags..." 
                onChange={handleInputChange} 
                onKeyDown={handleKeyDown} 
            />

            <button 
                className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-primary hover:bg-blue-600 text-white transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50"
                onClick={() => addNewTag()}
                aria-label="Add tag"
            >
                <MdAdd className="text-xl" />
            </button>
        </div>
    </div>
  )
}

export default TagInput
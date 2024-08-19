import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { cn } from "../../lib/utils";
import IconButton from '../ui/IconButton';

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
    return (
        <input
            type={type}
            className={cn(
                "flex h-16 w-full rounded-full border border-orange-main bg-app-orange px-6 py-2 text-sm text-black shadow-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:text-style-baseText placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            ref={ref}
            {...props}
        />
    );
});
Input.displayName = "Input";

const AddHabitBox = ({ onAdd }) => {
    const [inputValue, setInputValue] = useState("");

    const handleAddClick = () => {
        if (inputValue.trim()) {
            onAdd(inputValue.trim());
            setInputValue("");
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent form submission if inside a form
            handleAddClick();
        }
    };

    return (
        <div className="relative flex items-center mb-4 rounded-full shadow-md">
            <Input
                type="text"
                placeholder="Add New Habit"
                required
                className="pr-12"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <IconButton
                className="rounded-full flex items-center justify-center cursor-pointer absolute right-3 bg-white"
                icon={Search}
                onClick={handleAddClick}
            />
        </div>
    );
};

export default AddHabitBox;

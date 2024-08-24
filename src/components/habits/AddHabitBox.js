import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { cn } from "../../lib/utils";
import IconButton from '../ui/IconButton';

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
    return (
        <input
            type={type}
            className={cn(
                "flex h-16 w-full rounded-full border border-gray-200 bg-app-orange px-6 py-2 text-sm text-black shadow-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:text-style-baseText placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
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
<div className="flex justify-center mb-4">
  <div className="relative flex items-center rounded-full shadow-md w-3/4 max-w-2xl">
    <Input
      type="text"
      placeholder="Add New Habit"
      required
      className="w-full pl-6 pr-12 py-2 rounded-full"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={handleKeyDown}
    />
    <span className="absolute left-3 text-gray-400">
      {/* You can add an icon here if needed */}
    </span>
    <IconButton
      className="absolute right-2 rounded-full flex items-center justify-center cursor-pointer bg-white"
      icon={Search}
      onClick={handleAddClick}
    />
  </div>
</div>
    );
};

export default AddHabitBox;

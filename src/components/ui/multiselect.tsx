import { Command as CommandPrimitive } from "cmdk";
import { X } from "lucide-react";
import * as React from "react";

import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface VintageMultiSelectProps {
  users: string[];
  selectedUsers: string[];
  onSelectionChange: (selectedUsers: string[]) => void;
}

export function VintageMultiSelect({
  users,
  selectedUsers,
  onSelectionChange,
}: VintageMultiSelectProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = React.useCallback(
    (user: string) => {
      onSelectionChange(selectedUsers.filter((s) => s !== user));
    },
    [selectedUsers, onSelectionChange],
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            onSelectionChange(selectedUsers.slice(0, -1));
          }
        }
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    [selectedUsers, onSelectionChange],
  );

  const selectableUsers = users.filter((user) => !selectedUsers.includes(user));

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group rounded-none border-2 border-[#1c3f39] bg-[#f9f6ed] px-3 py-2 text-sm ring-offset-[#f9f6ed] focus-within:ring-2 focus-within:ring-[#1c3f39] focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {selectedUsers.map((user) => {
            return (
              <Badge
                key={user}
                variant="secondary"
                className="border-[#1c3f39] bg-[#e8e0c5] text-[#1c3f39]"
              >
                {user}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-[#f9f6ed] focus:ring-2 focus:ring-[#1c3f39] focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(user);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(user)}
                >
                  <X className="h-3 w-3 text-[#1c3f39] hover:text-[#0a1f1c]" />
                </button>
              </Badge>
            );
          })}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder="Select users..."
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-[#5d5a4c]"
          />
        </div>
      </div>
      <div className="relative mt-2">
        <CommandList>
          {open && selectableUsers.length > 0 ? (
            <div className="absolute top-0 z-10 w-full rounded-none border-2 border-[#1c3f39] bg-[#f9f6ed] text-[#1c3f39] shadow-[4px_4px_0_0_#1c3f39] outline-none animate-in">
              <CommandGroup className="h-full overflow-auto">
                {selectableUsers.map((user) => {
                  return (
                    <CommandItem
                      key={user}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={() => {
                        setInputValue("");
                        onSelectionChange([...selectedUsers, user]);
                      }}
                      className="cursor-pointer hover:bg-[#e8e0c5]"
                    >
                      {user}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </div>
          ) : null}
        </CommandList>
      </div>
    </Command>
  );
}

"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Option = { value: string; label: string };

function extractOptions(children: React.ReactNode): Option[] {
  const items: Option[] = [];
  React.Children.forEach(children, (child) => {
    if (
      React.isValidElement<React.OptionHTMLAttributes<HTMLOptionElement>>(child)
    ) {
      const v = child.props.value;
      if (v === undefined) return;
      items.push({ value: String(v), label: String(child.props.children ?? "") });
    }
  });
  return items;
}

function SelectNative({
  id,
  className,
  children,
  value,
  onChange,
  disabled,
  placeholder = "Elegí una opción",
}: React.ComponentProps<"select"> & {
  placeholder?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(-1);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const options = React.useMemo(() => extractOptions(children), [children]);
  const selected = options.find((o) => o.value === value);
  const listId = id ? `${id}-listbox` : undefined;

  React.useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function openDropdown() {
    setActiveIndex(options.findIndex((o) => o.value === value));
    setOpen(true);
  }

  function toggleDropdown() {
    if (open) {
      setOpen(false);
    } else {
      openDropdown();
    }
  }

  function commit(next: string) {
    setOpen(false);
    if (next !== value) {
      onChange?.({ target: { value: next } } as React.ChangeEvent<HTMLSelectElement>);
    }
  }

  function onButtonKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleDropdown();
    }
  }

  function onListKeyDown(e: React.KeyboardEvent) {
    if (options.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % options.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + options.length) % options.length);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const i =
        activeIndex >= 0
          ? activeIndex
          : options.findIndex((o) => o.value === value);
      if (i >= 0) commit(options[i].value);
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  }

  return (
    <div ref={rootRef} className="relative" data-slot="select-native">
      <button
        type="button"
        id={id}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        disabled={disabled}
        onClick={toggleDropdown}
        onKeyDown={onButtonKeyDown}
        className={cn(
          "border-input flex h-9 w-full items-center justify-between gap-2 rounded-md border bg-background px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "dark:bg-input/30 dark:text-foreground",
          className
        )}
      >
        <span
          className={cn(
            "truncate text-left",
            !selected && "text-muted-foreground"
          )}
        >
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 opacity-50 transition-transform",
            open && "rotate-180"
          )}
          aria-hidden
        />
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          tabIndex={-1}
          onKeyDown={onListKeyDown}
          className="bg-popover text-popover-foreground absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border p-1 shadow-lg"
        >
          {options.length === 0 ? (
            <li className="px-2 py-1.5 text-sm text-muted-foreground">
              Sin opciones
            </li>
          ) : (
            options.map((o, i) => (
              <li
                key={o.value}
                role="option"
                aria-selected={o.value === value}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => commit(o.value)}
                className={cn(
                  "flex cursor-pointer items-center justify-between gap-2 rounded-sm px-2 py-1.5 text-sm outline-none",
                  i === activeIndex
                    ? "bg-accent text-accent-foreground"
                    : "text-popover-foreground"
                )}
              >
                {o.label}
                {o.value === value && (
                  <Check className="size-4 shrink-0 text-brand" aria-hidden />
                )}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

export { SelectNative };

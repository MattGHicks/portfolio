"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTransition, useState, useEffect } from "react";

type FilterOption = { value: string; label: string };

export function FilterChips({
  param,
  options,
  multi = true,
  allLabel = "All",
}: {
  param: string;
  options: FilterOption[];
  multi?: boolean;
  allLabel?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const current = (searchParams.get(param) ?? "").split(",").filter(Boolean);

  function toggle(value: string) {
    const next = new URLSearchParams(searchParams.toString());
    let newVals: string[];
    if (current.includes(value)) {
      newVals = current.filter((v) => v !== value);
    } else if (multi) {
      newVals = [...current, value];
    } else {
      newVals = [value];
    }
    if (newVals.length === 0) {
      next.delete(param);
    } else {
      next.set(param, newVals.join(","));
    }
    startTransition(() => {
      router.replace(`${pathname}?${next.toString()}`, { scroll: false });
    });
  }

  function clearAll() {
    const next = new URLSearchParams(searchParams.toString());
    next.delete(param);
    startTransition(() => {
      router.replace(`${pathname}?${next.toString()}`, { scroll: false });
    });
  }

  return (
    <div className="admin-filter-chips">
      <button
        type="button"
        onClick={clearAll}
        className={`admin-filter-chip ${current.length === 0 ? "is-active" : ""}`}
      >
        {allLabel}
      </button>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => toggle(opt.value)}
          className={`admin-filter-chip ${current.includes(opt.value) ? "is-active" : ""}`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export function SearchInput({ param = "q", placeholder = "Search…" }: { param?: string; placeholder?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const [value, setValue] = useState(searchParams.get(param) ?? "");

  useEffect(() => {
    const timer = setTimeout(() => {
      const next = new URLSearchParams(searchParams.toString());
      if (value) {
        next.set(param, value);
      } else {
        next.delete(param);
      }
      startTransition(() => {
        router.replace(`${pathname}?${next.toString()}`, { scroll: false });
      });
    }, 220);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <input
      type="search"
      className="admin-input admin-input--search"
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

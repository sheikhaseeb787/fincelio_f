import React from 'react';

interface NumberInputProps {
  label: string;
  value: number | string;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number | string;
  helpText?: string;
  id?: string;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  label,
  value,
  onChange,
  prefix,
  suffix,
  placeholder = '0.00',
  min = 0,
  max,
  step = 'any',
  helpText,
  id,
}) => {
  const inputId = id || `input-${label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (raw === '') {
      onChange(0);
      return;
    }
    const parsed = parseFloat(raw);
    if (!Number.isNaN(parsed)) {
      onChange(parsed);
    }
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label htmlFor={inputId} className="text-xs font-semibold text-[#17231C]">
          {label}
        </label>
        {helpText && (
          <span className="text-[11px] text-[#17231C]/60 truncate ml-2">
            {helpText}
          </span>
        )}
      </div>

      <div className="relative flex items-center rounded-xl bg-white border border-[#E3EBE5] shadow-xs focus-within:border-[#21965A] focus-within:ring-2 focus-within:ring-[#21965A]/15 transition-all">
        {prefix && (
          <div className="pl-3.5 pr-1.5 text-xs font-mono font-medium text-[#17231C]/60 select-none">
            {prefix}
          </div>
        )}
        <input
          id={inputId}
          type="number"
          min={min}
          max={max}
          step={step}
          value={value === 0 ? '' : value}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-full py-2.5 text-sm font-mono text-[#17231C] bg-transparent placeholder:text-[#17231C]/30 focus:outline-none tabular-nums ${
            prefix ? 'pl-1' : 'pl-3.5'
          } ${suffix ? 'pr-1' : 'pr-3.5'}`}
        />
        {suffix && (
          <div className="pr-3.5 pl-1.5 text-xs font-medium text-[#17231C]/60 select-none">
            {suffix}
          </div>
        )}
      </div>
    </div>
  );
};

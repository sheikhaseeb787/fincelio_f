import React, { useState } from 'react';
import { Copy, Check, Download, Printer, RotateCcw } from 'lucide-react';

interface ShareExportBarProps {
  onReset: () => void;
  getSummaryText: () => string;
  getCsvData: () => { filename: string; rows: [string, string | number][] };
}

export const ShareExportBar: React.FC<ShareExportBarProps> = ({
  onReset,
  getSummaryText,
  getCsvData,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const text = getSummaryText();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const text = getSummaryText();
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleExportCsv = () => {
    const { filename, rows } = getCsvData();
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Metric,Value\n' +
      rows.map((e) => `"${e[0]}","${e[1]}"`).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-2.5 pt-4 border-t border-[#E3EBE5] no-print">
      <button
        type="button"
        onClick={onReset}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#17231C]/70 hover:text-[#17231C] bg-[#F4F8F5] hover:bg-[#E3EBE5]/60 border border-[#E3EBE5] rounded-lg transition-colors cursor-pointer"
        title="Reset all inputs to default"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Reset Inputs</span>
      </button>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#17231C]/80 hover:text-[#21965A] bg-[#F4F8F5] hover:bg-[#E5F5EB] border border-[#E3EBE5] rounded-lg transition-colors cursor-pointer"
          title="Copy calculation summary to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#21965A]" />
              <span className="text-[#21965A]">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Summary</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleExportCsv}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#17231C]/80 hover:text-[#21965A] bg-[#F4F8F5] hover:bg-[#E5F5EB] border border-[#E3EBE5] rounded-lg transition-colors cursor-pointer"
          title="Export data as CSV file"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export CSV</span>
        </button>

        <button
          type="button"
          onClick={handlePrint}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#17231C]/80 hover:text-[#21965A] bg-[#F4F8F5] hover:bg-[#E5F5EB] border border-[#E3EBE5] rounded-lg transition-colors cursor-pointer"
          title="Print or Save as PDF"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print</span>
        </button>
      </div>
    </div>
  );
};

import { SpreadsheetCell } from "./SpreadsheetCell";

interface SpreadsheetGridProps {
  data: string[][];
  selectedCell: { row: number; col: number } | null;
  onCellChange: (row: number, col: number, value: string) => void;
  onCellSelect: (row: number, col: number) => void;
}

export const SpreadsheetGrid = ({
  data,
  selectedCell,
  onCellChange,
  onCellSelect,
}: SpreadsheetGridProps) => {
  const columnHeaders = Array.from({ length: data[0]?.length || 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  return (
    <div className="flex-1 overflow-auto bg-background">
      <div className="inline-block min-w-full">
        {/* Header row */}
        <div className="flex">
          {/* Empty corner cell */}
          <SpreadsheetCell
            value=""
            rowIndex={-1}
            colIndex={-1}
            isSelected={false}
            isHeader={true}
            onValueChange={onCellChange}
            onCellSelect={onCellSelect}
          />
          {/* Column headers */}
          {columnHeaders.map((header, colIndex) => (
            <SpreadsheetCell
              key={`header-${colIndex}`}
              value={header}
              rowIndex={-1}
              colIndex={colIndex}
              isSelected={false}
              isHeader={true}
              onValueChange={onCellChange}
              onCellSelect={onCellSelect}
            />
          ))}
        </div>

        {/* Data rows */}
        {data.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {/* Row header */}
            <SpreadsheetCell
              value={(rowIndex + 1).toString()}
              rowIndex={rowIndex}
              colIndex={-1}
              isSelected={false}
              isHeader={true}
              onValueChange={onCellChange}
              onCellSelect={onCellSelect}
            />
            {/* Data cells */}
            {row.map((cell, colIndex) => (
              <SpreadsheetCell
                key={`${rowIndex}-${colIndex}`}
                value={cell}
                rowIndex={rowIndex}
                colIndex={colIndex}
                isSelected={
                  selectedCell?.row === rowIndex && selectedCell?.col === colIndex
                }
                onValueChange={onCellChange}
                onCellSelect={onCellSelect}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
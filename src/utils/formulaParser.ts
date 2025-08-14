export class FormulaParser {
  static evaluate(formula: string, data: string[][]): string {
    if (!formula.startsWith("=")) {
      return formula;
    }

    const expression = formula.slice(1).toUpperCase();

    try {
      // Handle SUM function
      if (expression.startsWith("SUM(")) {
        return this.handleSum(expression, data);
      }

      // Handle AVERAGE function
      if (expression.startsWith("AVERAGE(") || expression.startsWith("AVG(")) {
        return this.handleAverage(expression, data);
      }

      // Handle COUNT function
      if (expression.startsWith("COUNT(")) {
        return this.handleCount(expression, data);
      }

      // Handle MAX function
      if (expression.startsWith("MAX(")) {
        return this.handleMax(expression, data);
      }

      // Handle MIN function
      if (expression.startsWith("MIN(")) {
        return this.handleMin(expression, data);
      }

      // Handle simple cell references (e.g., =A1)
      if (/^[A-Z]+\d+$/.test(expression)) {
        const { row, col } = this.parseCellReference(expression);
        return data[row]?.[col] || "0";
      }

      return formula;
    } catch (error) {
      return "#ERROR";
    }
  }

  private static handleSum(expression: string, data: string[][]): string {
    const range = this.extractRange(expression);
    const values = this.getCellsInRange(range, data);
    const sum = values.reduce((acc, val) => acc + this.parseNumber(val), 0);
    return sum.toString();
  }

  private static handleAverage(expression: string, data: string[][]): string {
    const range = this.extractRange(expression);
    const values = this.getCellsInRange(range, data);
    const numbers = values.map(v => this.parseNumber(v)).filter(n => !isNaN(n));
    if (numbers.length === 0) return "0";
    const avg = numbers.reduce((acc, val) => acc + val, 0) / numbers.length;
    return avg.toFixed(2);
  }

  private static handleCount(expression: string, data: string[][]): string {
    const range = this.extractRange(expression);
    const values = this.getCellsInRange(range, data);
    const count = values.filter(v => v.trim() !== "").length;
    return count.toString();
  }

  private static handleMax(expression: string, data: string[][]): string {
    const range = this.extractRange(expression);
    const values = this.getCellsInRange(range, data);
    const numbers = values.map(v => this.parseNumber(v)).filter(n => !isNaN(n));
    if (numbers.length === 0) return "0";
    return Math.max(...numbers).toString();
  }

  private static handleMin(expression: string, data: string[][]): string {
    const range = this.extractRange(expression);
    const values = this.getCellsInRange(range, data);
    const numbers = values.map(v => this.parseNumber(v)).filter(n => !isNaN(n));
    if (numbers.length === 0) return "0";
    return Math.min(...numbers).toString();
  }

  private static extractRange(expression: string): string {
    const match = expression.match(/\(([^)]+)\)/);
    return match ? match[1] : "";
  }

  private static getCellsInRange(range: string, data: string[][]): string[] {
    if (range.includes(":")) {
      // Range like A1:A5
      const [start, end] = range.split(":");
      const startPos = this.parseCellReference(start);
      const endPos = this.parseCellReference(end);
      
      const values: string[] = [];
      for (let row = startPos.row; row <= endPos.row; row++) {
        for (let col = startPos.col; col <= endPos.col; col++) {
          values.push(data[row]?.[col] || "0");
        }
      }
      return values;
    } else {
      // Single cell
      const { row, col } = this.parseCellReference(range);
      return [data[row]?.[col] || "0"];
    }
  }

  private static parseCellReference(cellRef: string): { row: number; col: number } {
    const match = cellRef.match(/^([A-Z]+)(\d+)$/);
    if (!match) throw new Error("Invalid cell reference");
    
    const colStr = match[1];
    const rowStr = match[2];
    
    let col = 0;
    for (let i = 0; i < colStr.length; i++) {
      col = col * 26 + (colStr.charCodeAt(i) - 64);
    }
    col -= 1; // Convert to 0-based
    
    const row = parseInt(rowStr) - 1; // Convert to 0-based
    
    return { row, col };
  }

  private static parseNumber(value: string): number {
    const num = parseFloat(value);
    return isNaN(num) ? 0 : num;
  }
}
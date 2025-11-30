import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const exportTableToXlsx = (table, sheetName, fileName) => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(
        table.getCoreRowModel().flatRows.map(row => row.original)
    );

    XLSX.utils.book_append_sheet(wb, ws, sheetName);

    const buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, fileName);
}

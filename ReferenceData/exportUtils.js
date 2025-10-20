import * as XLSX from 'xlsx';

export function buildVisibleRows(data, activeColumnLabels, visibleColumns, locked = []) {
  return (data || []).map((row) => {
    const out = {};
    Object.entries(activeColumnLabels || {}).forEach(([key, label]) => {
      if (!visibleColumns[key] && !locked.includes(key)) return;
      out[label] = row?.[key] ?? '';
    });
    return out;
  });
}

export function exportAsJSON(data, activeColumnLabels, visibleColumns, locked = [], baseName = 'data') {
  const rows = buildVisibleRows(data, activeColumnLabels, visibleColumns, locked);
  const blob = new Blob([JSON.stringify(rows, null, 2)], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${baseName}_${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
}

export function exportAsCSV(data, activeColumnLabels, visibleColumns, locked = [], baseName = 'data') {
  const headers = Object.entries(activeColumnLabels || {})
    .filter(([key]) => visibleColumns[key] || locked.includes(key))
    .map(([, label]) => label);

  const csvContent = [
    headers.join(','),
    ...(data || []).map((row) =>
      Object.keys(activeColumnLabels || {})
        .filter((key) => visibleColumns[key] || locked.includes(key))
        .map((key) => {
          const v = (row?.[key] ?? '').toString().replace(/"/g, '""');
          return /[",\n]/.test(v) ? `"${v}"` : v;
        })
        .join(',')
    ),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${baseName}_${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
}

export function exportAsXLSX(data, activeColumnLabels, visibleColumns, locked = [], baseName = 'data') {
  const rows = buildVisibleRows(data, activeColumnLabels, visibleColumns, locked);
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(rows);
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, `${baseName}_${new Date().toISOString().slice(0, 10)}.xlsx`);
}

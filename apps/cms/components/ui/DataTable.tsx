export function DataTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-muted">
          <tr>
            {columns.map((column) => (
              <th key={column} className="px-4 py-3 font-medium">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td className="px-4 py-8 text-sm text-muted" colSpan={columns.length}>
                Nothing here yet.
              </td>
            </tr>
          ) : (
            rows.map((row, index) => (
              <tr key={index} className="border-t border-line">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-4 py-3 align-top whitespace-pre-wrap">
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

import React from 'react';
import { useRefTableState } from './useRefTableState';
import { exportAsJSON, exportAsCSV, exportAsXLSX } from './exportUtils';

/**
 * Shared table UI for Reference Data
 * Props:
 *  - title, definition
 *  - data: canonical rows[]
 *  - loadState: {loading, error}
 *  - labelsPack: { all, bySource, defaultVisible, locked, sourceModes }
 *  - baseFileName: string for downloads
 */
const ReferenceDataTable = ({ title, definition, data, loadState, labelsPack, baseFileName = 'data' }) => {
  const {
    // state & helpers
    sourceFilterMode, setSourceFilterMode,
    activeColumnLabels, activeKeys,
    visibleColumns, toggleColumn,
    inputValues, handleFilterChange, handleSuggestionClick, handleInputFocus,
    activeDropdown, dropdownSuggestions, dropdownRefs,
    showColumnToggle, setShowColumnToggle, columnToggleRef,
    showDownloadMenu, setShowDownloadMenu, downloadMenuRef,
    currentPage, setCurrentPage, totalPages, startIndex, endIndex, currentData, filteredData, getPageNumbers,
    locked,
  } = useRefTableState({ rows: data, labelsPack, rowsPerPage: 8 });

  const { loading, error } = loadState || {};

  const sourceModes = labelsPack?.sourceModes || [];

  return (
    <div className="reference-data-table pad-2 border">
      {/* Header */}
      <div className="flex flex-justify-between flex-align-end margin-2-b pad-1-b border-bottom">
        <div>
          <h2 className="margin-0 font-weight-bold">{title}</h2>
          {definition && (
            <p className="text-neutral font-italic margin-0">
              <strong>Enterprise Catalog Business Term Definition:</strong> {definition}
            </p>
          )}
        </div>

        <div className="flex flex-align-center stack-1-r">
          {/* Source Filter */}
          {sourceModes.length > 0 && (
            <select
              className="border pad-1-t-b pad-1-l-r"
              value={sourceFilterMode}
              onChange={(e) => setSourceFilterMode(e.target.value)}
            >
              {sourceModes.map(m => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
          )}

          {/* Download menu */}
          <div className="position-relative" ref={downloadMenuRef}>
            <button
              className="border pad-1-t-b pad-1-l-r flex flex-align-center"
              aria-expanded={showDownloadMenu}
              onClick={() => setShowDownloadMenu(!showDownloadMenu)}
              title="Download"
            >
              <span>⬇</span>
              <span className="margin-1-l">Download</span>
            </button>
            {showDownloadMenu && (
              <div className="position-absolute-tr margin-1-t border border-dark pad-1 dls-white-bg" style={{ zIndex: 999 }}>
                <div className="font-weight-bold pad-1 border-bottom margin-0">Export Format</div>
                <button className="display-block pad-1 text-align-left border-0"
                        onClick={() => exportAsXLSX(filteredData, activeColumnLabels, visibleColumns, locked, baseFileName)}>
                  Download as Excel
                </button>
                <button className="display-block pad-1 text-align-left border-0"
                        onClick={() => exportAsCSV(filteredData, activeColumnLabels, visibleColumns, locked, baseFileName)}>
                  Download as CSV
                </button>
                <button className="display-block pad-1 text-align-left border-0"
                        onClick={() => exportAsJSON(filteredData, activeColumnLabels, visibleColumns, locked, baseFileName)}>
                  Download as JSON
                </button>
              </div>
            )}
          </div>

          {/* Column Toggle */}
          <div className="position-relative" ref={columnToggleRef}>
            <button
              className="border pad-1-t-b pad-1-l-r flex flex-align-center"
              aria-expanded={showColumnToggle}
              onClick={() => setShowColumnToggle(!showColumnToggle)}
            >
              <span>🧱</span>
              <span className="margin-1-l">Columns</span>
            </button>

            {showColumnToggle && (
              <div className="position-absolute-tr margin-1-t border border-dark pad-1 dls-white-bg" style={{ zIndex: 999 }}>
                <div className="font-weight-bold pad-1 border-bottom margin-0">Show/Hide Columns</div>
                {Object.entries(activeColumnLabels).map(([key, label]) => {
                  const lockedCol = locked.includes(key);
                  return (
                    <label key={key} className={`display-block pad-1 ${lockedCol ? 'text-neutral' : ''}`}>
                      <input
                        type="checkbox"
                        className="margin-1-r"
                        checked={!!visibleColumns[key] || lockedCol}
                        disabled={lockedCol}
                        onChange={() => toggleColumn(key)}
                      />
                      {label}
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <table className="table table-striped border width-full">
        <thead>
          <tr>
            {activeKeys
              .filter((k) => (visibleColumns[k] || locked.includes(k)))
              .map((key) => (
                <th key={key} className="font-weight-bold text-uppercase pad-1-l-r pad-1-t-b">
                  {activeColumnLabels[key]}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {/* Filter Row */}
          <tr className="filter-row">
            {activeKeys.filter((k) => (visibleColumns[k] || locked.includes(k))).map((key) => (
              <td key={`filter-${key}`} className="pad-1 position-relative border">
                <div className="position-relative width-full" ref={(el) => (dropdownRefs.current[key] = el)}>
                  <input
                    type="text"
                    className="width-full border pad-1"
                    value={inputValues[key] || ''}
                    onChange={(e) => handleFilterChange(key, e.target.value)}
                    onFocus={() => handleInputFocus(key)}
                    placeholder={`Filter ${activeColumnLabels[key]}`}
                  />
                  {activeDropdown === key && (dropdownSuggestions[key] || []).length > 0 && (
                    <div className="border width-full margin-1-t position-absolute dls-white-bg" style={{ zIndex: 999 }}>
                      {(dropdownSuggestions[key] || []).map((s, i) => (
                        <div key={i} className="pad-1" onClick={() => handleSuggestionClick(key, s)}>
                          {s}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </td>
            ))}
          </tr>

          {/* Data Rows */}
          {currentData.map((row, idx) => (
            <tr key={`row-${idx}`}>
              {activeKeys.filter((k) => (visibleColumns[k] || locked.includes(k))).map((key) => (
                <td key={`${idx}-${key}`} className="pad-1-l-r pad-1-t-b border">
                  {row?.[key] ?? (locked.includes(key) ? '-' : '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Loading / Error */}
      {loading && (
        <div className="margin-1-t text-neutral font-italic">
          Loading…
        </div>
      )}
      {error && !loading && (
        <div className="margin-1-t text-danger">
          Failed to load: {error}
        </div>
      )}

      {/* Footer: pagination */}
      {filteredData.length > 0 && (
        <div className="flex flex-justify-between flex-align-center margin-2-t stack-1-r">
          <div>
            Showing rows {startIndex + 1}-{Math.min(endIndex, filteredData.length)} of {filteredData.length}
          </div>

          {totalPages > 1 && (
            <div className="flex">
              <button className="border pad-1-l-r pad-1-t-b margin-0" onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>First</button>&nbsp;
              <button className="border pad-1-l-r pad-1-t-b margin-0" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>Previous</button>&nbsp;
              {getPageNumbers().map((p, i) =>
                p === '...' ? (
                  <span key={`ellipsis-${i}`} className="text-neutral">…&nbsp;</span>
                ) : (
                  <button key={`page-${p}`} className={`border pad-1-l-r pad-1-t-b margin-0 ${currentPage === p ? 'font-weight-bold' : ''}`} onClick={() => setCurrentPage(p)}>
                    {p}
                  </button>
                )
              )}&nbsp;
              <button className="border pad-1-l-r pad-1-t-b margin-0" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>Next</button>&nbsp;
              <button className="border pad-1-l-r pad-1-t-b margin-0" onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>Last</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReferenceDataTable;

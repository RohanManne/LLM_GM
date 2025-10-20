import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const makeDebounce = (fn, wait = 300) => {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
};

export function useRefTableState({ rows, labelsPack, rowsPerPage = 8 }) {
  const { all: columnsAll, bySource = {}, defaultVisible, locked = [], sourceModes } = labelsPack;

  const [sourceFilterMode, setSourceFilterMode] = useState(sourceModes?.[0]?.value || 'all');
  const [visibleColumns, setVisibleColumns] = useState(defaultVisible || {});
  const [filters, setFilters] = useState({});
  const [inputValues, setInputValues] = useState({});
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [dropdownSuggestions, setDropdownSuggestions] = useState({});
  const dropdownRefs = useRef({});

  const [showColumnToggle, setShowColumnToggle] = useState(false);
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const columnToggleRef = useRef(null);
  const downloadMenuRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);

  // Active column labels for current source mode
  const activeColumnLabels = useMemo(() => {
    const specific = bySource?.[sourceFilterMode];
    if (specific && typeof specific === 'object') return specific;
    return columnsAll;
  }, [columnsAll, bySource, sourceFilterMode]);

  const activeKeys = useMemo(() => Object.keys(activeColumnLabels || {}), [activeColumnLabels]);

  // Suggestions: only build for active columns
  const uniqueValues = useMemo(() => {
    const res = {};
    activeKeys.forEach((col) => {
      const set = new Set();
      (rows || []).forEach(r => {
        const v = (r?.[col] ?? '').toString().trim();
        if (v) set.add(v);
      });
      res[col] = Array.from(set).sort((a,b)=>a.localeCompare(b));
    });
    return res;
  }, [rows, activeKeys]);

  // Filtering including source mode (include mode)
  const filteredData = useMemo(() => {
    const needleIn = (needle, hay) =>
      (hay || '').toLowerCase().includes((needle || '').toLowerCase());

    return (rows || []).filter((row) => {
      const src = (row?.source || '').toLowerCase();
      if (sourceFilterMode !== 'all') {
        if (!src.includes(sourceFilterMode)) return false;
      }
      // column text filters
      return Object.entries(filters).every(([k, val]) => {
        if (!val || !val.trim()) return true;
        return needleIn(val, (row?.[k] ?? '').toString());
      });
    });
  }, [rows, filters, sourceFilterMode]);

  // Pagination
  const totalPages = Math.ceil((filteredData.length || 0) / rowsPerPage) || 1;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  useEffect(() => setCurrentPage(1), [filters, sourceFilterMode, rowsPerPage]);

  const getPageNumbers = useCallback(() => {
    const pages = [];
    const maxPages = 5;
    if (totalPages <= maxPages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (currentPage <= 3) {
      pages.push(1, 2, 3, '...', totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }
    return pages;
  }, [currentPage, totalPages]);

  // Debounced filter setter
  const debouncedSetFilters = useMemo(
    () => makeDebounce((field, value) => {
      setFilters(prev => ({ ...prev, [field]: value }));
    }, 300),
    []
  );

  const handleFilterChange = useCallback((field, value) => {
    setInputValues(prev => ({ ...prev, [field]: value }));
    debouncedSetFilters(field, value);
    if (value && value.trim()) {
      const suggestions = (uniqueValues[field] || [])
        .filter(item => item.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 10);
      setDropdownSuggestions(prev => ({ ...prev, [field]: suggestions }));
      setActiveDropdown(field);
    } else setActiveDropdown(null);
  }, [debouncedSetFilters, uniqueValues]);

  const handleSuggestionClick = (field, value) => {
    setInputValues(prev => ({ ...prev, [field]: value }));
    setFilters(prev => ({ ...prev, [field]: value }));
    setActiveDropdown(null);
  };

  const handleInputFocus = (field) => {
    if (inputValues[field] && inputValues[field].trim()) {
      const suggestions = (uniqueValues[field] || [])
        .filter(item => item.toLowerCase().includes(inputValues[field].toLowerCase()))
        .slice(0, 10);
      setDropdownSuggestions(prev => ({ ...prev, [field]: suggestions }));
      setActiveDropdown(field);
    }
  };

  const toggleColumn = (col) => {
    if (!(col in activeColumnLabels)) return;
    if (locked.includes(col)) return;
    setVisibleColumns(prev => ({ ...prev, [col]: !prev[col] }));
  };

  // Close menus/dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (activeDropdown && dropdownRefs.current[activeDropdown] &&
          !dropdownRefs.current[activeDropdown].contains(e.target)) setActiveDropdown(null);

      if (showColumnToggle && columnToggleRef.current &&
          !columnToggleRef.current.contains(e.target)) setShowColumnToggle(false);

      if (showDownloadMenu && downloadMenuRef.current &&
          !downloadMenuRef.current.contains(e.target)) setShowDownloadMenu(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeDropdown, showColumnToggle, showDownloadMenu]);

  return {
    // data/state
    sourceFilterMode, setSourceFilterMode,
    activeColumnLabels, activeKeys,
    visibleColumns, setVisibleColumns, toggleColumn,
    filters, inputValues, uniqueValues,
    handleFilterChange, handleSuggestionClick, handleInputFocus,
    activeDropdown, dropdownSuggestions, dropdownRefs,

    // menus
    showColumnToggle, setShowColumnToggle, columnToggleRef,
    showDownloadMenu, setShowDownloadMenu, downloadMenuRef,

    // pagination
    currentPage, setCurrentPage, totalPages, startIndex, endIndex, currentData, filteredData, getPageNumbers,

    // config
    locked,
  };
}

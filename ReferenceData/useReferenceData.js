import { useEffect, useRef, useState } from 'react';

/**
 * Generic async data fetcher wrapper (handles mounted state & errors)
 * @param {() => Promise<any>} fetchFn - your API helper
 * @param {(raw:any)=>Array<object>} adapter - raw -> canonical rows[]
 */
export function useReferenceData(fetchFn, adapter) {
  const [data, setData] = useState([]);
  const [loadState, setLoadState] = useState({ loading: true, error: '' });
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    (async () => {
      setLoadState({ loading: true, error: '' });
      try {
        const raw = await fetchFn();
        const rows = adapter ? adapter(raw) : (Array.isArray(raw) ? raw : []);
        if (mountedRef.current) {
          setData(rows || []);
          setLoadState({ loading: false, error: '' });
        }
      } catch (e) {
        if (mountedRef.current) {
          setLoadState({ loading: false, error: e?.message || 'Failed to load' });
        }
      }
    })();
    return () => { mountedRef.current = false; };
  }, [fetchFn, adapter]);

  return { data, loadState };
}

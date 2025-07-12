import { serialize } from 'next-mdx-remote/serialize';
import { useEffect, useState } from 'react';

export function useMdxSource(mdx: string | undefined, deps: any[] = []) {
  const [mdxSource, setMdxSource] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (!mdx) {
      setMdxSource(null);
      setLoading(false);
      setError(null);
      return;
    }
    setLoading(true);
    setError(null);
    const compile = async () => {
      try {
        const compiled = await serialize(mdx);
        if (!cancelled) {
          setMdxSource(compiled);
          setLoading(false);
        }
      } catch (err: any) {
        if (!cancelled) {
          setError(err);
          setMdxSource(null);
          setLoading(false);
        }
      }
    };
    compile();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mdx, ...deps]);

  return { mdxSource, loading, error };
}

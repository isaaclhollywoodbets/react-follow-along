import { useEffect, useState } from 'react';
import Bio from './Bio';
import { ApiError, getProfile } from '../api/portfolioApi';
import type { Profile } from '../types/api-profile';

function ProfileCard() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  async function loadProfile({ signal }: { signal?: AbortSignal } = {}) {
    setStatus('loading');
    setError('');

    try {
      const data = await getProfile({ signal });
      setProfile(data ?? null);
      setStatus('success');
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === 'AbortError') return;

      setStatus('error');
      if (err instanceof ApiError) {
        setError(`${err.message} (HTTP ${err.status})`);
      } else {
        setError(err instanceof Error ? err.message : 'Failed to load profile');
      }
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    loadProfile({ signal: controller.signal });
    return () => controller.abort();
  }, []);

  if (status === 'loading') return <p>Loading profile...</p>;
  if (status === 'error') {
    return (
      <div>
        <p>Could not load profile: {error}</p>
        <button type="button" onClick={() => loadProfile()}>
          Retry
        </button>
      </div>
    );
  }
  if (!profile) return <p>No profile data yet.</p>;

  return (
    <section className="ProfileCard">
      <h2>{profile.displayName || 'No display name provided.'}</h2>
      <Bio bio={profile.bio} />
    </section>
  );
}

export default ProfileCard;

import { useProfile } from '../hooks/useProfile';
import Bio from './Bio';


function ProfileCard() {
  const {
    profile,
    status: profileStatus,
    error: profileError,
    reload: reloadProfile,
  } = useProfile();



  if (profileStatus === 'loading') return <p>Loading profile...</p>;
  if (profileStatus === 'error') {
    return (
      <div>
        <p>Could not load profile: {profileError}</p>
        <button type="button" onClick={() => reloadProfile()}>
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

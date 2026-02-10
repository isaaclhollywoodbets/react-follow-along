import Bio from "../components/Bio"

type ProfileCardProps = {
    children: React.ReactNode;
}
function ProfileCard({children}: ProfileCardProps) {
    return(
        <>
        <div className="ProfileCard">{children}</div>
        <Bio></Bio>
        </>
    )
}

export default ProfileCard;
type ProfileCardProps = {
    children: React.ReactNode;
}
function ProfileCard({children}: ProfileCardProps) {
    return(
        <div className="ProfileCard">{children}</div>
        
    )
}

export default ProfileCard;
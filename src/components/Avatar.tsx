//6.1 default value in destructuring
type AvatarProps = {
    name: string;
    size?: number; //optional
};

function Avatar({ name, size = 64}: AvatarProps){
    const src = new URL(`../assets/avatars/${name}.svg`, import.meta.url).href
    return <img src={src} width={size} height={size} alt={name}/>
}

export default Avatar;
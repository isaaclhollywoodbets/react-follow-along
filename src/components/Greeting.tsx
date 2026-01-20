//Basic exampl 2. Passing a string prop

type GreetingProps = {
    name: string
}

//3.1 Using a props object
// function GreetingUsingObject(props: GreetingProps) {
//     return <h1>Hello {props.name}</h1>
// }

//3.2 Destructuring in the parameter
function Greeting({name}: GreetingProps) {
    return <h1>Hello {name}</h1>
}

export default Greeting;
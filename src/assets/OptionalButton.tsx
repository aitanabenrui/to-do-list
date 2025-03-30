
interface OptionalButtonProps {
    showButton ?: boolean;
    text: string;
    type: 'button' | 'submit' | 'reset';
    onClick: ()=> void; //declaración de una función concreta, sin parametros que no devuelve nada
} //void significa que no esperas que la función devuelva nada

export const OptionalButton = (props: OptionalButtonProps) =>{
    const {onClick, text, type, showButton} = props; 
    
    if(!showButton) {
        return null;
    }

    return (
        <button onClick={()=>{onClick()}} type={type}>
        {text}
        </button>
    );
};
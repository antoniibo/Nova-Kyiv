import React,{useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import config from "../config";

interface CallbackProps {
    id: number;
    size: string;
}

const Callback: React.FC<CallbackProps> = ({id, size}) =>{
    const [email, setEmail] = useState<string>('');
    const [callback, setCallback] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch(`${config.BASE_URL}mail/callback`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, id, size }),
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message);
                setCallback(true);
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Щось пішло не так, спробуйте ще раз');
        }
    };

    return(
        <>
            {callback ? (
                <p className="success">Ми надішлемо вам письмо за наявності!</p>
            ) : (
                <form onSubmit={handleSubmit} className="callback">
                    <label htmlFor="callback"><b>Повідомити про наявність:</b></label>
                    <div>
                        <input 
                        type="email" 
                        placeholder="Електронна пошта" 
                        id="callback"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        />
                        <button type="submit"><FontAwesomeIcon icon={faChevronRight} className="click"/></button>
                    </div>
                </form>
                
            )}
        </>
    )
}
export default Callback
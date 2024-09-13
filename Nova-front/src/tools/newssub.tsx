import React,{useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faTags } from '@fortawesome/free-solid-svg-icons'
import config from "../config";

// Footer news submition form
const Newssub: React.FC = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch(`${config.BASE_URL}mail/subscribe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message);
                setSubscribed(true);
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Щось пішло не так, спробуйте ще раз');
        }
    };

    return (
        <div className="newssub">
            {subscribed ? (
                <p className="success">Дякуємо! Ви успішно підписалися на наші новини :)</p>
            ) : (
                <>
                    <p><FontAwesomeIcon icon={faTags} /> Будьте у курсі наших новин і отримуй спеціальні знижки!</p>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Електронна пошта"
                            id="subscribe"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button type="submit"><FontAwesomeIcon icon={faChevronRight} className="click"/></button>
                    </form>
                </>
            )}
        </div>
    );
}

export default Newssub;

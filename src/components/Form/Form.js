import { useState } from 'react';
import styles from './Form.module.scss';

const Form = ({ add, adresses }) => {

    const [disable, setDisabled] = useState(true);
    const [adressError, setError] = useState(false);
    const [message, setMessage] = useState("");

    const click = () => {
        setError(false);
    }

    const change = e => {
        if (e.target.value === "") {
            setDisabled(true);
        } else {
            setDisabled(false)
        }
    }

    const addAdress = e => {
        e.preventDefault();
        const form = document.querySelector('form');
        const adress = form.querySelector('input').value;
        let url = 'https://api.trongrid.io/wallet/validateaddress';
        let options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: `{"address": "${adress}"}`
        };
        if(!adresses.includes(adress)) {
        fetch(url, options)
            .then(res => res.json())
            .then(res => {
                if (res.result) {
                    add(prevArray => [...prevArray, adress])
                } else {
                    setMessage("Addres isn't valid");
                    setError(true);
                }
            })
            .catch(err => console.error('error:' + err));
        } else {
            setMessage('That adress was already added');
            setError(true);
        }
        form.reset();
        setDisabled(true);
    }

    return (
        <form onSubmit={addAdress} className={styles.form}>
        {adressError && <p>{message}</p>}
       <label htmlFor="adress">Adress: </label>
       <input placeholder="Write adress here" 
              onClick={click} 
              onChange={change} 
              type="text" 
              name="adress" 
              id="adress" 
       />
       <input disabled={disable} type="submit" value="add" />
   </form>
    );
}

export default Form;
import { useState } from 'react';
import styles from './Form.module.scss';

const Form = ({ add }) => {

    const [disable, setDisabled] = useState(true);

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
        add(prevArray => [...prevArray, adress])
        form.reset();
        setDisabled(true);
    }

    return (
        <form onSubmit={addAdress} className={styles.form}>
            <label htmlFor="adress">Adress: </label>
            <input placeholder="Write adress here" onChange={change} type="text" name="adress" id="adress" />
            <input disabled={disable} type="submit" value="add" />
        </form>
    );
}

export default Form;
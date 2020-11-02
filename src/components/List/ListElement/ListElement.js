import {useState} from 'react';
import styles from './ListElement.module.scss';

const ListElement = ({ text, remove, setData }) => {
    const [disable, setDisabled] = useState(false);

    const removeItem = () => {
        setData(prevArray => prevArray.filter(item => item.adress !== text));
        remove(prevArray => prevArray.filter(item => item !== text));
    }
    const generate = () => {
        let url = 'https://api.trongrid.io/wallet/getaccount';
        let options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: `{"address":"${text}", "visible": true}`
        };
        fetch(url, options)
            .then(res => res.json())
            .then(({ balance, create_time, latest_opration_time }) => {
                setData(prevArray => [...prevArray, { adress: text, balance, create_time, latest_opration_time }]);
                setDisabled(true);
            })
            .catch(err => console.error('error:' + err));
    }
    
    return (
        <div className={styles.item}>
            <button onClick={removeItem} className={styles.btn}></button>
            <p className={styles.adress}>{text}</p>
            <button disabled={disable} onClick={generate} className={styles.btn}>generate</button>
        </div>)
}

export default ListElement; 
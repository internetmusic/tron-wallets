import styles from './ListElement.module.scss';

const ListElement = ({ text, remove }) => {

    const removeItem = (e) => {
        let adress = e.target.nextElementSibling.textContent;
        remove(prevArray => prevArray.filter(item => item !== adress));
    }
    return (
        <div className={styles.item}>
            <button onClick={removeItem} className={styles.btn}></button>
            <p className={styles.adress}>{text}</p>
        </div>)
}

export default ListElement; 
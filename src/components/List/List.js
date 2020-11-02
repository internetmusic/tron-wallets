import styles from './List.module.scss';
import ListElement from './ListElement/ListElement';

const List = ({ list = [], remove, setData }) => {
    return (
        <div className={styles.container}>
            {list.map(adress => <ListElement key={adress} text={adress} remove={remove} setData={setData} />)}
        </div>
    );
}

export default List;
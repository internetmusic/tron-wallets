import styles from './List.module.scss';
import ListElement from './ListElement/ListElement';

const List = ({ list = [], remove }) => {
    return (
        <div className={styles.container}>
            {list.map(adress => <ListElement key={adress} text={adress} remove={remove} />)}
        </div>
    );
}

export default List;
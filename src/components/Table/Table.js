import { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import up from '../../assets/up.svg';
import down from '../../assets/down.svg';
import styles from './Table.module.scss';

const Tables = ({ data, setData, setAdress, adresses }) => {

    const copy = [...data];

    const [isDate, setDate] = useState(false);
    const formatDate = (miliseconds) => {
        const dateObject = new Date(miliseconds);
        return dateObject.toLocaleString();
    }

    const compareValues = (key, order = 'asc') => {
        return function innersortTable(a, b) {
            if (typeof a[key] === "undefined") {
                return 1;
            }

            if (order === 'asc') {
                return a[key] - b[key]
            } else {
                return b[key] - a[key]
            }
        }
    }

    const sortTable = (e, key, order) => {
        const arrows = document.querySelectorAll('img');
        arrows.forEach(arrow => arrow.style.backgroundColor = "#ddd");
        let arr = [...data];
        if (order === 'up') {
            e.target.style.backgroundColor = "#fff";
            arr = arr.sort(compareValues(key));
            setData(arr);
        } else {
            e.target.style.backgroundColor = "#fff";
            arr = arr.sort(compareValues(key, 'desc'));
            setData(arr)
        }
    }

    const filter = e => {
        if (e.target.value === "create_time" || e.target.value === "latest_time_operation") {
            setDate(true)
        } else {
            setDate(false)
        }
    }

    const filterTable = (tr, val, query) => {
        if (val === "") {
            return;
        }
        let arr = [...data];
        let arr1 = [...adresses];
        if (query === "equal") {
            arr = tr === "balance" ?
                arr.filter(item => item[tr] === Number(val))
                :
                arr.filter(item => new Date(item[tr]).toLocaleDateString() === new Date(val).toLocaleDateString())
        } else if (query === "not_equal") {
            arr = tr === "balance" ?
                arr.filter(item => item.balance !== Number(val))
                :
                arr.filter(item => new Date(item[tr]).toLocaleDateString() !== new Date(val).toLocaleDateString())
        } else if (query === "less_than") {
            arr = tr === "balance" ?
                arr = arr.filter(item => item[tr] < Number(val))
                :
                arr.filter(item => new Date(item[tr]).toLocaleDateString() < new Date(val).toLocaleDateString())

        } else {
            arr = tr === "balance" ?
                arr.filter(item => item[tr] > Number(val))
                :
                arr.filter(item => new Date(item[tr]).toLocaleDateString() > new Date(val).toLocaleDateString())
        }
        for (let i = 0; i < arr.length; i++) {
            arr1 = arr1.filter(item => item === arr[i].adress);
        }
        setAdress(arr1)
        setData(arr)
    }

    const submit = e => {
        const form = e.target;
        e.preventDefault();
        const input = form.querySelector('input');
        const selects = form.querySelectorAll('select');

        if (selects[0].value === "balance") {
            filterTable('balance', input.value, selects[1].value);
        } else if (selects[0].value === "create_time") {
            filterTable('create_time', input.value, selects[1].value)
        } else {
            filterTable('latest_opration_time', input.value, selects[1].value)
        }
        form.reset();
        setDate(false)
    }

    return (
        <TableContainer className={styles.container} component={Paper}>
            <div className={styles.filter}>
                <form onSubmit={submit}>
                    <label htmlFor="filter">Filter table:</label>
                    {isDate ?
                        <input type="date" name="" id="" />
                        :
                        <input type="number" name="filter" id="filter" />
                    }
                    <select name="trs" id="trs" onChange={filter}>
                        <option value="balance">balance</option>
                        <option value="create_time">create time</option>
                        <option value="latest_time_operation">latest time operation</option>
                    </select>
                    <select name="queries" id="queries">
                        <option value="equal">equal</option>
                        <option value="not_equal">not equal</option>
                        <option value="less_than">less than</option>
                        <option value="greater_than">greater than</option>
                    </select>
                    <input type="submit" name="filter" id="filter" value="Filter" />
                </form>
            </div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell className={styles.adress}>adress</TableCell>
                        <TableCell className={styles.thead} align="left">
                            <p>balance</p>
                            <div>
                                <img onClick={(e) => sortTable(e, 'balance', 'up')} src={up} alt="up" />
                                <img onClick={(e) => sortTable(e, 'balance', 'down')} src={down} alt="down" />
                            </div>
                        </TableCell>
                        <TableCell className={styles.thead} align="left">
                            <p>create time</p>
                            <div>
                                <img onClick={(e) => sortTable(e, 'create_time', 'up')} src={up} alt="up" />
                                <img onClick={(e) => sortTable(e, 'create_time', 'down')} src={down} alt="down" />
                            </div>
                        </TableCell>
                        <TableCell className={styles.thead} align="left">
                            <p>latest time operation</p>
                            <div>
                                <img onClick={(e) => sortTable(e, 'latest_opration_time', 'up')} src={up} alt="up" />
                                <img onClick={(e) => sortTable(e, 'latest_opration_time', 'down')} src={down} alt="down" />
                            </div>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(item => {
                        const create_date = formatDate(item.create_time);
                        const latest_oprt = formatDate(item.latest_opration_time)
                        return (
                            <TableRow key={item.adress}>
                                <TableCell component="th">{item.adress}</TableCell>
                                <TableCell align="left">{item.balance && item.balance.toLocaleString()}</TableCell>
                                <TableCell align="left">{create_date}</TableCell>
                                <TableCell align="left">{latest_oprt}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Tables;
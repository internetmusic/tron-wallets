import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const Tables = ({ data }) => {

    const formatDate = (miliseconds) => {
        const dateObject = new Date(miliseconds)
        return dateObject.toLocaleString();
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>adress</TableCell>
                        <TableCell align="right">balance</TableCell>
                        <TableCell align="right">create time</TableCell>
                        <TableCell align="right">latest time operation</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(item => {
                        const create_date = formatDate(item.create_time);
                        const latest_oprt = formatDate(item.latest_opration_time)
                        return (
                            <TableRow key={item.adress}>
                                <TableCell component="th">{item.adress}</TableCell>
                                <TableCell align="right">{item.balance}</TableCell>
                                <TableCell align="right">{create_date}</TableCell>
                                <TableCell align="right">{latest_oprt}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Tables;
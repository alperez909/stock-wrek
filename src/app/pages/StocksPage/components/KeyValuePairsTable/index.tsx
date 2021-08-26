import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

function KeyValuePairsTable(props) {
  return (
    <TableContainer>
      <Table>
        <TableBody>
          {props.entries.map(entry => (
            <TableRow key={entry.key}>
              <TableCell align="left" component="th" scope="row" variant="head">
                {entry.key}
              </TableCell>
              <TableCell align="right">{entry.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default KeyValuePairsTable;

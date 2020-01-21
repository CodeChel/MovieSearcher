import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import styles from './Movie.module.scss'

const TableDescription = ({ movie }) => {
    return <TableContainer>
        <Table className={styles.table}>
            <TableBody>
                { movie.tagline.length > 0
                    && <TableRow>
                        <TableCell component="th" scope="row">
                            Tagline:
                    </TableCell>
                        <TableCell className={styles.tagline}>
                            {movie.tagline}
                        </TableCell>
                    </TableRow>}
                <TableRow>
                    <TableCell component="th" scope="row">
                        Ratting:
                    </TableCell>
                    <TableCell >
                        {movie.vote_average}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        Rlease date:
        </TableCell>
                    <TableCell >
                        {movie.release_date}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        Genres:
        </TableCell>
                    <TableCell >
                        {movie.genres.map(g => g.name + ' ')}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        Runtime:
        </TableCell>
                    <TableCell >
                        {movie.runtime + ' min'}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        Budget:
        </TableCell>
                    <TableCell >
                        {movie.budget + '$'}
                    </TableCell>
                </TableRow>

            </TableBody>
        </Table>
    </TableContainer>
}

export default TableDescription
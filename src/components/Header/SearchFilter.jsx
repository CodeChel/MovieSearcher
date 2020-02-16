import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import styles from './SearchFilter.module.scss'
import { Button, FormControlLabel, Typography, Switch } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Input from '@material-ui/core/Input'
import Preloader from '../common/Preloader'
import { Formik, Form } from 'formik'
import Checkbox from '../common/Checkbox'



const SearchFilter = ({ genresIsFetch, getGenres, genres, setSearchOptions, searchOptions }) => {
    const [open, setOpen] = React.useState(false)


    React.useEffect(() => {
        open && getGenres()
    }, [open, getGenres])


    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }


    return <>

        <Button onClick={handleOpen} variant="contained" size="small" color='secondary' className={styles.chooseBtn}>Choose movie</Button>

        <Dialog onBackdropClick={handleClose} maxWidth='md' fullWidth className={styles.dialog} disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
            <DialogTitle className={styles.dialogTitle}>Set search options</DialogTitle>
            {
                genresIsFetch
                    ? <Preloader />
                    : <DialogContent>

                        <Formik
                            initialValues={{ ...searchOptions }}

                            onSubmit={async values => {
                                setSearchOptions(values)
                                handleClose(true)
                            }}
                        >
                            {(props) => (
                                <Form className={styles.form}>
                                    <div className={styles.containerInputs}>
                                        <FormControl className={styles.formControl}>
                                            <InputLabel id='sort_by' >Sort by</InputLabel>
                                            <Select
                                                name='sort_by'
                                                onChange={props.handleChange}
                                                value={props.values.sort_by}
                                            >
                                                <MenuItem value={'popularity'}>Popular</MenuItem>
                                                <MenuItem value={'vote_average'}>Rating</MenuItem>
                                                <MenuItem value={'release_date'}>Release date</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <FormControl className={styles.inputContainer}>
                                            <InputLabel htmlFor="year" >Year release</InputLabel>
                                            <Input name='year' value={props.values.year} onChange={props.handleChange} id='year' />
                                        </FormControl>
                                        <FormControl className={styles.inputContainer}>
                                            <InputLabel htmlFor="vote_average">Rating</InputLabel>
                                            <Input id='vote_average' value={props.values.vote_average} onChange={props.handleChange} name='vote_average' />
                                        </FormControl>
                                        <FormControl className={styles.switchContainer}>
                                            <FormControlLabel
                                                label='By ascending'
                                                control={<Switch
                                                    checked={props.values.asc}
                                                    id='asc'
                                                    name='asc'
                                                    onChange={props.handleChange}
                                                />
                                                }
                                            />
                                        </FormControl>
                                    </div>
                                    <FormControl >
                                        <Typography color='textSecondary' className={styles.genresHeader} variant='h6' >
                                            Genres
                                        </Typography>
                                        <div className={styles.genres}>
                                            {
                                                genres.map(g => <FormControlLabel key={g['id']} className={styles.checkboxContainer}
                                                    control={
                                                        <Checkbox type="checkbox" name='with_genres' value={g['id']} />
                                                    }
                                                    label={g['name']}
                                                />)
                                            }
                                        </div>
                                    </FormControl>
                                    <DialogActions>
                                        <Button onClick={handleClose} color="primary">
                                            Cancel
                                        </Button>
                                        <Button type='submit' color="primary">
                                            Ok
                                        </Button>
                                    </DialogActions>
                                </Form>
                            )}
                        </Formik>

                    </DialogContent>
            }


        </Dialog>
    </>
}


export default SearchFilter
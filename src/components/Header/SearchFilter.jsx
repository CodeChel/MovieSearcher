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

const sleep = ms => new Promise(r => setTimeout(r, ms));


const SearchFilter = ({ genresIsFetch, getGenres, genres }) => {
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
                            initialValues={{ filterSearch: 'popular', rating: '', yearRelease: '', byAscending: false, genres: [] }}

                            onSubmit={async values => {
                                
                                alert(JSON.stringify(values, null, 2))
                                handleClose(true)
                            }}
                        >
                            {(props) => (
                                <Form className={styles.form}>
                                    <div className={styles.containerInputs}>
                                        <FormControl className={styles.formControl}>
                                            <InputLabel id='filterSearch' >Sort by</InputLabel>
                                            <Select
                                                name='filterSearch'
                                                onChange={props.handleChange}
                                                value={props.values.filterSearch}
                                            >
                                                <MenuItem value={'popular'}>Popular</MenuItem>
                                                <MenuItem value={'rating'}>Rating</MenuItem>
                                                <MenuItem value={'release'}>Release date</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <FormControl className={styles.inputContainer}>
                                            <InputLabel htmlFor="yearRelease" >Year release</InputLabel>
                                            <Input name='yearRelease' value={props.values.yearRelease} onChange={props.handleChange} id='yearRelease' />
                                        </FormControl>
                                        <FormControl className={styles.inputContainer}>
                                            <InputLabel htmlFor="rating">Rating</InputLabel>
                                            <Input id='rating' value={props.values.rating} onChange={props.handleChange} name='rating' />
                                        </FormControl>
                                        <FormControl className={styles.switchContainer}>
                                            <FormControlLabel
                                                label='By ascending'
                                                control={<Switch
                                                    checked={props.values.byAscending}
                                                    id='byAscending'
                                                    name='byAscending'
                                                    onChange={props.handleChange}
                                                />
                                                }
                                            />
                                        </FormControl>
                                    </div>
                                    <FormControl >
                                        <Typography color={'textSecondary'} className={styles.genresHeader} variant='h6' >
                                            Genres
                                        </Typography>
                                        <div className={styles.genres}>
                                            {
                                                genres.map(g => <FormControlLabel key={g['id']} className={styles.checkboxContainer}
                                                    control={
                                                        <Checkbox type="checkbox" name='genres' value={g['id']} />
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
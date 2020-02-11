import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import styles from './SearchFilter.module.scss'
import { Button, Checkbox, FormControlLabel, Typography, Switch } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Input from '@material-ui/core/Input'
import Preloader from '../common/Preloader'
import { useFormik } from 'formik'

const SearchFilter = ({ genresIsFetch, getGenres, genres }) => {
    const [open, setOpen] = React.useState(false)
    const [asc, setAsc] = React.useState(false)

    

    React.useEffect(() => {
        open && getGenres()
    }, [open, getGenres])

    const formik = useFormik({
        initialValues: {
            filterSearch: 'popular',
            yearRelease: '',
            rating: '',
            

        },
        onSubmit: values => {
          alert(JSON.stringify(values, null, 2));
        },
      });

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }
    const handleSwitch = (e) => {
        setAsc(e.target.checked)
    }
    const handleCheckbox = (e) =>{
        
    }
    return <>
        <Button onClick={handleOpen} variant="contained" size="small" color='secondary' className={styles.chooseBtn}>Choose movie</Button>

        <Dialog onBackdropClick={handleClose} maxWidth='md' fullWidth className={styles.dialog} disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
            <DialogTitle className={styles.dialogTitle}>Set search options</DialogTitle>
            {
                genresIsFetch
                    ? <Preloader />
                    : <DialogContent>
                        <form className={styles.form}>
                            <div className={styles.containerInputs}>
                                <FormControl className={styles.formControl}>
                                    <InputLabel htmlFor="filterSearch">Sort by</InputLabel>
                                    <Select
                                        className={styles.select}
                                        autoWidth={true}
                                        native
                                        input={<Input id="filterSearch" />}
                                    >
                                        <option value={'popular'}>Popular</option>
                                        <option value={'average vote'}>Rating</option>
                                        <option value={'release'}>Release date</option>
                                    </Select>
                                </FormControl>
                                <FormControl className={styles.inputContainer}>
                                    <InputLabel htmlFor="yearRelease">Year release</InputLabel>
                                    <Input id='yearRelease' />
                                </FormControl>
                                <FormControl className={styles.inputContainer}>
                                    <InputLabel htmlFor="rating">Rating</InputLabel>
                                    <Input id='rating' />
                                </FormControl>
                                <FormControl className={styles.switchContainer}>
                                    <label htmlFor="by ascending">By ascending</label>
                                    <Switch
                                        checked={asc}
                                        onChange={handleSwitch}
                                        value={'asc'}
                                        label='By ascending'
                                        id='by ascending'
                                    />
                                </FormControl>


                            </div>
                            <FormControl >
                                <Typography color={'textSecondary'} className={styles.genresHeader} variant='h6' >
                                    Genres
                                </Typography>
                                <div className={styles.genres}>
                                    {
                                        genres.map(g => <FormControlLabel className={styles.checkboxContainer}
                                            control={
                                                <Checkbox onClick={handleCheckbox} value={g['id']} />
                                            }
                                            label={g['name']}
                                        />)
                                    }
                                </div>
                            </FormControl>
                        </form>
                    </DialogContent>
            }

            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
          </Button>
                <Button onClick={handleClose} color="primary">
                    Ok
          </Button>
            </DialogActions>
        </Dialog>
    </>
}


export default SearchFilter
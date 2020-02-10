import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import styles from './SearchFilter.module.scss'
import { Button, Checkbox, FormControlLabel, Typography } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Input from '@material-ui/core/Input'
import Preloader from '../common/Preloader'

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
                        <form className={styles.form}>
                            <FormControl className={styles.formControl}>
                                <InputLabel htmlFor="demo-dialog-native">Sort by</InputLabel>
                                <Select
                                    className={styles.select}
                                    autoWidth={true}
                                    native
                                    input={<Input id="demo-dialog-native" />}
                                >
                                    <option  value={'popular'}>Popular</option>
                                    <option  value={'average vote'}>Rating</option>
                                    <option  value={'release'}>Release date</option>
                                </Select>
                            </FormControl>
                            <FormControl >
                                <Typography  variant='p' className={styles.genres}>
                                    Genres: 
                                </Typography>
                                
                                <div className={styles.genres}>
                                    {
                                        genres.map(g => <FormControlLabel className={styles.checkboxContainer}
                                            control={
                                                <Checkbox value={g['id']} />
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
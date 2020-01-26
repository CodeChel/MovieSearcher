
import React, { useState } from 'react'

import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import styles from './Search.module.scss'





const Search = () => {
    const [searchWord, setSWord] = useState('')

    return <div className={styles.search}>
        <div className={styles.searchIcon}>
            <SearchIcon />
        </div>
        <InputBase
            placeholder="Search…"
            classes={{
                root: styles.inputRoot,
                input: styles.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
            value={searchWord}
            onChange={(e)=>setSWord(e.currentTarget.value)}
        />
    </div>
}
export default Search

import React, { useState } from 'react'

import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import styles from './Search.module.scss'
import { DebounceInput } from 'react-debounce-input'
import ClearIcon from '@material-ui/icons/Clear'



const Search = ({ setSearchWord }) => {
    const [searchWord, setSWord] = useState('')
    const searchHandler = (word) => {
        setSWord(word)
        setSearchWord(word)
    }

    return <div className={styles.search}>
        <div className={styles.searchIcon}>
            <SearchIcon />
        </div>
        <InputBase
            inputComponent={DebounceInput}
            placeholder="Search…"
            classes={{
                root: styles.inputRoot,
                input: styles.inputInput,
            }}

            inputProps={{ 'aria-label': 'search', 'debounceTimeout': 200, 'minLength': 1 }}
            value={searchWord}
            onChange={(e) => searchHandler(e.target.value)}
        />
        {searchWord.length > 0
            && <div className={styles.clear} onMouseDown ={() => searchHandler('')}>
                <ClearIcon /> 
              </div>}
        </div>
}
export default Search
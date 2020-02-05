
import React from 'react'
import googleIcon from '../../assets/img/google.svg'
import styles from './Login.module.scss'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

const Login = ({ user, loginWithGoogle, logoutUser }) => {

    const [anchorEl, setAnchorEl] = React.useState(null)

    const handleClick = e => {
        setAnchorEl(e.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleCloseLogout = () => {

        logoutUser()
        setAnchorEl(null);
    }

    return <div className={styles.loginContainer}>
        {user
            ? <div>
                <img
                    role='button'
                    alt='avatar'
                    src={user.photoURL}
                    className={styles.avatar}
                    height='100%'
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                />
                <Menu 
                    style={{top: '45px'}}
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>Favorites</MenuItem>
                    <MenuItem onClick={handleCloseLogout}>Logout</MenuItem>
                </Menu>
            </div>
            : <img
                onClick={loginWithGoogle}
                src={googleIcon}
                alt="Log in with Google"
                className={styles.logo}
            />
        }
    </div>

}

export default Login
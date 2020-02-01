
import React from 'react'
import googleIcon from '../../assets/img/google.svg'
import { Button } from '@material-ui/core'


const Login = ({user, loginWithGoogle, logoutUser }) => {
    return (user
        ? <Button onClick={logoutUser}>Logout </Button>
        : <img 
            onClick={loginWithGoogle} 
            src={googleIcon}
            alt="Log in with Google"
          />
    )

}

export default Login
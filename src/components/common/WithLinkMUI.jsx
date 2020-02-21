import React from 'react'
import LinkMUI from '@material-ui/core/Link'
import { Link } from 'react-router-dom'



const WithLinkMUI = ({children, ...props}) => {
    return < LinkMUI component={Link} {...props}>{children}</LinkMUI >
}



export default WithLinkMUI
import React from 'react'
import { Card, CardActions, CardMedia, CardContent, Typography, Button } from '@material-ui/core'
import  useStyles from './styles'

const CartItem = ({item, removeItem, updateItem})=> {

const classes =  useStyles();
    return (
        <Card>
            <CardMedia image={item.media.source} alt="media_image" className={classes.media}/>
                
            <CardContent className={classes.cardContent}>
            <Typography variant="h4">{item.name}</Typography>
            <Typography variant="h5">{item.line_total.formatted_with_symbol}</Typography>
            </CardContent>

            <CardActions className={classes.CardActions}>
            <div className={classes.buttons}>
                <Button type="button" size="small" onClick={()=> updateItem(item.id, item.quantity - 1)}> - </Button>
                <Typography>{item.quantity}</Typography>
                <Button type="button" size="small" onClick={()=> updateItem(item.id, item.quantity + 1)}> + </Button>
            </div>
            <Button type="button" variant="contained" color="primary" onClick={()=> removeItem(item.id)}>Remove</Button>
            </CardActions> 
        </Card> 
    )
}

export default CartItem;
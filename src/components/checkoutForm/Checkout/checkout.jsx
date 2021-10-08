import React, {useEffect} from 'react';
import { Typography, Paper, Stepper, StepLabel, Step, Button } from '@material-ui/core';
import { commerce } from '../../../components/lib/commerce'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'
import useStyles from './styles'
import {Link} from 'react-router-dom';


const steps = ['Shipping Address', 'Payment Details']

const Checkout = ({cart , refresh})=> {
    const classes = useStyles();
    const[activeStep, setActiveStep] = React.useState(0);
    const[shippingData, setShippingData] = React.useState({});
    const[checkoutToken, setCheckoutToken] = React.useState(null);


    useEffect(() => {
        const generateToken = async ()=> {
            try{
                const token  = await commerce.checkout.generateToken(cart.id , {type: "cart"});
                setCheckoutToken(token);
            } catch(error) {
                    console.log(error);
            }
        }
        generateToken()  
    }, [cart]);

    const nextStep = ()=> setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = ()=> setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const proceed = (data) => {
        setShippingData(data);
        nextStep();
    }


    const ConfirmationForm = () => (
        <>
        <Typography>Thank you for choosing aguaplanta.</Typography>
        <Button component={Link} to="/">Go Home</Button>
       </>
    ) 

    const Form = () => activeStep === 0
     ? <AddressForm checkoutToken={checkoutToken} proceed={proceed} />
     : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} cart={cart} refresh={refresh} nextstep={nextStep} backstep={backStep}/>
    
    return (
        <div className={classes.toolbar}>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography> Checkout Form </Typography>
                        <Stepper activeStep={activeStep} className={classes.stepper}>
                            {
                                steps.map((step)=><Step key={step}>
                                    <StepLabel>{step}</StepLabel>
                                </Step>)
                            }
                        </Stepper>
                         
                    {activeStep === steps.length ? <ConfirmationForm/> : checkoutToken && <Form/>}
                </Paper>
            </main>
        </div>
    )
}

export default Checkout;
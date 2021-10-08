import React, {useState, useEffect} from "react";
import {
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Button,
  Typography,
} from "@material-ui/core";
import {Link} from 'react-router-dom'
import { useForm, FormProvider } from "react-hook-form";
import { commerce } from  '../../components/lib/commerce';
import FormInput from "./FormInput";

const AddressForm = ({checkoutToken, proceed}) => {
const [shippingCountries, setShippingCountries] = useState([]);
const [shippingCountry, setShippingCountry] = useState("");
const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
const [shippingSubdivision, setShippingSubdivision] = useState("");
const [shippingOptions, setShippingOptions] = useState([]);
const [shippingOption, setShippingOption] = useState("");

  const methods = useForm();
  
  const countries = Object.entries(shippingCountries).map(([code, name])=>({id:code, label: name}));
  const subdivisions = Object.entries(shippingSubdivisions).map(([code, name])=>({id:code, label: name}));
  const options = shippingOptions.map((sO)=>({ id:sO.id , label: `${sO.description} - (${sO.price.formatted_with_symbol})` }))
  const fetchShippingCountries = async(checkoutTokenId)=>{
      const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId);
      setShippingCountries(countries);
      setShippingCountry(Object.keys(countries)[0])
      
  }

   const fetchShippingSubdivisions = async(countryCode)=>{
     const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode);
     setShippingSubdivisions(subdivisions)
     setShippingSubdivision(Object.keys(subdivisions)[0])
   }

   const fetchShippingOptions = async(checkoutTokenId, country, region = null)=>{
    const options = await commerce.checkout.getShippingOptions(checkoutTokenId , {country, region});
    setShippingOptions(options)
    setShippingOption(options[0].id)
  }

  useEffect(()=> {
    fetchShippingCountries(checkoutToken.id)
  }, // eslint-disable-next-line
  []);

  useEffect(()=> {
   if(shippingCountry) fetchShippingSubdivisions(shippingCountry)
  }, [shippingCountry]);

  useEffect(()=> {
    if(shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
   }, //  eslint-disable-next-line
   [shippingSubdivision ] 
   );

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data)=> proceed({...data, shippingCountry, shippingSubdivision, shippingOption}))}>
          <Grid container spacing={3}>
            <FormInput required name="firstname" label="First Name" />
            <FormInput required name="lastname" label="Last Name" />
            <FormInput required name="address1" label="Address" />
            <FormInput required name="email" label="Email" />
            <FormInput required name="city" label="City" />
            <FormInput required name="zipcode" label="ZIP / Postal Code" />
             <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Address</InputLabel>
              <Select value={shippingCountry} fullWidth onChange={(e)=>setShippingCountry(e.target.value)}>
              {countries.map((country)=> 
              (<MenuItem key={country.id} value={country.id}>
                {country.label}
              </MenuItem>))}
              </Select>
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Address</InputLabel>
              <Select value={shippingSubdivision} fullWidth onChange={(e)=>setShippingSubdivision(e.target.value)}>
              {subdivisions.map((subdivision)=> 
              (<MenuItem key={subdivision.id} value={subdivision.id}>
                {subdivision.label}
              </MenuItem>))}
              </Select>
            </Grid>

           <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Address</InputLabel>
              <Select value={shippingOption} fullWidth onChange={(e)=>shippingOptions(e.target.value)}>
             {options.map((option)=> 
              (<MenuItem key={option.id} value={option.id}>
                {option.label}
              </MenuItem>))}
              </Select>
            </Grid> 
          </Grid>
          <br/>
          <div style={{display:"flex" , justifyContent:"space-between"}}>
          <Button component={Link} to="/cart" variant="outlined" color="secondary">Back</Button>
          <Button type="submit" variant="contained" color="primary">Proceed</Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};
export default AddressForm;

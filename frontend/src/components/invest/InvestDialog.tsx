
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import "../button/Button.css";
import Autocomplete from '@mui/material/Autocomplete';
import { useState, useEffect } from "react";
import getSymbolDetails from '../financial-instruments/asset-util';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import validateInput, { createInvestment } from './invest-dialog-util';
import Alert from '@mui/material/Alert';
import { InvestmentData, createData } from '../summary/investments-util';

const url = "http://localhost:8080/api/v1/symbols";

const comboBoxSx = () => {
    return {
        justifContent: 'space-between',
        width: 250,
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#979797',
          },
          '&:hover fieldset': {
            borderColor: '#979797',
          },
          '& .Mui-focused fieldset': {
            borderColor: '#979797',
          },
        },
        '& .MuiFormLabel-root': {
          color: 'white',
        },
        '& .MuiInputBase-input': {
            color: 'white',
        }
    }
}


const InvestDialog = ({addRecordToUserInvestments}: {addRecordToUserInvestments: (data: InvestmentData) => void}) =>  {
    const [open, setOpen] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const [symbol, setSymbol] = useState<string>('');
    const [currency, setCurrency] = useState<string>('');
    const [volume, setVolume] = useState<number>(0);
    const [openPrice, setOpenPrice] = useState(0);
    const [marketPrice, setMarketPrice] = useState(0);
    const [availableSymbols, setAvailableSymbols] = useState([]);
    const [currencies, setCurrencies] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const response = await getSymbolDetails(url, "");
            setAvailableSymbols(response.map((row: any) => row.yahooSymbol));
            const currencies = await getSymbolDetails("http://localhost:8080/api/v1/currency", "");
            setCurrencies(currencies.map((currency: any) => currency.currencyName));
        }
        fetch();
    }, [])

    const handleSymbolChange = (_event: any, value: any) => {
        setSymbol(value as string);
    }
    const handleCurrencyChange = (event: SelectChangeEvent) => {
        setCurrency(event.target.value as string);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setShowAlert(false);
    };

    return (
    <React.Fragment>
        <Button variant="outlined" onClick={handleClickOpen} style={{backgroundColor: "#00ADB5", color: "white", outline: 'none'}}>
            Invest
        </Button>
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                style: {backgroundColor: "#222831", color: "white"}
            }}
        >
        <DialogTitle style={{fontWeight: 700}}>Invest in an asset</DialogTitle>
        {showAlert && 
        <Alert 
            severity="error"
            style={{
                backgroundColor: '#222831',
                color: 'red'
            }}>{alertMessage}</Alert>}
        <DialogContent>
            <DialogContentText style={{color: "white", fontSize: 14}}>
                Select an asset from the list below, specify open price and volume of your investment.
            </DialogContentText>
            <br/>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Autocomplete
                    disablePortal
                    id="combo-box-invest"
                    options={availableSymbols}
                    sx={comboBoxSx()}
                    renderInput={(params) => <TextField {...params} label="Symbol"/>}
                    onChange={(event, value) => {handleSymbolChange(event, value)}}
                />
                <FormControl sx={comboBoxSx()}>
                    <InputLabel id="select-currency-autowidth-label">Currency</InputLabel>
                    <Select
                        labelId="select-currency-autowidth-label"
                        id="select-currency-autowidth"
                        value={currency}
                        onChange={handleCurrencyChange}
                        autoWidth
                        label="Currency"
                    >
                        {currencies.map((curr: any) => <MenuItem key={curr} value={curr}>{curr}</MenuItem>)}
                    </Select>
                </FormControl>
            </div>
            <br/>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <TextField
                    type="number"
                    id="volume-input"
                    label="Volume"
                    variant="outlined"
                    sx={comboBoxSx()}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setVolume(parseFloat(event.target.value));
                    }}
                />
                <TextField
                    type="number"
                    id="open-price-input"
                    label="Open price"
                    variant="outlined"
                    sx={comboBoxSx()}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setOpenPrice(Number(event.target.value));
                    }}
                />
            </div>
            <br/>
            <TextField
                    type="number"
                    id="market-price-input"
                    label="Market price"
                    variant="outlined"
                    sx={comboBoxSx()}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setMarketPrice(Number(event.target.value));
                    }}
                />
            
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} style={{color: "white"}}>Cancel</Button>
            <Button
            style={{color: "white"}}
            onClick={
                () => {
                    const valid = validateInput(symbol, currency, volume, openPrice, marketPrice, availableSymbols, currencies);
                    if (valid != true) {
                        setAlertMessage("Cannot creat investment, invalid data!");
                        setShowAlert(true);
                        return
                    }
                    createInvestment(symbol, currency, volume, openPrice, marketPrice)
                        .then((result) => {
                            if (result === null) {
                                setAlertMessage("Invalid data, could not create investment!");
                                setShowAlert(true);
                            } else {
                                const newInvestment: InvestmentData = createData(
                                    result.id,
                                    result.yahooSymbol,
                                    result.volume,
                                    result.openPrice,
                                    result.marketPrice
                                );
                                addRecordToUserInvestments(newInvestment);
                                handleClose();
                            }
                        })
                        .catch((error) => {
                            setAlertMessage(error);
                            setShowAlert(true);
                        })
                }
            }
            >Invest</Button>
        </DialogActions>
        </Dialog>
    </React.Fragment>
    );
}

export default InvestDialog;

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import Alert from '@mui/material/Alert';


import { useState } from "react";
import { Close } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { createNewSymbol, validInput } from "./add-instrument-util";
import { Asset } from "../financial-instruments/Assets";

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

interface AddInstrumentProps {
    open: boolean;
    handleClose: () => void;
    appendAssets: (asset: Asset) => void;
    instrumentTypes: any[];
}

const AddInstrument: React.FC<AddInstrumentProps> = ({open, handleClose, appendAssets, instrumentTypes}) => {

    const [yahooSymbol, setYahooSymbol] = useState<string>('');
    const [instrumentType, setInstrumentType] = useState<string>('');
    const [alertMessage, setAlertMessage] = useState<string>('');
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [instrumentDescription, setInstrumentDescription] = useState<string>('');

    const changeSelectedType = (event: SelectChangeEvent) => {
        setInstrumentType(event.target.value as string)
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                style: {backgroundColor: "#222831", color: "white"}
            }}
        >
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}} id="etf-details-title-close-container">
                <DialogTitle style={{fontWeight: 700}}>
                    Add new financial instrument
                </DialogTitle>
                <div className="close-icon-wrapper" onClick={handleClose}>
                    <Close />
                </div>
            </div>
            {showAlert && 
                <Alert 
                    severity="error"
                    style={{
                        backgroundColor: '#222831',
                        color: 'red'
                    }}>{alertMessage}</Alert>}
            <DialogContent>
                <DialogContentText style={{color: "white"}}>
                    Specify valid symbol from <Link to="https://finance.yahoo.com/lookup">yahoo finance</Link> so the API will automatically fetch the data for given symbol.
                </DialogContentText>
                <br/>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TextField
                        type="text"
                        id="yahooSymbol-input"
                        label="Yahoo Symbol"
                        variant="outlined"
                        sx={comboBoxSx()}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setYahooSymbol(event.target.value)
                        }}
                    />
                    <FormControl sx={comboBoxSx()}>
                        <InputLabel id="select-instrument-type-autowidth-label">Instrument Type</InputLabel>
                        <Select
                            labelId="select-instrument-type-autowidth-label"
                            id="select-instrument-type-autowidth"
                            value={instrumentType}
                            onChange={changeSelectedType}
                            autoWidth
                            label="Instrument Type"
                        >
                            {instrumentTypes.map((type: any) => <MenuItem key={type.name} value={type.name}>{type.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                </div>
                <br/>
                    <TextField
                        type="text"
                        id="description-input"
                        label="Description"
                        variant="outlined"
                        sx={comboBoxSx()}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setInstrumentDescription(event.target.value)
                        }}
                        multiline
                        />
                <br/>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    style={{backgroundColor: 'rgb(0, 173, 181)'}}
                    onClick={() => {
                        const result = validInput(yahooSymbol, instrumentType, instrumentDescription);
                        if (result.status === false) {
                            setAlertMessage(result.message);
                            setShowAlert(true);
                            return;
                        }
                        createNewSymbol(yahooSymbol, instrumentDescription, instrumentType)
                        .then((result) => {
                                if (result === null) {
                                    setAlertMessage("Invalid data, could not create investment!");
                                    setShowAlert(true);
                                } else {
                                    const asset: Asset = {
                                        yahooSymbol: result.yahooSymbol,
                                        instrumentTypeName: result.instrumentTypeName,
                                        description: result.description
                                    };
                                    appendAssets(asset);
                                    handleClose();
                                }
                            })
                            .catch((error) => {
                                setAlertMessage(error);
                                setShowAlert(true);
                            })
                    }}
                >Add</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddInstrument;
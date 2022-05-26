import React, { useState, useEffect } from "react";
import './adminsite.css';
import FormHelperText from '@mui/material/FormHelperText';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom";

const packageToCreate = {};

// ez egy stílus változó, a lentebb létrehozott Modalunknak, melynek célja hogy a modalunk megjelenjen.
const style = {
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50vw',
    maxWidth: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const AdminSite = () => {

    // felhasznált useState-k
    const [open, setOpen] = useState(false);
    const [packages, setPackages] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [userid, setUserid] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [errorMsg, setErrorMsg] = useState('');
    const [errorhide, setErrorHide] = useState(false);
    const [modalhide, setModalHide] = useState(true);
    const [boxValue, setBoxValue] = useState('A');
    const [firstBox, setFirstBox] = useState("");

    // A dobozaink felvett értékei, label melyet a felületen látunk, hogy mit választ ki a felhasználó, és a hozzátársított érték
    const boxValues = [
        {
            label: 'A -> (S,M)',
            value: 'A',

        },
        {
            label: 'B -> (L,XL)',
            value: 'B',

        },
        {
            label: 'C -> (XXL)',
            value: 'C',

        },
    ];

    // két segédfüggvény, melynek célja, hogy a modalunkat rejtve tartsuk, majd megjelenítsük
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // onChange mellékfüggvények, célja hogy a fent létrehozott state-kbe bekerüljenek a felhasználó által az inputba megadott adatok
    const handlePackageChange = (e) => {
        e.preventDefault();
        setPackages(e.target.value);
    };
    const handleDateChange = (e) => {
        e.preventDefault();
        setDate(e.target.value);
    };
    const handleTimeChange = (e) => {
        e.preventDefault();
        setTime(e.target.value);
    };
    const handleUserChange = (e) => {
        e.preventDefault();
        setUserid(e.target.value);
    };
    const handlePasswordChange = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
    };
    const handleEmailChange = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    };

    // felhasznált useEffect, célja egy kisebb ellenőrzés, mely azt eredményezi, hogy a fentebb létrehozott state-eket ellenőrzi. A firstBox-unk egy üres state, míg a boxValue tartalmaz adatot, ha a firstBox-unk nem egyezik meg a boxValue-val akkor a packageToCreate box-ba beletesszük a boxValue-t (azaz az "A-t"). Azért került ki az AdminSite függvény-en kívül, hogy ne renderelje újra select változtatásnál.
    useEffect(() => {

        if (firstBox !== boxValue) {
            packageToCreate['box'] = boxValue;
        }
        setFirstBox(boxValue);

    }, [firstBox, boxValue]);

    // csomag submit függvényünk
    const submitPackage = async () => {
        await fetch(`http://localhost:8080/api/v1/packageapp/packages/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(packageToCreate),
        });
    };

    // szintén infó összegyűjtése, melyet összevetünk a backenddel
    const gatheringInfoAboutPackage = ({ target: { id, value, checked } }) => {
        const mapNameToProperty = {
            packageSize: 'size',
            packageDate: 'deliverDate',
            packageTime: 'deliverTime',
            packageUserid: 'userid',
            packagePassword: 'userpassword',
            packageEmail: 'useremail',
        };

        const property = mapNameToProperty[id];

        packageToCreate[property] = value === 'on' ? checked : value;

    };
    
    /* submit validáció -> itt gondoltam egy olyan ötletre, hogy egy email api segítségével, a userid és a password state-be mentett adatokat egy sablon email szöveggel el lehetne küldeni arra az email címre amit a futárunk megadott, és az ügyfél onnan tudná kinyerni a belépéshez szükséges adatokat:
    
    pl: 
    const sendMail = () => {
        *
            API eléréséhez szükséges adatok
                                                *

        const mailTemplate = {
            from: 'Package Delivery <packagedelivery@package.com>,
            to: '{email}',
            subject: 'Új csomagod érkezett',
            text: '
                Kedves Ügyfelünk!

                Csomagod átadásra került. A csomagot az alábbi adatok megadásával tudod átvenni:
                    Csomagazonosító: {userid}
                    Jelszó: {password}

                Üdvözlettel,
                Package Delivery
            '
        }
    }
    */
    const submitValidation = () => {
        const packageValue = packages;
        const dateValue = date;
        const timeValue = time;
        const userValue = userid;
        const passwordValue = password;
        const emailValue = email;

        if(packageValue.length === 0) {
            setErrorMsg("Mező kitöltése kötelező!");
            setErrorHide(true);
        } else if(dateValue.length === 0) {
            setErrorMsg("Mező kitöltése kötelező!");
            setErrorHide(true);
        } else if(timeValue.length === 0) {
            setErrorMsg("Mező kitöltése kötelező!");
            setErrorHide(true);
        } else if(userValue.length === 0) {
            setErrorMsg("Mező kitöltése kötelező!");
            setErrorHide(true);
        } else if(passwordValue.length === 0) {
            setErrorMsg("Mező kitöltése kötelező!");
            setErrorHide(true);
        } else if(emailValue.length === 0) {
            setErrorMsg("Mező kitöltése kötelező!");
            setErrorHide(true);
        } else {
            setErrorMsg("");
            setErrorHide(false);
            submitPackage();
            setModalHide(false);
        }
    }

    return (
            <div className="admin">

                <form onChange={gatheringInfoAboutPackage}>
                <h1>Csomag adatai: </h1>
                    <label>Csomag mérete: (S,M,L,XL,XXL)</label>
                    <input type="text" value={packages} onChange={handlePackageChange} id="packageSize" error={errorhide} />
                    <FormHelperText error={errorhide}>
                        {errorMsg}
                    </FormHelperText>
                    <label>Választott Box: </label>
                    <TextField
                    id="outlined-select-currency"
                    select
                    value={boxValue}
                    onChange={(e) => setBoxValue(e.target.value)}
                    style={{ width: '100%', maxWidth: '240px', marginTop: '10px' }}
                >
                    {boxValues.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                    </TextField>
                    <br />
                    <br />
                    <label>Átadás dátuma: </label>
                    <input type="date" value={date} onChange={handleDateChange} id="packageDate" error={errorhide} />
                    <FormHelperText error={errorhide}>
                        {errorMsg}
                    </FormHelperText>
                    <label>Ideje: </label>
                    <input type="time" value={time} onChange={handleTimeChange} id="packageTime" error={errorhide} />
                    <FormHelperText error={errorhide}>
                        {errorMsg}
                    </FormHelperText>
                    <h1>Ügyfél adatai: </h1>
                    <label>Azonosító: </label>
                    <input type="text" value={userid} onChange={handleUserChange} id="packageUserid" error={errorhide} />
                    <FormHelperText error={errorhide}>
                        {errorMsg}
                    </FormHelperText>
                    <label>Jelszó: </label>
                    <input type="text" value={password} onChange={handlePasswordChange} id="packagePassword" error={errorhide}/>
                    <FormHelperText error={errorhide}>
                        {errorMsg}
                    </FormHelperText>
                    <label>Email cím: </label>
                    <input type="email" value={email} onChange={handleEmailChange} id="packageEmail" error={errorhide}/>
                    <FormHelperText error={errorhide}>
                        {errorMsg}
                    </FormHelperText>
                    <button type="button" onClick={() => { submitValidation(); handleOpen(); }}>Jóváhagy</button>
                    <Modal
                    hidden={modalhide}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Csomag sikeresen átadva!
                        </Typography>
                        <iframe style={{ width: '100%' }} title="tick" src="https://embed.lottiefiles.com/animation/93824"></iframe>
                    </Box>
                </Modal>
                <Link className="link" style={{textDecoration: 'none', color: 'white', padding: 11}} to="/home">
                        Kilépés
                    </Link>
                </form>
            </div>
    )
}
export default AdminSite;
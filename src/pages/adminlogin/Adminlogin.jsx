import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './adminlogin.css';
import FormHelperText from '@mui/material/FormHelperText';

const adminCheck = {};

const AdminLogin = () => {

    // felhasznált useState-ek
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState('');
    const [errorhide, setErrorHide] = useState(false);
    const navigate = useNavigate();

    // login függvény, mely fetcheli a backendünkből az adott linken keresztül az endpointot, és a 'user', 'password'-öt amit alább eltárolunk a state-be, stringify-oljuk, majd a result-ot továbbadjuk a navigate-nek, ami továbbirányít minket az adminsite oldalra, és a state-be belerakjuk a result-ot, ami nem más mint a backendből érkező filterezett csomag.
    const login = () => {
        fetch(`http://localhost:8080/api/v1/packageapp/adminlogin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user, password}),
        })
        .then(res => res.json())
        .then(
            (result) => {
                navigate("/adminsite", {state: {result}});
            }
        )
    };

    // adatfeldolgozó függvény. célja hogy a formunkban az id-kat összevesse a backendben az objektumunk tulajdonságaival, így amikor elsubmit-eljük a formunk, az adatok helyesen, ugyanolyan formában kerülnek be a tömbbünkbe, ahogy az első objektum formája.
    const gatheringInfoAboutAdmin = ({ target: { id, value, checked } }) => {
        const mapNameToProperty = {
            adminId: 'username',
            adminPassword: 'password',
        };

        const property = mapNameToProperty[id];

        adminCheck[property] = value === 'on' ? checked : value;
    };

    // submit validáció. célja hogy megnézzük az inputok állapotát, és ha hibát találunk, jelezzük a felhasználó felé.
    const submitValidation = () => {
        const adminValue = user;
        const passwordValue = password;

        if(adminValue.length === 0) {
            setErrorMsg("Mező kitöltése kötelező!");
            setErrorHide(true);
        } else if(passwordValue.length === 0) {
            setErrorMsg("Mező kitöltése kötelező!");
            setErrorHide(true);
        } else if(adminValue !== "fonixcourier") {
            setErrorMsg("Hibás adatok!");
            setErrorHide(true);
        } else if(passwordValue !== "fonix0918") {
            setErrorMsg("Hibás adatok!");
            setErrorHide(true);
        } else {
            setErrorMsg("");
            setErrorHide(false);
        }
    }
    
    return (
            <div className="admin">
                <form onChange={gatheringInfoAboutAdmin}>
                <h1>Bejelentkezés: </h1>
                    <label>Felhasználónév: </label>
                    <input type="text" value={user} id="adminId" onChange={e => setUser(e.target.value)} error={errorhide} />
                    <FormHelperText error={errorhide}>
                        {errorMsg}
                    </FormHelperText>
                    <label>Jelszó: </label>
                    <input type="password" value={password} id="adminPassword" onChange={e => setPassword(e.target.value)} error={errorhide} />
                    <FormHelperText error={errorhide}>
                        {errorMsg}
                    </FormHelperText>
                    <button type="button" style={{padding: 10}} onClick={() => { submitValidation(); login();}}>Belépés</button>
                </form>
            </div>
    )
}
export default AdminLogin;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './userlogin.css';
import FormHelperText from '@mui/material/FormHelperText';

const userCheck = {};

const UserLogin = () => {

    // felhasznált useState-k
    const [data, setData] = useState([]);
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState('');
    const [errorhide, setErrorHide] = useState(false);
    const navigate = useNavigate();

    // login függvényünk mely fetcheli a backend endpointot a megadott linken keresztül, és továbbítja a resultba bekerült adatokat a usersite-ra ahol egy useLocation() függvénnyel később mappelünk az adatokon, majd kiiratjuk
    const login = () => {
        fetch(`http://localhost:8080/api/v1/packageapp/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user, password}),
        })
        .then(res => res.json())
        .then(
            (result) => {
                // itt szerettem volna a resultot elmenteni a state-embe
                setData(result);
                navigate("/usersite", {state: {result}});
            }
        )
    };

    // infógyűjtés, majd backenddel összevetés
    const gatheringInfoAboutPackage = ({ target: { id, value, checked } }) => {
        const mapNameToProperty = {
            userId: 'userid',
            userPassword: 'userpassword',
        };

        const property = mapNameToProperty[id];

        userCheck[property] = value === 'on' ? checked : value;
    };

    // submit validáció
    const submitValidation = () => {
        const userValue = user;
        const passwordValue = password;
        // valószínűleg ez a megoldás nem működik.. a célom az lett volna, amit az adminlogin-ba leírtam az input check-eknél, hogy itt már több csomagazonosítónk és jelszavunk van, szóval itt már kellenének a backendből az adatok. megpróbáltam fentebb a fetch résznél a resultot beletenni a setData-ba, és itt a data-n végezni egy map-et + már egy validációt, majd meghívni az if ágba, de nem nagyon tudtam működsére bírni...
        const datacheck = data.map(data => (data.userid === userValue && data.userpassword === passwordValue));

        if(userValue.length === 0) {
            setErrorMsg("Mező kitöltése kötelező!");
            setErrorHide(true);
        } else if(passwordValue.length === 0) {
            setErrorMsg("Mező kitöltése kötelező!");
            setErrorHide(true);
        } else if(!datacheck ) {
            setErrorMsg("Hibás adatok!");
            setErrorHide(true);
        } else {
            setErrorMsg("");
            setErrorHide(false);
        }
    }
    
    return (
            <div className="admin">
                <form onChange={gatheringInfoAboutPackage}>
                <h1>Csomag átvétel: </h1>
                    <label>Csomag azonosító: </label>
                    <input type="text" value={user} id="userId" onChange={e => setUser(e.target.value)} error={errorhide} />
                    <FormHelperText error={errorhide}>
                        {errorMsg}
                    </FormHelperText>
                    <label>Jelszó: </label>
                    <input type="password" value={password} id="userPassword" onChange={e => setPassword(e.target.value)} error={errorhide} />
                    <FormHelperText error={errorhide}>
                        {errorMsg}
                    </FormHelperText>
                    <button type="button" style={{padding: 10}} onClick={() => { submitValidation(); login();}}>Belépés</button>
                </form>
            </div>
    )
}
export default UserLogin;
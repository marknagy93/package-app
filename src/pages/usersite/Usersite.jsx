import React, { useState} from "react";
import './usersite.css';
import { useLocation } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

// modal stílus változója
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

const UserSite = () => {

    // a userloginnál említett useLocation() függvénye melyet egy locate változóba tárolunk
    const locate = useLocation();
    
    // felhasznált useState-k
    const [open, setOpen] = useState(false);
    const [modalhide, setModalHide] = useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const submitPackage = () => {
        setModalHide(false);
    }

    return (
            <div className="user">
                <h1>Csomag adatai: </h1>
                {
                    // a locate változóba mentett userlogin-ról fetchelt majd továbbított adatok, melyeken egy map metódussal egy data-val végigmegyünk, majd egyesével meghívjük a backendből az adatokat (pl: data.id -> a backendben tárolt csomag azonosítója)
                    locate.state.result.map(data => (
                        <div className="datas">
                            <p>Azonosítója: {data.id}</p>
                            <p>Mérete: {data.size}</p>
                            <p>Box: {data.box}</p>
                            <p>Átadása: {data.deliverDate}</p>
                            <p>Ideje: {data.deliverTime}</p>
                            <p>Felhasználó azonosító: {data.userid}</p>
                            <p>Jelszó: {data.userpassword}</p>
                            <p>Email: {data.useremail}</p>
                        </div>
                    ))
                }
                <button type="button" className="link" style={{color: 'white'}} onClick={() => { submitPackage(); handleOpen(); }}>Jóváhagy</button>
                    <Modal
                    hidden={modalhide}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Csomag sikeresen átvéve!
                        </Typography>
                        <iframe style={{ width: '100%' }} title="tick" src="https://embed.lottiefiles.com/animation/93824"></iframe>
                    </Box>
                </Modal>
                <Link className="link" style={{textDecoration: 'none', color: 'white', margin: 5}} to="/home">
                        Kilépés
                    </Link>
            </div>
    )
}
export default UserSite;
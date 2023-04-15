import { CardActions, IconButton } from "@mui/material";
import DogCard from "../DogCard/DogCard";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Favorite, HeartBroken } from "@mui/icons-material";
import "../../styles/general.css"

function createDogName() {
    const characters = 'abcdefghijklmnñopqrstuvwxyz';
    const n = characters.length;
    let result = "";
    for (let i = 0; i < 6; i++) {
        const index = parseInt(Math.random() * (n - 1));
        result += characters.charAt(index);
    }
    return result.charAt(0).toUpperCase() + result.slice(1).toLowerCase();
}

function DogGrid() {
    const [disableButton, setDisableButton] = useState(true)
    const [dogName, setDogName] = useState();
    const [dogUrl, setDogUrl] = useState();
    const [rejectedDogs, setRejectedDogs] = useState([]);
    const [approvedDogs, setApprovedDogs] = useState([]);
    const imageLoaded = useRef(false);

    const createDog = () => {
        setDogUrl(undefined);
        setDisableButton(true)
        axios("https://dog.ceo/api/breeds/image/random").then(res => {
            setDogUrl(res.data.message);
            setDisableButton(false);
        }, error => {
            console.error(error);
        });
        setDogName(createDogName());
    }

    useEffect(() => {
        if (imageLoaded.current) {
            return;
        }
        createDog();
        imageLoaded.current = true;
    }, [])

    const rejectDog = () => {
        // console.log("POR ESO, RECHAZO!");
        rejectedDogs.unshift({
            name: dogName,
            url: dogUrl
        });
        createDog();
    }

    const approveDog = () => {
        // console.log("aprobando el perritou");
        approvedDogs.unshift({
            name: dogName,
            url: dogUrl
        });
        createDog();
    }

    const undoLike = (i) => {
        const dog = approvedDogs[i];
        // console.log("Perro a borrar", dog);
        // console.log("Lista: ", approvedDogs);
        approvedDogs.splice(i, 1);
        // console.log("despues de borrar", approvedDogs);
        setRejectedDogs([dog, ...rejectedDogs])
    }

    const undoDislike = (i) => {
        const dog = rejectedDogs[i];
        rejectedDogs.splice(i, 1);
        setApprovedDogs([dog, ...approvedDogs])
    }

    return (
        <div className="container">
            <div className="container-list">
                <h1>Rechazados</h1>
                {rejectedDogs.map((dog, i) => {
                    return (
                            <div>
                                <DogCard key={"rejected_" + i} name={dog.name} url={dog.url} undoFunc={() => undoDislike(i)}></DogCard>
                            </div>
                    )
                })}
                {/* {console.log(dogName)} */}
            </div>
            <div className="container-list">
                <h1>Candidato</h1>
                <DogCard key={dogUrl} name={dogName} url={dogUrl}></DogCard>
                <CardActions className="container-reaction-icons">
                    <IconButton className="heartbroken-icon" disabled={disableButton} onClick={rejectDog}>
                        <HeartBroken />
                    </IconButton>
                    <IconButton className="favorite-icon" disabled={disableButton} onClick={approveDog}>
                        <Favorite />
                    </IconButton>
                </CardActions>
            </div>
            <div className="container-list">
                <h1>Aceptados</h1>
                {approvedDogs.map((dog, i) => {
                    return (
                        <div>
                            <DogCard key={"liked_" + i} name={dog.name} url={dog.url} undoFunc={() => undoLike(i)}></DogCard>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default DogGrid;
import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

const ClubsContext = createContext(null); 

export const ClubsProvider = ({children}) => {
    const [clubs, setClubs] = useState(''); 
    const [clubIds, setClubIds] = useState(''); 

    useEffect(() => {
        fetchClubs()
    }, [])

    useEffect(() => {
        fetchClubIds()
    }, [])

    async function fetchClubs() {
        try {
            const response = await axios.get("http://localhost:8080/clubs")
            setClubs(response.data)
        }
        catch (err) {
            if(err.response) {
                console.log('Something is wrong with the server: ' + err.response.data)
            }
            else if(err.request) {
                console.log('Something is wrong with the client')
            }
            else {
                console.log(err)
            }
        }
    }

    async function fetchClubIds() {
        try {
            const response = await axios.get("http://localhost:8080/user-clubs")
            const clubIds = response.data.map((club) => club.clubId) // we are using 'map' because we want to get an ARRAY of club ids
            setClubIds(clubIds)
        }
        catch (err) {
            if(err.response) {
                console.log('Something is wrong with the server: ' + err.response.data)
            }
            else if(err.request) {
                console.log('Something is wrong with the client')
            }
            else {
                console.log(err)
            }
        }
    }    

    return <ClubsContext.Provider value={{clubs, fetchClubs, clubIds, fetchClubIds}}>{children}</ClubsContext.Provider>
}

export const useClubs = () => {
    return useContext(ClubsContext)
}
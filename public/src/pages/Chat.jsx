import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { allUserRoutes } from '../utils/APIRoutes';
import Contact from '../components/Contact';
import Welcome from '../components/Welcome';

const Chat = () => {

    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const navigate = useNavigate();
    const [currentChat, setCurrentChat] = useState(undefined);

    // useEffect(async () => {
    //     if (!localStorage.getItem('chat-app-user')) {
    //         navigate('/login');
    //     }else{
    //         setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
    //     }
    // }, [])
    useEffect(() => {
        const fetchData = async () => {
            if (!localStorage.getItem('chat-app-user')) {
                navigate('/login');
            } else {
                setCurrentUser(await JSON.parse(localStorage.getItem('chat-app-user')));
            }
        };

        fetchData();
    }, [navigate]);

    // useEffect(async () => {
    //     if(currentUser){
    //         if(currentUser.isAvatarImageSet){
    //             const data = await axios.get(`${allUserRoutes}/${currentUser._id}`);
    //             setContacts(data.data);
    //         }else{
    //             navigate("/setAvatar");
    //         }
    //     }
    // }, [])
    useEffect(() => {
        const fetchContacts = async () => {
            if (currentUser) {
                if (currentUser.isAvatarImageSet) {
                    try {
                        const data = await axios.get(`${allUserRoutes}/${currentUser._id}`);
                        setContacts(data.data);
                    } catch (error) {
                        console.error('Error fetching contacts:', error);
                    }
                } else {
                    navigate('/setAvatar');
                }
            }
        };

        fetchContacts();
    }, [currentUser, navigate]);

    const handleChatChange = (chat) => {
        setCurrentChat(chat);
    }

    return (
        <>
            <Container>
                <div className="container">
                    <Contact contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
                    <Welcome currentUser={currentUser} />
                </div>
            </Container>
        </>
    )
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #131324;
    .container {
        height: 85vh;
        width: 85vw;
        background-color: #00000076;
        display: grid;
        grid-template-columns: 25% 75%;
        @media screeen and (min-width: 720px) and (max-width: 1080px);
        grid-template-columns: 35% 65%;
    }
`;


export default Chat
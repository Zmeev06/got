import React from 'react';
import { Link } from 'react-router-dom';
import NewFolderIcon from "../../UI/icons/NewFolderIcon";

const NewFolderAction = () => {
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
      }

    const newFolder = () => {

        fetch('https://ziongpt.ai/api/v1/folder/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

                "Authorization": "Token " + getCookie('token'),
            }


        })
            .then(response => response.json())

        fetch('https://ziongpt.ai/api/v1/folder/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': 'csrftoken=TUeTRp5vrjwDPP4BjTjJVuq40EKFNnbG; sessionid=s1yyur1j74ab874vjxxmzo9zz9ia3r9v',
                "Authorization": "Token " + getCookie('token'),
            }

        })
            .then(response => response.json())
        setTimeout(() => {
            window.location.reload(false);
        }, 500)
    }

    return (


        <div onClick={() => newFolder()}>
            <NewFolderIcon />
        </div>

    );
};

export default NewFolderAction;
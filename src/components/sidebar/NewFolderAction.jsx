import React from 'react';
import { Link } from 'react-router-dom';
import NewFolderIcon from "../UI/icons/NewFolderIcon";

const NewFolderAction = () => {

    const newFolder = () => {

        fetch('http://mindl.in:8000/api/v1/folder/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

                "Authorization": "Token " + "4c358ff22441bed3c3c55b8e6b7a8ae46bbb1abc"
            }

        })
            .then(response => response.json())

        fetch('http://mindl.in:8000/api/v1/folder/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': 'csrftoken=TUeTRp5vrjwDPP4BjTjJVuq40EKFNnbG; sessionid=s1yyur1j74ab874vjxxmzo9zz9ia3r9v',
                "Authorization": "Token " + "4c358ff22441bed3c3c55b8e6b7a8ae46bbb1abc"
            }

        })
            .then(response => response.json())
        setTimeout(() => {
            window.location.reload(false);
        }, 500)
    }

    return (


        <div className='folder_sp' onClick={() => newFolder()}>
            <NewFolderIcon />
        </div>

    );
};

export default NewFolderAction;
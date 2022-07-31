import React from 'react';
import DeletePage from '../components/deleteBooking';
import DisplayTop from "./pageComponents/displayTop";

function DeleteBooking() {
    return (
        <DisplayTop>
        <DeletePage/>
        </DisplayTop>
    );
}

export default DeleteBooking;
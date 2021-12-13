import React from 'react';

function Footer() {
    const footerStyle={
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 0,
        fontSize: 12,
        backgroundColor: "#29ca8e",
        textAlign: "center",
        color: "white"
    }

    return(
        <div>
            <h4 style={footerStyle}>Made by Originals</h4>
        </div>
    );
}

export default Footer;
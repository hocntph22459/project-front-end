import React from 'react'
import GoogleLogin from 'react-google-login';
type Props = {}

const SigninGoogle = (props: Props) => {
    const responseGoogle = (response: any) => {
        console.log(response);
    };
    return (
        <GoogleLogin
            clientId="YOUR_CLIENT_ID"
            buttonText="Login with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />
    )
}

export default SigninGoogle
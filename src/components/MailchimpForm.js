import MailchimpSubscribe from "react-mailchimp-subscribe";
import { Newsletter } from "./Newsletter";

//This is the basic form and the Newsletter will be the wrapper around this 
export const MailchimpForm = () => {

    //constructing the link for the mailchimp service based on the env
    //const url = "//xxxx.us13.list-manage.com/subscribe/post?u=zefzefzef&id=fnfgn"; this is one example 
    //the env is defined ijn the .env file 
    const postUrl = `${process.env.REACT_APP_MAILCHIMP_URL}?u=${process.env.REACT_APP_MAILCHIMP_U}&id=${process.env.REACT_APP_MAILCHIMP_ID}`;

    //returning the form 
    return(
        <>  
            <MailchimpSubscribe
                url={postUrl}
                render={({subscribe, status, message})=> (
                    <Newsletter status={status} message={message} onValidated={formData => subscribe(formData)}/>
                )}
            />
        </>

    )
}


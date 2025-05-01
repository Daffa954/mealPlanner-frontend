export const UserView = () => {
    // load from session storage
    const token = sessionStorage.getItem('token');
    const email = sessionStorage.getItem('email');
    
    return(
        <div>
            <h1>User View</h1>
            <p>This is the user view page.</p>
            <p>{email}</p>
            <p>{token}</p>
        </div>
    )
}
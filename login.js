function redirectTo(provider) {
    let email;
    if (provider === 'email' || provider === 'signup') {
        // Prompt the user to enter their email
        email = prompt('Please enter your email:');
        if (!email) {
            // If the user cancels the prompt or leaves it blank, do not proceed
            return;
        }
    }

    // Define the URL to redirect based on the provider
    let redirectURL;
    switch (provider) {
        case 'facebook':
            redirectURL = 'index.html'; // Redirect to index.html for Facebook login
            break;
        case 'google':
            redirectURL = 'index.html'; // Redirect to index.html for Google login
            break;
        case 'apple':
            redirectURL = 'index.html'; // Redirect to index.html for Apple login
            break;
        case 'email':
            redirectURL = 'index.html'; // Redirect to index.html for Email login
            break;
        case 'signup':
            redirectURL = 'index.html'; // Redirect to index.html for Sign Up
            break;
        default:
            redirectURL = 'index.html'; // Default redirect to index.html
            break;
    }

    // Redirect the user to the specified URL
    window.location.href = redirectURL;
}


const my = {
    stitch:{
        client: null,
        db: null,
        account:{
            //👍 works
            register:(email, password, test) => {
                const emailPassClient = my.stitch.client.auth
                    .getProviderClient(stitch.UserPasswordAuthProviderClient.factory);
            
                if (!test) {
                    return emailPassClient.registerWithEmail(email, password);
                }
                emailPassClient.registerWithEmail(email, password)
                    .then(() => {
                        console.log("Successfully sent account confirmation email!");
                    })
                    .catch(err => {
                        console.log("Error registering new user:", err);
                    });
            },
            //👍 works
            confirmEmail:(token,tokenId, test) => { 
                // Confirm the user's email/password account
                const emailPassClient = my.stitch.client.auth
                    .getProviderClient(stitch.UserPasswordAuthProviderClient.factory);

                if (!test) {
                    return emailPassClient.confirmUser(token, tokenId);
                }
                emailPassClient.confirmUser(token, tokenId)
                    .then(() => {
                        console.log("Successfully confirmed email!");
                    })
                    .catch(err => {
                        console.log("Error confirming email:", err);
                    });
            },
            //👍 works
            signIn:(email, password, test) => {
                const credential = new stitch.UserPasswordCredential( email,password);

                if (!test) {
                    return my.stitch.client.auth.loginWithCredential(credential);
                }
                my.stitch.client.auth.loginWithCredential(credential)
                    .then(authedId => {
                        console.log(`successfully logged in with id: ${authedId}`)
                    })
                    .catch(err => console.error(`login failed with error: ${err}`))
            },
            //👍 works
            sendResetPasswordEmail:(email, test) => {
                const emailPassClient = my.stitch.client.auth
                    .getProviderClient(stitch.UserPasswordAuthProviderClient.factory);

                if (!test) {
                    return emailPassClient.sendResetPasswordEmail(email);
                }
                emailPassClient.sendResetPasswordEmail(email)
                    .then(() => {
                        console.log("Successfully sent password reset email!");
                    }).catch(err => {
                        console.log("Error sending password reset email:", err);
                    });
            },
            //👍 works
            resetPassword:(token,tokenId, newPassword, test) => {
                const emailPassClient = my.stitch.client.auth
                    .getProviderClient(stitch.UserPasswordAuthProviderClient.factory);

                if (!test) {
                    return emailPassClient.resetPassword(token, tokenId, newPassword);
                }
                emailPassClient.resetPassword(token, tokenId, newPassword)
                    .then(() => {
                        console.log("Successfully reset password!");
                    }).catch(err => {
                        console.log("Error resetting password:", err);
                    });
            },
            signOut:(test) => {
                
            }
        },
        util:{

        }
    },
    ui:{
        util: {
            parseQuery: () => {
                const qObject = {};
                let q = window.location.search;
                if(q.length<2)return qObject;
                q = q.slice(1);
                q = q.split('&');
                q = q.map((k) => k.split('='));
                q.forEach(kv => {
                    qObject[kv[0]] = kv[1];
                });
                return qObject;
            }
        }
    
    },
    vars: {

    }
}

my.stitch.client = stitch.Stitch.initializeDefaultAppClient("app0-vxpqk"); 
my.vars.query = my.ui.util.parseQuery();

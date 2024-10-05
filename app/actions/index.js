import { signIn , signOut} from "next-auth/react";


export async function Sociallogout() {
    await signOut({callbackUrl :"/Signin"});

}

export async function doCredentialLogin(credentials) {
  try {
    const response = await signIn('credentials', {
      email: credentials.email,
      password: credentials.password,
      role: credentials.role,  // Include role in the signIn call
      redirect: false,
    });

    if (response.error) {
      // Handle the error and return it properly
      return { error: response.error };
    }

    return response;
  } catch (error) {
    // Return error for the caller
    return { error: error.message || 'Login failed. Please try again.' };
  }
}



//Social login methods for students 
export async function Socialloginstudent(formdata) {

  const action = formdata.get('action');
  await signIn(action,  { callbackUrl: '/StudentForm' }); 

}

export async function Sociallogoutstudent() {
  await signOut({callbackUrl :"/"});

}





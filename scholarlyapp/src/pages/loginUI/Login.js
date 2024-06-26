import styles from './Login.module.css';

function Login () {
  


  const loginFunction = () => {
    const inputtedUsername = document.getElementById('logUsername').value;
    const inputtedPassword = document.getElementById('logPassword').value;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    const raw = JSON.stringify({
      "user_name": inputtedUsername,
      "password": inputtedPassword
    });
    
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    
    fetch("http://localhost:8000/api/users/login", requestOptions)
      .then((response) => response.status)
      .then((result) => {
        if(result === 200){
          localStorage.setItem("username",inputtedUsername);
        window.location.replace("/UploadPage");
        }
      })
      .catch((error) => console.error(error));
    
}
 
  return (
      <div className={styles.loginWrapper}>
        <div className={styles.loginBox}>
          {/* <img src={logo} alt="Logo" className={styles.loginImg}/> */}
          <p className={styles.loginTextTitle}>Scholarly</p>
          <div className={styles.loginTextContainer}>
            <p className={styles.loginText}>Login</p>
          </div>
          <div>
            <input type='text' className={styles.inputBox} placeholder='Username' id='logUsername'></input> <br></br>
            <input type='password' className={styles.inputBox} placeholder='Password' id='logPassword'></input>
          </div>
          <div>
            <button onClick={loginFunction} className={styles.loginButton}>Login</button>
          </div>
          <div>
            <p className={styles.registerText}>New User?</p>
            <a href="/Register" style={{color: 'inherit'}}>
              <p className={styles.registerButton}>Register</p>
            </a>
          </div>
        </div>
      </div>
    );
  };
  
  export default Login;
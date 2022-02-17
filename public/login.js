function Login(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');
  const ctx = React.useContext(UserContext);
  // console.log(ctx)

  
  // function logOut() {
  //   ctx.login = false;
  //   location.href = "/#/login/"
  // }

  // if(ctx.login == true){
    return (
      <Card
        bgcolor="info"
        header="Login"
        status={status}
        body={show ? 
          <LoginForm setShow={setShow} setStatus={setStatus}/> :
          <LoginMsg setShow={setShow} setStatus={setStatus}/>}
      />
    ) 
  // } else {
  //   return (
  //     <button onClick={logOut}>log out</button>
  //   )
  // }

  
}

function LoginMsg(props){

  function deposit() {
    location.href = "/#/deposit/"
  }

  return(<>
    <h5>Success! You're Logged In.</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={deposit}>
        Deposit Money
    </button>
  </>);
}

function LoginForm(props){
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const [data, setData] = React.useState('');
  const ctx = React.useContext(UserContext); 

  function handleData(){
    console.log(email,password);
    const url = '/account/all';
    (async () => {
      var res = await fetch(url);
      var fetchedData = await res.json();
      console.log(fetchedData);
      setData(fetchedData);
      console.log(data);
      fetchedData.forEach(function(user){
        // console.log(user)    
        
        if (email == user.email && password == user.password) {
          console.log('we did it!')
          console.log(ctx)
          props.setShow(false);
          // setting the user here, to persist across screens
          ctx.user = user
          ctx.login = true
          console.log(ctx.users)
          return;
        }
      });

      // if(login == false){
      //   error = true
      // }

    })();
    
  }

  
    return (<>

      Email<br/>
      <input type="input" 
        className="form-control" 
        placeholder="Enter email" 
        value={email} 
        onChange={e => setEmail(e.currentTarget.value)}/><br/>
  
      Password<br/>
      <input type="password" 
        className="form-control" 
        placeholder="Enter password" 
        value={password} 
        onChange={e => setPassword(e.currentTarget.value)}/><br/>
  
      <button type="submit" className="btn btn-light" onClick={handleData}>Login</button>
     
    </>);
  

  
}
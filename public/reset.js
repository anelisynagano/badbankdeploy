function Reset(){
    const [show, setShow]     = React.useState(true);
    const [status, setStatus] = React.useState('');
    const ctx = React.useContext(UserContext);
    console.log(ctx)
    
      return (
        <Card
          bgcolor="secondary"
          header="Reset Password"
          status={status}
          body={show ? 
            <ResetForm setShow={setShow} setStatus={setStatus}/> :
            <ResetMsg setShow={setShow} setStatus={setStatus}/>}
        />
      ) 
    
    
  }
  
  function ResetMsg(props){
    function logOut() {
        ctx.login = false;
        location.href = "/#/login/"
      }
    

    return(<>
      <h5>Reset your password successfully!</h5>
      <button onClick={logOut} >
        login
      </button>
    </>);
  }
  
  function ResetForm(props){
    const [email, setEmail]       = React.useState('');
    const [password, setPassword] = React.useState('');
    const [color, setColor] = React.useState('');
    
  
    function handleData(){
      console.log(email,color,password);


      const url = '/account/all';
      (async () => {
        var res = await fetch(url);
        var fetchedData = await res.json();
        console.log(fetchedData);
        fetchedData.forEach(function(user){   
          
          if (email == user.email) {
            console.log('user exists')

            if(user.color == color){
                console.log("second task")

                const url = `/account/reset/${user.email}/${user.password}`;
                (async () => {
                    var res = await fetch(url);
                    var data = await res.json();
                    console.log(data);
                })();
            }


            return;
          }
        });
  
      })();
      
    }
  
    
      return (<>
  
        Email<br/>
        <input type="input" 
          className="form-control" 
          placeholder="Enter email" 
          value={email} 
          onChange={e => setEmail(e.currentTarget.value)}/><br/>

        Secret Color<br/>
        <input type="input" 
          className="form-control" 
          placeholder="Enter color" 
          value={color} 
          onChange={e => setColor(e.currentTarget.value)}/><br/>             
    
        New Password<br/>
        <input type="password" 
          className="form-control" 
          placeholder="Enter password" 
          value={password} 
          onChange={e => setPassword(e.currentTarget.value)}/><br/>
    
        <button type="submit" className="btn btn-light" onClick={handleData}>Login</button>
       
      </>);
    
  
    
  }
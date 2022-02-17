function Balance(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  
  const ctx = React.useContext(UserContext);
  console.log(ctx)

  function logOut() {
    ctx.login = false;
    location.href = "/#/login/"
  }

  return (
    <div>

      <Card
        bgcolor="info"
        header="Balance"
        status={status}
        body={show ?
          <BalanceForm setShow={setShow} setStatus={setStatus}/> :
          <BalanceMsg setShow={setShow}/>}
      />

      <div>
      <button className="btn btn-light" onClick={logOut}>logout</button>
      </div>

      </div>
  )

}

function BalanceMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>
        Check balance again
    </button>
  </>);
}

function BalanceForm(props){
  const [email, setEmail]   = React.useState('');
  const [balance, setBalance] = React.useState('');  
  const ctx = React.useContext(UserContext);  

  function handle(){
    
    

    setBalance(ctx.user.balance);
    console.log(ctx.user);
    props.setStatus('Your balance is: ' + ctx.user.balance);      
    props.setShow(false);
  }

  if(ctx.login == true){
    return(<>
        
      <b>{ctx.user.balance}</b>
  
    </>);
  } else {
    return(<>

      <h2>Please login to continue</h2>
  
    </>);
  }

  
}
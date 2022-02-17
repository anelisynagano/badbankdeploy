function Withdraw(){
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
      header="Withdraw"
      status={status}
      body={show ? 
        <div><WithdrawForm setShow={setShow} setStatus={setStatus}/><br/><br/><button className="btn btn-light" onClick={logOut}>logout</button></div> :
        <WithdrawMsg setShow={setShow}/>}
    />

    </div>
  )
}

function WithdrawMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>
        Withdraw again
    </button>
  </>);
}

function WithdrawForm(props){
  // const [email, setEmail]   = React.useState('');
  const [amount, setAmount] = React.useState('');
  const ctx = React.useContext(UserContext);  
  var badAmount = false;

  function handle(){
    
    if(Number(amount) <= ctx.user.balance){
      ctx.user.balance = Number(ctx.user.balance) - Number(amount);
      console.log(ctx.user);
      props.setStatus('');      
      props.setShow(false);

      const activity = "You withdrew $" + amount
      ctx.user.activity.push(activity)

      const url = `/account/update/${ctx.user.email}/${ctx.user.balance}/${activity}`;
      (async () => {
        var res = await fetch(url);
        var data = await res.json();
        console.log(data);
      })();      
    }
    
    
  }

  

  if(ctx.login == true){
    return(<>
  
      Amount $<br/>
      <input type="input" 
        className="form-control" 
        placeholder="Enter dollar amount" 
        value={amount} 
        onChange={e => setAmount(e.currentTarget.value)}/><br/>
  
      <button type="submit" 
        className="btn btn-light" 
        onClick={handle}>
          Withdraw
      </button>
  
    </>);
  } else {
    return(<>

      <h2>Please login to continue</h2>
  
    </>);
  }


  
}

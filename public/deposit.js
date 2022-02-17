function Deposit(){
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
        header="Deposit"
        status={status}
        body={show ? 
          <div><DepositForm setShow={setShow} setStatus={setStatus}/><br/><br/><button className="btn btn-light" onClick={logOut}>logout</button></div> :
          <DepositMsg setShow={setShow}/>}
      />
      

    </div>
  )
}

function DepositMsg(props){
  return (<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>
        Deposit again
    </button>
  </>);
} 

function DepositForm(props){
  const [email, setEmail]   = React.useState('');
  const [amount, setAmount] = React.useState('');
  const ctx = React.useContext(UserContext);  

  console.log(ctx)

  function handle(){
    //console.log(email,amount);
    //const user = ctx.users.find((user) => user.email == email);
    //if (!user) {
    //  props.setStatus('fail!');
     // return;      
    //}
    //else {

      //const user = ctx.user
      console.log(ctx.user);
      props.setStatus('');      
      props.setShow(false);

      ctx.user.balance =  Number(ctx.user.balance) + Number(amount);

      console.log(email);
      
      const activity = "You deposited $" + amount
      ctx.user.activity.push(activity)

      const url = `/account/update/${ctx.user.email}/${ctx.user.balance}/${activity}`;
      (async () => {
        var res = await fetch(url);
        var data = await res.json();
        console.log(data);
      })();
    //}  
    
  }

  if(ctx.login == true){
    return(<>
        
      Amount $<br/>
      <input type="number" 
        className="form-control" 
        placeholder="Enter dollar amount" 
        value={amount} onChange={e => setAmount(e.currentTarget.value)}/><br/>
  
      <button type="submit" 
        className="btn btn-light" 
        onClick={handle}>Deposit</button>
  
    </>);
  } else {
    return(<>

      <h2>Please login to continue</h2>
  
    </>);
  }

  
}
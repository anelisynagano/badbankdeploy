function AllData(){
  const [data, setData] = React.useState('');
  const ctx = React.useContext(UserContext);
  
  console.log(ctx)

  function logOut() {
    ctx.login = false;
    location.href = "/#/login/"
  }

  
  if(ctx.login == true){
    return (

    <Card
    bgcolor="info"
    header="Transactions"
    body={<div><h5>All of {ctx.user.name}'s transactions</h5>
      
      <div>
        {ctx.user.activity.map(function(transaction, i) {
        
          return <p>{transaction}</p>
    
        })}
      </div>

      <div>
      <button className="btn btn-light" onClick={logOut}>logout</button>
      </div></div>}
    />);
  } else {
    return (<>
      <h5>Login to see transaction</h5>
      </>);
  }


}

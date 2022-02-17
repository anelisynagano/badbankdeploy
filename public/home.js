function Home(){
  return (
    <Card
      txtcolor="black"
      header="Kendall's Credit Union"
      title="Welcome to your new bank"
      text="Create an account or sign in to get started!"
      body={(<img src="bank.png" className="img-fluid" alt="Responsive image"/>)}
    />
  );  
}

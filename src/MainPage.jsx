export default function MainPage(props) {
  return (
    <div>
      {" "}
      <div className="card">
        <div className="card-row">
          <h3>Wallet Address:</h3>
          <p>
            {props.accountAddress.slice(0, 4)}...
            {props.accountAddress.slice(38, 42)}
          </p>
        </div>
        <div className="card-row">
          <h3>Wallet Balance:</h3>
          <p>{props.accountBalance}</p>
        </div>
      </div>
      <div>
        <p className="info">🎉 Connected Successfully</p>
        <button onClick={props.disconnectWallet}>Disconnect</button>
      </div>
    </div>
  );
}

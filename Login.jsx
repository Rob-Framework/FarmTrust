import robLogo from "../src/assets/Rob-logo.png";

export default function Login(props) {
  return (
    <div className="login-page">
      {" "}
      <div className="container">
        <div className="row d-flex">
          <div className="col d-flex align-items-center flex-column">
            <img alt="logo" className="robLogo mb-3" src={robLogo} />
            <p className="login-text">Login with Metamask</p>
            <button className="btn" onClick={props.connectWallet}>
              Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

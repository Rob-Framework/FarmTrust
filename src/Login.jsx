export default function Login(props) {
  return (
    <div> "Login with metamask"
    <button className="btn" onClick={props.connectWallet}>
      Connect
    </button>
    </div>
  );
}

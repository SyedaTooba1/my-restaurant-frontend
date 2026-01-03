import { useNavigate, useLocation } from "react-router-dom";

const VoiceButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const inCall = location.pathname === "/assistant";

  const handleClick = () => {
    if (inCall) {
      navigate(-1); // disconnect → go back
    } else {
      navigate("/assistant"); // call
    }
  };

  return (
    <button
      onClick={handleClick}
      style={{
        padding: "10px 18px",
        borderRadius: "20px",
        background: inCall ? "#dc2626" : "#16a34a",
        color: "white",
        border: "none",
        cursor: "pointer",
        fontWeight: "bold"
      }}
    >
      {inCall ? "Disconnect" : "Call"}
    </button>
  );
};

export default VoiceButton;

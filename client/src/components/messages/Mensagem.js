import React from "react";

const Mensagem = props => {
  const { msg, type } = props;
  let classe = null;
  switch (type) {
    case "erro":
      classe = "alert alert-warning";
      break;
    case "erro-login":
      classe = "alert alert-warning alert-dismissible fade show";
      break;
    case "sucesso":
      classe = "alert alert-success alert-dismissible fade show";
      break;
    default:
      classe = "";
  }
  return (
    <div className={classe} role="alert">
      {msg}
      {type === "sucesso" || type === "erro-login" ? (
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      ) : null}
    </div>
  );
};

export default Mensagem;

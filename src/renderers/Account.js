import { deleteUser } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import Button from "../components/bootstrap/Button";
import Input from "../components/bootstrap/Input";
import Modal from "../components/bootstrap/Modal";
import Submit from "../components/bootstrap/Submit";
import { navigateTo } from "../components/NavigationHooks";
import OutputObject from "../components/OutputObject";
import SeeCode from "../components/SeeCode";
import { useFirebase } from "../scripts/Firebase";
import { getFormEntries } from "../scripts/utilityFunctions";
import {
  closeModal,
  resetFormCloseModal,
  resetModalForm,
} from "../scripts/utilityFunctionsBootstrap";
import { isUserLoggedInto } from "../scripts/utilityFunctionsFirebase";
import { mergeClassName } from "../scripts/utilityFunctionsReact";
import { paths } from "./PageRouter";
import { useConnectivity } from "../scripts/utilityFunctionsReact";

export default Account;

Account.Activator = AccountActivator;
Account.Modal = AccountModal;

function Account() {
  debugger;
  // let [logoutResults, setLogoutResults] = useState("");

  return (
    <>
      <Account.Activator />
      <Account.Modal />
    </>
    //         <form className="modal-body" onSubmit={handleEditAccount}>
    //           <p>Account information</p>
    //           <OutputObject>{auth && auth.user}</OutputObject>
    //           <div className="modal-footer">
    //             <button
    //               type="button"
    //               className="btn btn-secondary"
    //               data-bs-dismiss="modal"
    //             >
    //               Cancel
    //             </button>
    //             <Submit className="btn-info" disabled>
    //               Edit
    //             </Submit>
    //           </div>
    //         </form>
  );
}

function AccountActivator(props) {
  //const firebase = useFirebase();
  const className = props.className;
  //if (!isUserLoggedInto(firebase)) return;
  // label = label || "Account";
  props = {
    ...props,
    className: mergeClassName("hover-pointer", className),
    target: "account-modal",
  };
  return (
    <>
      <Modal.Activator {...props}>Account</Modal.Activator>
    </>
  );
}
function AccountModal() {
  const firebase = useFirebase();
  let [accountErrorMessage, setAccountErrorMessage] = useState(null);
  let [deleteErrorMessage, setDeleteErrorMessage] = useState(null);
  let [isOnline, checkConnectivity] = useConnectivity();

  //const { email, displayName, phoneNumber } = firebase.user;

  const email = firebase.user.email;
  let displayName = firebase.user.displayName;
  const phoneNumber = firebase.user.phoneNumber;

  const modalID = "account-modal";
  const deleteID = "delete-account";

  return (
    <>
      <Modal id={modalID}>
        <Modal.Header onClose={handleCloseModal}>Account info</Modal.Header>
        <form onSubmit={handleSave}>
          <Modal.Body>
            {/* <p>User object:</p> */}
            {/* <OutputObject>{firebase && firebase.user}</OutputObject> */}
            <Input type="text" value={email} name="email" readOnly>
              Email
            </Input>
            <Input
              type="text"
              // placeholder={displayName}
              placeholder="firstname lastname"
              defaultValue={displayName}
              //defaultValue={firebase.user.displayName}
              name="displayName"
            >
              Name
            </Input>
            <div className="text-danger">{accountErrorMessage}</div>
            <Modal.Activator target={deleteID}>
              <Button>Delete account</Button>
            </Modal.Activator>
            <Modal id={deleteID}>
              <Modal.Header onClose={handleCloseModal}>{email}</Modal.Header>
              <form onSubmit={handleDeleteAccount}>
                <Modal.Body>
                  <div>Are you sure you want to delete your account?</div>
                  <div>It cannot be undone.</div>
                  <Input type="password" name="password" required>
                    Password
                  </Input>
                  <div>Please enter your password to confirm deletion</div>
                  <div className="text-danger">{deleteErrorMessage}</div>
                </Modal.Body>
                <Modal.Footer onClose={handleCloseModal}>
                  <Submit className="btn-danger">Delete account</Submit>
                </Modal.Footer>
              </form>
            </Modal>
            {/* <Input
              type="tel"
              placeholder="555-555-5555"
              defaultValue={phoneNumber}
              name="phoneNumber"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            >
              Phone
            </Input> */}
            <div id="recaptcha-gui"></div>
          </Modal.Body>
          <Modal.Footer onClose={handleCloseModal}>
            <Submit className="btn-info">Save</Submit>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );

  /****************************************/

  function deleteAccount(user) {
    return deleteUser(user).catch((error) => {
      return Promise.reject(error.message);
    });
  }
  function ensureConnectivity() {
    return checkConnectivity().catch(() => {
      return Promise.reject("Please connect to the internet");
    });
  }
  function handleSave(submitted) {
    submitted.stopPropagation();
    submitted.preventDefault();
    checkConnectivity()
      .then(() => {
        const form = submitted.target;
        const entries = getFormEntries(form);
        firebase.updateUser(entries).then(() => {
          closeModal(modalID);
          handleCloseModal();
        });
      })
      .catch(() => {
        setAccountErrorMessage("Please connect to the internet");
      });
  }
  function handleDeleteAccount(submitted) {
    submitted.stopPropagation();
    submitted.preventDefault();
    const form = submitted.target;
    const user = firebase.user;
    const userID = user.uid;
    const formEntries = getFormEntries(form);
    const password = formEntries.password;
    ensureConnectivity()
      .then(() => reauthenticateAccount(password))
      .then(() => deleteAccount(user))
      .then(logoutAccount)
      .catch(handleDeleteError);
  }
  function handleCloseModal() {
    //WAIT FOR CLOSE ANIMATION
    setTimeout(() => {
      //const form = document.getElementById("account-form");
      resetModalForm(modalID);
      resetModalForm(deleteID);
      //resetFormCloseModal(modalID);
      //resetFormCloseModal(deleteID);
      setAccountErrorMessage(null);
      setDeleteErrorMessage(null);
    }, 1000);
  }
  function handleDeleteError(errorMessage) {
    setDeleteErrorMessage(errorMessage);
  }
  function logoutAccount() {
    resetFormCloseModal(deleteID);
    setDeleteErrorMessage(null);
    firebase.logout();
    navigateTo(paths.home);
  }
  function reauthenticateAccount(password) {
    return firebase.reauthenticate(password).catch((wrongPassword) => {
      const errorMessage = wrongPassword.message || wrongPassword.code;
      return Promise.reject(errorMessage);
    });
  }
}

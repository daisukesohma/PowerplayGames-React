import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "../Modal";
import CloseIconGrey from "../../assets/close-icon-grey.png";
import classes from "./index.module.scss";
import {
  updateUser,
  deleteUserAccount,
  changeAccountPassword,
} from "../../actions/authActions";
import { useDispatch, useSelector } from "react-redux";

function AccountInfo(props) {
  const { isMobile = false } = props || {};
  let { user = {} } = props || {};
  const [showDeleteAccountModal, setDeleteAccountModal] = useState(false);
  const [showChangePasswordModal, setChangePasswordModal] = useState(false);
  const [editItem, setEditItem] = useState(-1);

  const dispatch = useDispatch();
  const cont = useSelector((state) => state?.user?.countries);
  const [countries, setCountries] = useState([]);

  let [password, setPassword] = useState();
  let deleteAccount = (e) => {
    e.preventDefault();
    setDeleteAccountModal(false);
    return dispatch(deleteUserAccount({ password }));
  };

  useEffect(() => {
    setCountries(cont);
  }, [cont])

  const deleteAccountModal = () => {
    return (
      <Modal visible={showDeleteAccountModal}>
        <form onSubmit={deleteAccount}>
          <div className={classes.__delete_account_modal}>
            <div className={classes.__close_icon}>
              <img
                src={CloseIconGrey}
                width="20px"
                height="20px"
                onClick={() => setDeleteAccountModal(false)}
                alt=""
              />
            </div>
            <div className={classes.__confirmation_message_div}>
              <div className={classes.__message}>
                Are you sure you want to delete your account?
              </div>
            </div>
            <div className={classes.__confirmation_info_div}>
              <div className={classes.__info}>
                All your information will be deleted and cannot be recovered.
                Enter your password to proceed:
              </div>
            </div>
            <div className={classes.__input_and_btn}>
              <div>
                <input
                  required
                  type="password"
                  className={classes.__password_input}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <button className={classes.__delete_account_btn}>
                  Delete my account
                </button>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    );
  };

  let [oldPassword, setOldPassword] = useState();
  let [newPassword, setNewPassword] = useState();
  let [confirmNewPassword, setConfirmNewPassword] = useState();

  let [msg, setMsg] = useState();

  let changePassword = (e) => {
    e.preventDefault();
    if (newPassword === confirmNewPassword && newPassword) {
      setChangePasswordModal(false);
      return dispatch(changeAccountPassword(oldPassword, newPassword));
    } else {
      setMsg("New Password and Confirm Password does not match");
      setTimeout(() => {
        setMsg();
      }, 2000);
    }
  };

  const changePasswordModal = () => {
    return (
      <Modal visible={showChangePasswordModal} className={`m-5`}>
        <form onSubmit={changePassword}>
          <div className={classes.__change_password_modal}>
            <div className={classes.__close_icon}>
              <img
                src={CloseIconGrey}
                width="20px"
                height="20px"
                onClick={() => setChangePasswordModal(false)}
                alt=""
              />
            </div>
            <div className={classes.__confirmation_message_div}>
              <div className={classes.__message}>Change Password</div>
            </div>

            <div className={classes.__input_and_btn}>
              <div className={classes.__info}>Old Password</div>
              <div>
                <input
                  required
                  type="password"
                  className={classes.__password_input}
                  placeholder="Password"
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
            </div>

            <div className={classes.__input_and_btn}>
              <div className={classes.__info}>New Password</div>
              <div>
                <input
                  required
                  type="password"
                  className={classes.__password_input}
                  placeholder="Password"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>

            <div className={classes.__input_and_btn}>
              <div className={classes.__info}>Confirm New Password</div>
              <div>
                <input
                  required
                  type="password"
                  className={classes.__password_input}
                  placeholder="Password"
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
              </div>
            </div>

            <div className={classes.__input_and_btn}>
              <div>
                <button
                  className={classes.__delete_account_btn}
                  type="submit"
                >
                  Change Password
                </button>
              </div>
            </div>
            <br />
          </div>
        </form>
      </Modal>
    );
  };

  let [editedValue, setEditedValue] = useState();
  const renderItem = (
    id,
    title,
    value,
    buttonTitle,
    onButtonClick = () => { }
  ) => {
    return (
      <div className={`${classes.list_item}`}>
        <span>{title}</span>
        <span>
          {(buttonTitle == "Edit" || buttonTitle == 'NoEvent') && (
            <>
              {id == editItem ? (
                <>
                  {id === 6 ? (
                    <select
                      id="country"
                      name="country"
                      title="Country"
                      onChange={(e) => setEditedValue(e.target.value)}
                    >
                      <option value="">Country</option>
                      {countries && countries.map((item, index) => {
                        return (
                          <option key={index} value={item.name}>{item?.name}</option>
                        )
                      })}
                      {/* {getCountries().map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))} */}
                    </select>
                  ) : null}
                  {id === 7 ? (
                    <select
                      id="stateOrProvince"
                      name="stateOrProvince"
                      title="State/Province"
                      onChange={(e) => setEditedValue(e.target.value)}
                    >
                      <option value="">State/Province</option>
                      {countries && countries.map((item, index) => {
                        return (
                          item.name == user.country && (
                            item.country_state_provs.map((sp, index) => {
                              return (
                                <option key={index} value={sp?.name}>{sp?.name}</option>
                              )
                            })
                          )
                        )
                      })}
                      {/* {getStatesOrProvinces().map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))} */}
                    </select>
                  ) : null}

                  {id !== 6 && id !== 7 ? (
                    <div className={`${classes.edit_input}`}>
                      {value && <span>{value}</span>}
                      <input
                        type="text"
                        onChange={(e) => setEditedValue(e.target.value)}
                      />
                    </div>
                  ) : null}
                </>
              ) : (
                <span>{value}</span>
              )}
            </>
          )}
          <button
            onClick={() => {
              if (id === editItem) {
                if (editedValue) {
                  if (id === 1) onSave("first_name");
                  if (id === 2) onSave("last_name");
                  if (id === 3) onSave("display_name");
                  if (id === 4) onSave("email");
                  if (id === 5) onSave("date_of_birth");
                  if (id === 6) onSave("country");
                  if (id === 7) onSave("state_or_province");
                } else {
                  setEditItem(-1);
                }
              } else onButtonClick();
            }}
          >
            {id == editItem ? "Save" : buttonTitle !== 'NoEvent' ? buttonTitle : ''}
          </button>
        </span>
      </div>
    );
  };

  const onSave = (field) => {
    let data = { ...user };
    data[field] = editedValue;
    dispatch(updateUser(data));
    setEditItem(-1);
    setEditedValue();
  };
  return (
    <div className={classes.list_container}>
      {renderItem(1, "First Name", user.first_name, "Edit", () =>
        setEditItem(1)
      )}
      {renderItem(2, "Last Name", user.last_name, "Edit", () => setEditItem(2))}
      {renderItem(3, "Display Name", user.display_name, "Edit", () =>
        setEditItem(3)
      )}
      {renderItem(4, "Email", user.email, "Edit", () => setEditItem(4))}
      {renderItem(5, "Date of Birth", user.date_of_birth, "NoEvent",
      )}
      {renderItem(6, "Country", user.country, "Edit", () => setEditItem(6))}
      {renderItem(
        7,
        isMobile ? "Province" : "Province/State/Territory",
        user.state_or_province,
        "Edit",
        () => setEditItem(7)
      )}
      {renderItem(8, "Change Password", "", "Change", () =>
        setChangePasswordModal(true)
      )}
      {renderItem(9, "Delete Account", "", "Delete", () =>
        setDeleteAccountModal(true)
      )}
      {showDeleteAccountModal && deleteAccountModal()}
      {showChangePasswordModal && changePasswordModal()}
    </div>
  );
}

AccountInfo.propTypes = {
  isMobile: PropTypes.bool,
};

export default AccountInfo;

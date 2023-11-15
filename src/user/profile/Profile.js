import React, { Component } from "react";
import "./Profile.css";
import { updateUser, changePassword, uploadProfileImageApi, deleteAccount } from "../../util/APIUtils";
import Alert from "react-s-alert";
import PaymentList from "./PaymentList";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

const ACCESS_TOKEN = "accessToken";
const theme = createTheme({
    palette: {
        primary: {
            main: "#1976D2", // Material-UI의 기본 primary color
        },
        secondary: {
            main: "#DC004E", // Material-UI의 기본 secondary color
        },
        error: {
            main: "#FF1744", // Material-UI의 기본 error color
        },
    },
});

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            isChangingPassword: false,
            newPassword: "",
            id: this.props.currentUser.id,
            name: this.props.currentUser.name,
            nickname: this.props.currentUser.nickname,
            phone: this.props.currentUser.phone,
            email: this.props.currentUser.email,
            profileImageFile: this.props.currentUser.profileImageFile,
            isEditingVisible: false,
            token: localStorage.getItem(ACCESS_TOKEN),
            showBakeryList: false,
            showReviewList: false,
            showCheckinList: false,
        };
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    toggleBakeryList = () => {
        this.setState((prevState) => ({ showBakeryList: !prevState.showBakeryList }));
    };

    toggleReviewList = () => {
        this.setState((prevState) => ({ showReviewList: !prevState.showReviewList }));
    };

    toggleCheckinList = () => {
        this.setState((prevState) => ({ showCheckinList: !prevState.showCheckinList }));
    };

    handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        this.setState({ selectedFile });
    };

    uploadProfileImage = () => {
        const { selectedFile } = this.state;
        const formData = new FormData();
        formData.append("file", selectedFile);

        uploadProfileImageApi(formData)
            .then((response) => {
                const newImageFileName = response.data;
                this.setState({ profileImageFile: newImageFileName });
                Alert.success("프로필 이미지가 업로드되었습니다.");
                window.location.reload();
            })
            .catch((error) => {
                Alert.error("이미지 업로드 중에 문제가 발생했습니다. 다시 시도해 주세요.");
            });
    };

    handleEditClick = () => {
        this.setState({ isEditing: true });
    };

    handleUserInfoCancel = () => {
        this.setState({ isEditing: false });
    };

    handleSaveClick = () => {
        const updateRequest = {
            id: this.state.id,
            name: this.state.name,
            nickname: this.state.nickname,
            phone: this.state.phone,
            email: this.state.email,
        };

        updateUser(updateRequest)
            .then((response) => {
                Alert.success("Updated successfully.");
                this.setState({ isEditing: false });
            })
            .catch((error) => {
                Alert.error((error && error.message) || "Oops! Something went wrong. Please try again!");
            });
    };

    handlePasswordChange = () => {
        this.setState({ isChangingPassword: true });
    };

    handlePasswordChangeCancel = () => {
        this.setState({ isChangingPassword: false, newPassword: "" });
    };

    handleChangePassword = () => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;

        if (!passwordRegex.test(this.state.newPassword)) {
            Alert.error("비밀번호는 7자리 이상이고 특수기호 1개 이상, 숫자 1개 이상을 포함해야 합니다.");
            return;
        }

        const changepassRequest = {
            id: this.state.id,
            password: this.state.newPassword,
        };

        changePassword(changepassRequest)
            .then((response) => {
                Alert.success("Password changed successfully.");
                this.setState({ isChangingPassword: false, newPassword: "" });
            })
            .catch((error) => {
                Alert.error((error && error.message) || "Oops! Something went wrong. Please try again!");
            });
    };

    handleEditToggle = () => {
        this.setState((prevState) => ({
            isEditingVisible: !prevState.isEditingVisible,
        }));
    };

    handleDeleteAccount = () => {
        if (window.confirm("정말 회원 탈퇴 하시겠습니까?")) {
            const id = this.state.id;

            deleteAccount(id, this.state.token)
                .then((response) => {
                    Alert.success("정상 탈퇴되었습니다."); // 여기서 얼럿으로 변경됩니다
                    this.props.handleLogout();
                })
                .catch((error) => {
                    Alert.error((error && error.message) || "Oops! Something went wrong. Please try again!");
                });
        }
    };

    handlePayment = () => {
        const { id, store_name, store_address, total_amount, menuNames, menuPrices } = this.state.paymentData;
        const paymentRequest = {
            id,
            store_name,
            store_address,
            total_amount,
            menuNames,
            menuPrices,
        };

        const apiUrl = `http://localhost:8080/payment/ready`;

        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.state.token}`,
            },
            body: JSON.stringify(paymentRequest),
        };

        fetch(apiUrl, config)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error("API 호출 중 오류가 발생했습니다.");
                }
            })
            .then((data) => {
                // "next_redirect_pc_url"로 새 창 열기
                window.open(data.next_redirect_pc_url, "_blank");
            })
            .catch((error) => {
                console.error("API 호출 중 오류:", error);
                console.error(error.message);
                console.error(error.stack);
                Alert.error("API 호출 중 오류가 발생했습니다.");
            });
    };

    render() {
        return (
            <ThemeProvider theme={theme}>
                <div id="pp" className="profile-page">
                    <h1 id="mt" className="mypage-title">
                        Mypage
                    </h1>
                    <div id="pc" className="profile-container">
                        <div className="container">
                            <div className="profile-info">
                                <div className="profile-avatar">
                                    {this.state.profileImageFile ? (
                                        <img src={`http://localhost:8080/api/qna/images/${this.state.profileImageFile}`} alt={this.state.name} />
                                    ) : (
                                        <div className="text-avatar">
                                            <span>{this.state.name && this.state.name[0]}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="profile-name">
                                    <h2>{this.state.name}</h2>
                                    <p className="profile-email">{this.state.email}</p>
                                </div>
                                {this.state.isEditingVisible && (
                                    <div className="edit-container">
                                        <table className="center-table">
                                            <tbody>
                                                <UserInfoRow
                                                    label="Name"
                                                    name="name"
                                                    value={this.state.name}
                                                    isEditing={this.state.isEditing}
                                                    onChange={this.handleInputChange}
                                                />
                                                <UserInfoRow
                                                    label="Nickname"
                                                    name="nickname"
                                                    value={this.state.nickname}
                                                    isEditing={this.state.isEditing}
                                                    onChange={this.handleInputChange}
                                                />
                                                <UserInfoRow
                                                    label="Phone"
                                                    name="phone"
                                                    value={this.state.phone}
                                                    isEditing={this.state.isEditing}
                                                    onChange={this.handleInputChange}
                                                />
                                                <UserInfoRow
                                                    label="Email"
                                                    name="email"
                                                    value={this.state.email}
                                                    isEditing={this.state.isEditing}
                                                    onChange={this.handleInputChange}
                                                />
                                                <tr>
                                                    <td>Profile Image:</td>
                                                    <td>
                                                        {this.state.isEditing && (
                                                            <div>
                                                                <Input type="file" accept="image/*" onChange={this.handleFileChange} />
                                                                <Button onClick={this.uploadProfileImage}>이미지 업로드</Button>
                                                            </div>
                                                        )}
                                                        {!this.state.isEditing && <Button onClick={this.handleEditClick}>프로필 이미지 변경</Button>}
                                                        {this.state.isEditing && (
                                                            <div>
                                                                <Button onClick={this.handleSaveClick}>회원정보 수정 적용</Button>
                                                                <Button onClick={this.handleUserInfoCancel}>취소</Button>
                                                            </div>
                                                        )}
                                                        {!this.state.isEditing && <Button onClick={this.handleEditClick}>회원정보 수정</Button>}
                                                    </td>
                                                </tr>

                                                {this.state.isChangingPassword ? (
                                                    <tr>
                                                        <td>New Password:</td>
                                                        <td>
                                                            <input
                                                                type="password"
                                                                name="newPassword"
                                                                value={this.state.newPassword}
                                                                onChange={(e) => this.setState({ newPassword: e.target.value })}
                                                            />
                                                        </td>
                                                    </tr>
                                                ) : null}
                                                <tr>
                                                    <td></td>
                                                    <td>
                                                        {this.state.isChangingPassword ? (
                                                            <div>
                                                                <Button onClick={this.handleChangePassword}>비밀번호 변경 적용</Button>
                                                                <Button onClick={this.handlePasswordChangeCancel}>취소</Button>
                                                            </div>
                                                        ) : (
                                                            <Button onClick={this.handlePasswordChange}>비밀번호 변경</Button>
                                                        )}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td>
                                                        <Button onClick={this.handleDeleteAccount}>회원탈퇴</Button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                                {this.renderEditButton()}
                            </div>
                        </div>
                    </div>

                    <div className="button-container button-container-horizontal">
                        <div id="rowProfile" className="row">
                            {/* PaymentList가 Mui 컴포넌트를 사용한다고 가정합니다 */}
                            <PaymentList paymentList={this.state.paymentList} id={this.state.id} />
                        </div>
                    </div>
                </div>
            </ThemeProvider>
        );
    }

    renderEditButton() {
        return (
            <tr>
                <td></td>
                <td>
                    <Button onClick={this.handleEditToggle}>{this.state.isEditingVisible ? "cencel" : "수정"}</Button>
                </td>
            </tr>
        );
    }
}

class UserInfoRow extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.label}:</td>
                <td>
                    {this.props.isEditing ? (
                        <input type="text" name={this.props.name} value={this.props.value} onChange={this.props.onChange} />
                    ) : (
                        this.props.value
                    )}
                </td>
            </tr>
        );
    }
}

export default Profile;

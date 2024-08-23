// login-screen/LoginInput.jsx
import React, { useState } from "react";
import { Button, TextField, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom'; 

import {
    fetchAsyncLogin,
    fetchAsyncRegister,
    fetchCredStart,
    fetchCredEnd,
    fetchAsyncGetMyProf,
    fetchAsyncGetProfs,
    fetchAsyncCreateProf,
    selectIsLoadingAuth
} from '../../features/auth/authSlice';
import './LoginInput.scss';

const customModalStyles = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    },
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        padding: "20px",
        width: "80%",
        maxWidth: "400px"
    }
};

const LoginInput = () => {
    const dispatch = useDispatch();
    const isLoadingAuth = useSelector(selectIsLoadingAuth);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();  // useNavigate を追加

    const handleSignIn = async (values) => {
        await dispatch(fetchCredStart());
        const result = await dispatch(fetchAsyncLogin(values));

        if (fetchAsyncLogin.fulfilled.match(result)) {
            await dispatch(fetchAsyncGetProfs());
            await dispatch(fetchAsyncGetMyProf());

            // ログイン成功後にホームページへリダイレクト
            navigate("/");
            console.log('login')
        }
        await dispatch(fetchCredEnd());
    };

    const createAccount = async (values) => {
        await dispatch(fetchCredStart());
        const resultReg = await dispatch(fetchAsyncRegister(values));

        if (fetchAsyncRegister.fulfilled.match(resultReg)) {
            await dispatch(fetchAsyncLogin(values));
            await dispatch(fetchAsyncCreateProf({ nickName: "anonymous" }));
            await dispatch(fetchAsyncGetProfs());
            await dispatch(fetchAsyncGetMyProf());
        }
        setIsModalOpen(false);
    };

    return (
        <div className="loginFrame">
            <h2>ログイン</h2>
            <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email("メールフォーマットが無効です").required("メールアドレスは必須です"),
                    password: Yup.string().min(4, "パスワードは最低4文字です").required("パスワードは必須です"),
                })}
                onSubmit={async (values) => {
                    handleSignIn(values);
                }}
            >
                {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    errors,
                    touched,
                }) => (
                    <form className="inputContainer" onSubmit={handleSubmit}>
                        <div className="EmailLogin">
                            <TextField
                                type="text"
                                placeholder="Email"
                                name="email"
                                fullWidth
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                            />
                            {touched.email && errors.email && <div>{errors.email}</div>}
                        </div>
                        <div className="Password">
                            <TextField
                                type="password"
                                placeholder="Password"
                                name="password"
                                fullWidth
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                            />
                            {touched.password && errors.password && <div>{errors.password}</div>}
                        </div>

                        <Button type="submit" className="loginButton" disabled={isLoadingAuth}>
                            {isLoadingAuth ? <CircularProgress size={24} /> : "ログイン"}
                        </Button>

                        <Button
                            type="button"
                            onClick={() => {
                                setIsModalOpen(true);
                            }}
                            className="Account"
                        >
                            アカウント作成画面へ
                        </Button>
                    </form>
                )}
            </Formik>

            {/* アカウント登録モーダル */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                style={customModalStyles}
                ariaHideApp={false}
            >
                <div>
                    <h2>アカウント登録</h2>
                    <Formik
                        initialValues={{ email: "", password: "" }}
                        validationSchema={Yup.object().shape({
                            email: Yup.string().email("メールフォーマットが無効です").required("メールアドレスは必須です"),
                            password: Yup.string().min(4, "パスワードは最低4文字です").required("パスワードは必須です"),
                        })}
                        onSubmit={async (values) => {
                            createAccount(values);
                        }}
                    >
                        {({
                            handleSubmit,
                            handleChange,
                            handleBlur,
                            values,
                            errors,
                            touched,
                        }) => (
                            <form className="inputContainer" onSubmit={handleSubmit}>
                                <TextField
                                    type="text"
                                    placeholder="Email"
                                    name="email"
                                    fullWidth
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                />
                                {touched.email && errors.email && <div>{errors.email}</div>}
                                <TextField
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    fullWidth
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                />
                                {touched.password && errors.password && <div>{errors.password}</div>}
                                <Button type="submit" className="loginButton" disabled={isLoadingAuth}>
                                    {isLoadingAuth ? <CircularProgress size={24} /> : "アカウント作成"}
                                </Button>
                            </form>
                        )}
                    </Formik>
                </div>
            </Modal>
        </div>
    );
};

export default LoginInput;




// import React, { useState } from "react";
// import { Button, TextField, CircularProgress } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { Formik } from 'formik';
// import * as Yup from 'yup';
// import Modal from 'react-modal';

// import {
//     fetchAsyncLogin,
//     fetchAsyncRegister,
//     fetchCredStart,
//     fetchCredEnd,
//     fetchAsyncGetMyProf,
//     fetchAsyncGetProfs,
//     fetchAsyncCreateProf,
//     selectIsLoadingAuth
// } from '../../features/auth/authSlice';

// import './LoginInput.scss';

// const customModalStyles = {
//     overlay: {
//         backgroundColor: "rgba(0, 0, 0, 0.5)"
//     },
//     content: {
//         top: "50%",
//         left: "50%",
//         right: "auto",
//         bottom: "auto",
//         marginRight: "-50%",
//         transform: "translate(-50%, -50%)",
//         padding: "20px",
//         // width: "400px"

//         width: "80%",  
//         maxWidth: "400px"
//     }
// };

// const LoginInput = () => {
//     const dispatch = useDispatch();
//     const isLoadingAuth = useSelector(selectIsLoadingAuth);
//     const [isModalOpen, setIsModalOpen] = useState(false); // モーダルの開閉

//     const handleSignIn = async (values) => {
//         await dispatch(fetchCredStart());
//         const result = await dispatch(fetchAsyncLogin(values));

//         if (fetchAsyncLogin.fulfilled.match(result)) {
//             await dispatch(fetchAsyncGetProfs());
//             await dispatch(fetchAsyncGetPosts());
//             await dispatch(fetchAsyncGetComments());
//             await dispatch(fetchAsyncGetMyProf());
//         }
//         await dispatch(fetchCredEnd());
//     };

//     const createAccount = async (values) => {
//         await dispatch(fetchCredStart());
//         const resultReg = await dispatch(fetchAsyncRegister(values));

//         if (fetchAsyncRegister.fulfilled.match(resultReg)) {
//             await dispatch(fetchAsyncLogin(values));
//             await dispatch(fetchAsyncCreateProf({ nickName: "anonymous" }));

//             await dispatch(fetchAsyncGetProfs());
//             await dispatch(fetchAsyncGetPosts());
//             await dispatch(fetchAsyncGetComments());
//             await dispatch(fetchAsyncGetMyProf());
            
//         }
//         setIsModalOpen(false);
//     };

//     return (
//         <div className="loginFrame">
//             <h2>ログイン</h2>
//             <Formik
//                 initialValues={{ email: "", password: "" }}
//                 validationSchema={Yup.object().shape({
//                     email: Yup.string().email("メールフォーマットが無効です").required("メールアドレスは必須です"),
//                     password: Yup.string().min(4, "パスワードは最低4文字です").required("パスワードは必須です"),
//                 })}
//                 onSubmit={async (values) => {
//                     handleSignIn(values);
//                 }}
//             >
//                 {({
//                     handleSubmit,
//                     handleChange,
//                     handleBlur,
//                     values,
//                     errors,
//                     touched,
//                 }) => (
//                     <form className="inputContainer" onSubmit={handleSubmit}>
//                         <div className="EmailLogin">
//                             <TextField
//                                 type="text"
//                                 placeholder="Email"
//                                 name="email"
//                                 fullWidth
//                                 onChange={handleChange}
//                                 onBlur={handleBlur}
//                                 value={values.email}
//                             />
//                             {touched.email && errors.email && <div>{errors.email}</div>}
//                         </div>
//                         <div className="Password">
//                             <TextField
//                                 type="password"
//                                 placeholder="Password"
//                                 name="password"
//                                 fullWidth
//                                 onChange={handleChange}
//                                 onBlur={handleBlur}
//                                 value={values.password}
//                             />
//                             {touched.password && errors.password && <div>{errors.password}</div>}
//                         </div>

//                         <Button type="submit" className="loginButton" disabled={isLoadingAuth}>
//                             {isLoadingAuth ? <CircularProgress size={24} /> : "ログイン"}
//                         </Button>

//                         <Button
//                             type="button"
//                             onClick={() => {
//                                 setIsModalOpen(true);
//                             }}
//                             className="Account"
//                         >
//                             アカウント作成画面へ
//                         </Button>
//                     </form>
//                 )}
//             </Formik>

//             {/* アカウント登録モーダル */}
//             <Modal
//                 isOpen={isModalOpen}
//                 onRequestClose={() => setIsModalOpen(false)}
//                 style={customModalStyles}
//                 ariaHideApp={false}
//             >
//                 <div>
//                     <h2>アカウント登録</h2>
//                     <Formik
//                         initialValues={{ email: "", password: "" }}
//                         validationSchema={Yup.object().shape({
//                             email: Yup.string().email("メールフォーマットが無効です").required("メールアドレスは必須です"),
//                             password: Yup.string().min(4, "パスワードは最低4文字です").required("パスワードは必須です"),
//                         })}
//                         onSubmit={async (values) => {
//                             createAccount(values);
//                             setIsModalOpen(false);
//                         }}
//                     >
//                         {({
//                             handleSubmit,
//                             handleChange,
//                             handleBlur,
//                             values,
//                             errors,
//                             touched,
//                         }) => (
//                             <form className="inputContainer" onSubmit={handleSubmit}>
//                                 <TextField
//                                     type="text"
//                                     placeholder="Email"
//                                     name="email"
//                                     fullWidth
//                                     onChange={handleChange}
//                                     onBlur={handleBlur}
//                                     value={values.email}
//                                 />
//                                 {touched.email && errors.email && <div>{errors.email}</div>}
//                                 <TextField
//                                     type="password"
//                                     placeholder="Password"
//                                     name="password"
//                                     fullWidth
//                                     onChange={handleChange}
//                                     onBlur={handleBlur}
//                                     value={values.password}
//                                 />
//                                 {touched.password && errors.password && <div>{errors.password}</div>}
//                                 <Button type="submit" className="loginButton" disabled={isLoadingAuth}>
//                                     {isLoadingAuth ? <CircularProgress size={24} /> : "アカウント作成"}
//                                 </Button>
//                             </form>
//                         )}
//                     </Formik>
//                 </div>
//             </Modal>
//         </div>
//     );
// };

// export default LoginInput;




// import React, { useState } from "react";
// import { Button, TextField, CircularProgress } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { Formik } from 'formik';
// import * as Yup from 'yup';
// import Modal from 'react-modal';

// import {
//     fetchAsyncLogin,
//     fetchAsyncRegister,
//     fetchCredStart,
//     fetchCredEnd,
//     fetchAsyncGetMyProf,
//     fetchAsyncGetProfs,
//     fetchAsyncCreateProf,
//     selectIsLoadingAuth
//     } from '../../features/auth/authSlice';

//     import './LoginInput.scss';

//     const LoginInput = () => {
//     const dispatch = useDispatch();
//     const isLoadingAuth = useSelector(selectIsLoadingAuth);
//     const [isRegisterMode, setIsRegisterMode] = useState(false); // ログインと登録モードの切り替え
//     const [isModalOpen, setIsModalOpen] = useState(false); // モーダルの開閉

//     // const handleSignIn = async (values) => {
//     //     await dispatch(fetchCredStart());
//     //     const result = await dispatch(fetchAsyncLogin(values));
//     //     await dispatch(fetchCredEnd());

//     //     if (fetchAsyncLogin.fulfilled.match(result)) {
//     //     await dispatch(fetchAsyncGetMyProf());
//     //     await dispatch(fetchAsyncGetProfs());
//     //     console.log('Login successful');
//     //     } else {
//     //     console.log('Login failed');
//     //     }
//     // };

//     const handleSignIn = async (values) => {
//         await dispatch(fetchCredStart());
//         const result = await dispatch(fetchAsyncLogin(values));
    
//         if (fetchAsyncLogin.fulfilled.match(result)) {
//         await dispatch(fetchAsyncGetProfs());
//         await dispatch(fetchAsyncGetPosts());
//         await dispatch(fetchAsyncGetComments());
//         await dispatch(fetchAsyncGetMyProf());
//         }
//         await dispatch(fetchCredEnd());
//         await dispatch(resetOpenSignIn());
//     };

//     // const createAccount = async (values) => {
//     //     await dispatch(fetchCredStart());
//     //     const result = await dispatch(fetchAsyncRegister(values));
//     //     await dispatch(fetchCredEnd());

//     //     if (fetchAsyncRegister.fulfilled.match(result)) {
//     //     await dispatch(fetchAsyncCreateProf({ nickName: "anonymous" }));
//     //     await dispatch(fetchAsyncGetMyProf());
//     //     await dispatch(fetchAsyncGetProfs());
//     //     console.log('Account creation successful');
//     //     } else {
//     //     console.log('Account creation failed');
//     //     }
//     // };

//     const createAccount = async (values) => {
//         await dispatch(fetchCredStart());
//         const resultReg = await dispatch(fetchAsyncRegister(values));
    
//         if (fetchAsyncRegister.fulfilled.match(resultReg)) {
//         await dispatch(fetchAsyncLogin(values));
//         await dispatch(fetchAsyncCreateProf({ nickName: "anonymous" }));
    
//         await dispatch(fetchAsyncGetProfs());
//         await dispatch(fetchAsyncGetPosts());
//         await dispatch(fetchAsyncGetComments());
//         await dispatch(fetchAsyncGetMyProf());
//         }

//         setIsRegisterMode(false);
//         setIsModalOpen(false);
//     };

//     return (
//         <div className="loginFrame">
//         <h2>{isRegisterMode ? "アカウント登録" : "ログイン"}</h2>
//         <Formik
//             initialValues={{ email: "", password: "" }}
//             validationSchema={Yup.object().shape({
//             email: Yup.string().email("メールフォーマットが無効です").required("メールアドレスは必須です"),
//             password: Yup.string().min(4, "パスワードは最低4文字です").required("パスワードは必須です"),
//             })}
//             onSubmit={async (values) => {
//             if (isRegisterMode) {
//                 createAccount(values);
//             } else {
//                 handleSignIn(values);
//             }
//             }}
//         >
//             {({
//             handleSubmit,
//             handleChange,
//             handleBlur,
//             values,
//             errors,
//             touched,
//             }) => (
//             <form className="inputContainer" onSubmit={handleSubmit}>
//                 <div className="EmailLogin">
//                 <TextField
//                     type="text"
//                     placeholder="Email"
//                     name="email"
//                     fullWidth
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     value={values.email}
//                 />
//                 {touched.email && errors.email && <div>{errors.email}</div>}
//                 </div>
//                 <div className="Password">
//                 <TextField
//                     type="password"
//                     placeholder="Password"
//                     name="password"
//                     fullWidth
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     value={values.password}
//                 />
//                 {touched.password && errors.password && <div>{errors.password}</div>}
//                 </div>

//                 <Button type="submit" className="loginButton" disabled={isLoadingAuth}>
//                 {isLoadingAuth ? <CircularProgress size={24} /> : isRegisterMode ? "登録" : "ログイン"}
//                 </Button>

//                 <Button
//                 type="button"
//                 onClick={() => {
//                     setIsRegisterMode(!isRegisterMode); // ここでログインとアカウント作成モードを切り替える
//                 }}
//                 className="Account"
//                 >
//                 {isRegisterMode ? "ログイン画面へ" : "アカウント作成画面へ"}
//                 </Button>
//             </form>
//             )}
//         </Formik>

//         {/* アカウント登録モーダル */}
//         <Modal
//             isOpen={isModalOpen}
//             onRequestClose={() => setIsModalOpen(false)}
//             className="customModal"
//             overlayClassName="customOverlay"
//             ariaHideApp={false}
//         >
//             <div>
//             <h2>アカウント登録</h2>
//             <Formik
//                 initialValues={{ email: "", password: "" }}
//                 validationSchema={Yup.object().shape({
//                 email: Yup.string().email("メールフォーマットが無効です").required("メールアドレスは必須です"),
//                 password: Yup.string().min(4, "パスワードは最低4文字です").required("パスワードは必須です"),
//                 })}
//                 onSubmit={async (values) => {
//                 createAccount(values);
//                 setIsModalOpen(false); // モーダルを閉じる
//                 }}
//             >
//                 {({
//                 handleSubmit,
//                 handleChange,
//                 handleBlur,
//                 values,
//                 errors,
//                 touched,
//                 }) => (
//                 <form className="inputContainer" onSubmit={handleSubmit}>
//                     <TextField
//                     type="text"
//                     placeholder="Email"
//                     name="email"
//                     fullWidth
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     value={values.email}
//                     />
//                     {touched.email && errors.email && <div>{errors.email}</div>}
//                     <TextField
//                     type="password"
//                     placeholder="Password"
//                     name="password"
//                     fullWidth
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     value={values.password}
//                     />
//                     {touched.password && errors.password && <div>{errors.password}</div>}
//                     <Button type="submit" className="loginButton" disabled={isLoadingAuth}>
//                     {isLoadingAuth ? <CircularProgress size={24} /> : "アカウント作成"}
//                     </Button>
//                 </form>
//                 )}
//             </Formik>
//             </div>
//         </Modal>
//         </div>
//     );
// };

// export default LoginInput;





// import React, { useState } from "react";
// import { Button, TextField, CircularProgress } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { Formik } from 'formik';
// import * as Yup from 'yup';
// import Modal from 'react-modal';

// import {
//     fetchAsyncLogin,
//     fetchAsyncRegister,
//     fetchCredStart,
//     fetchCredEnd,
//     fetchAsyncGetMyProf,
//     fetchAsyncGetProfs,
//     fetchAsyncCreateProf,
//     selectIsLoadingAuth
//     } from '../../features/auth/authSlice';

//     import './LoginInput.scss';

//     const customModalStyles = {
//     overlay: {
//         backgroundColor: "rgba(0, 0, 0, 0.5)"
//     },
//     content: {
//         top: "50%",
//         left: "50%",
//         right: "auto",
//         bottom: "auto",
//         marginRight: "-50%",
//         transform: "translate(-50%, -50%)",
//         padding: "20px",
//         width: "400px"
//     }
//     };

//     const LoginInput = () => {
//     const dispatch = useDispatch();
//     const isLoadingAuth = useSelector(selectIsLoadingAuth);
//     const [isRegisterMode, setIsRegisterMode] = useState(false); // ログインと登録モードの切り替え
//     const [isModalOpen, setIsModalOpen] = useState(false); // モーダルの開閉

//     const handleSignIn = async (values) => {
//         await dispatch(fetchCredStart());
//         const result = await dispatch(fetchAsyncLogin(values));
//         await dispatch(fetchCredEnd());

//         if (fetchAsyncLogin.fulfilled.match(result)) {
//         // ログイン成功後の処理
//         await dispatch(fetchAsyncGetMyProf());
//         await dispatch(fetchAsyncGetProfs());
//         console.log('Login successful');
//         } else {
//         console.log('Login failed');
//         }
//     };

//     const createAccount = async (values) => {
//         await dispatch(fetchCredStart());
//         const result = await dispatch(fetchAsyncRegister(values));
//         await dispatch(fetchCredEnd());

//         if (fetchAsyncRegister.fulfilled.match(result)) {
//         // アカウント作成成功後の処理
//         await dispatch(fetchAsyncCreateProf({ nickName: "anonymous" }));
//         await dispatch(fetchAsyncGetMyProf());
//         await dispatch(fetchAsyncGetProfs());
//         console.log('Account creation successful');
//         } else {
//         console.log('Account creation failed');
//         }
//     };

//     return (
//         <div className="loginFrame">
//         <h2>{isRegisterMode ? "アカウント登録" : "ログイン"}</h2>
//         <Formik
//             initialValues={{ email: "", password: "" }}
//             validationSchema={Yup.object().shape({
//             email: Yup.string().email("メールフォーマットが無効です").required("メールアドレスは必須です"),
//             password: Yup.string().min(4, "パスワードは最低4文字です").required("パスワードは必須です"),
//             })}
//             onSubmit={async (values) => {
//             if (isRegisterMode) {
//                 createAccount(values);
//             } else {
//                 handleSignIn(values);
//             }
//             }}
//         >
//             {({
//             handleSubmit,
//             handleChange,
//             handleBlur,
//             values,
//             errors,
//             touched,
//             }) => (
//             <form className="inputContainer" onSubmit={handleSubmit}>
//                 <div className="EmailLogin">
//                 <TextField
//                     type="text"
//                     placeholder="Email"
//                     name="email"
//                     fullWidth
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     value={values.email}
//                 />
//                 {touched.email && errors.email && <div>{errors.email}</div>}
//                 </div>
//                 <div className="Password">
//                 <TextField
//                     type="password"
//                     placeholder="Password"
//                     name="password"
//                     fullWidth
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     value={values.password}
//                 />
//                 {touched.password && errors.password && <div>{errors.password}</div>}
//                 </div>

//                 <Button type="submit" className="loginButton" disabled={isLoadingAuth}>
//                 {isLoadingAuth ? <CircularProgress size={24} /> : isRegisterMode ? "登録" : "ログイン"}
//                 </Button>

//                 <Button
//                 type="button"
//                 onClick={() => {
//                     setIsModalOpen(true);
//                 }}
//                 >
//                 {isRegisterMode ? "ログイン画面へ" : "アカウント作成画面へ"}
//                 </Button>
//             </form>
//             )}
//         </Formik>

//         {/* アカウント登録モーダル */}
//         <Modal
//             isOpen={isModalOpen}
//             onRequestClose={() => setIsModalOpen(false)}
//             style={customModalStyles}
//             ariaHideApp={false}
//         >
//             <div>
//             <h2>アカウント登録</h2>
//             <Formik
//                 initialValues={{ email: "", password: "" }}
//                 validationSchema={Yup.object().shape({
//                 email: Yup.string().email("メールフォーマットが無効です").required("メールアドレスは必須です"),
//                 password: Yup.string().min(4, "パスワードは最低4文字です").required("パスワードは必須です"),
//                 })}
//                 onSubmit={async (values) => {
//                 createAccount(values);
//                 setIsModalOpen(false); // モーダルを閉じる
//                 }}
//             >
//                 {({
//                 handleSubmit,
//                 handleChange,
//                 handleBlur,
//                 values,
//                 errors,
//                 touched,
//                 }) => (
//                 <form className="inputContainer" onSubmit={handleSubmit}>
//                     <TextField
//                     type="text"
//                     placeholder="Email"
//                     name="email"
//                     fullWidth
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     value={values.email}
//                     />
//                     {touched.email && errors.email && <div>{errors.email}</div>}
//                     <TextField
//                     type="password"
//                     placeholder="Password"
//                     name="password"
//                     fullWidth
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     value={values.password}
//                     />
//                     {touched.password && errors.password && <div>{errors.password}</div>}
//                     <Button type="submit" className="loginButton" disabled={isLoadingAuth}>
//                     {isLoadingAuth ? <CircularProgress size={24} /> : "アカウント作成"}
//                     </Button>
//                 </form>
//                 )}
//             </Formik>
//             </div>
//         </Modal>
//         </div>
//     );
//     };

// export default LoginInput;







// import React from "react";
// import { Button, TextField } from '@mui/material';
// import './LoginInput.scss';

// const handleSignIn = () => {
//     console.log('signIn')
// }

// const createAccount = () => {
//     console.log('create')
// }


// const LoginInput = () => {
//     return (
//         <div className="loginFrame">
//         <form className="inputContainer" >
//         <div className="EmailLogin">
//             <h2>Email</h2>
//             <TextField
//             type="text"
//             placeholder="Email"
//             name="email"
//             fullWidth
//             />
//         </div>
//         <div className="Password">
//             <h2>Password</h2>
//             <TextField
//             type="password"
//             placeholder="password"
//             name="password"
//             fullWidth
//         />
//         </div>
//     </form>
//     <Button onClick={handleSignIn} className="loginButton">ログイン</Button>
    
//     <Button className="Account" onClick={createAccount}>アカウント登録</Button>
//     </div>
//     )
// }

// export default LoginInput
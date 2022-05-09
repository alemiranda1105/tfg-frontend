import axios from "axios"
import React, { useContext, useState } from "react"
import { AuthContext } from "../../auth/AuthContextProvider"
import { validateText } from "../../helpers/FormValidationHelper"
import { ErrorValidationText } from "../custom_components/ErrorValidationText"
import { LoadingComponent } from "../custom_components/LoadingComponent"
import { SubmitButton } from "../custom_components/SubmitButton"


export const UpdatePasswordComponent = () => {
    const { token } = useContext(AuthContext)

    const [passwords, setPasswords] = useState({
        old_password: "",
        new_password: ""
    });

    const [passwordValidation, setPasswordValidation] = useState({
        password: "",
        same_password: "",
        submit: ""
    })

    const [submitState, setSubmitState] = useState({
        updating: false,
        updated: false,
    });

    function validation(): boolean {
        var validate = true
        Object.entries(passwordValidation).forEach(entry => {
            let [, value] = entry
            if(value !== "") {
                validate = false;
            }
        })
        return validate
    }

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget

        setPasswordValidation(prev => ({
            ...prev,
            submit: ""
        }))

        if(name === "new_password") {
            let validation = validateText(value, undefined, 6);
            setPasswordValidation(prev => ({
                ...prev,
                password: validation
            }))
            setPasswords(prev => ({
                ...prev,
                new_password: value
            }))
        }
        if(name === "old_password") {
            setPasswords(prev => ({
                ...prev,
                old_password: value
            }))
        }
        if(name === "new_password2" && passwords.new_password !== value) {
            setPasswordValidation(prev => ({
                ...prev,
                same_password: "Passwords are different"
            }))
        } else {
            setPasswordValidation(prev => ({
                ...prev,
                same_password: ""
            }))
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(validation()) {
            let config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            
            axios.put(`${process.env.REACT_APP_API_URL}/users/update_password`, passwords, config)
            .then(res => {
                if(res.data) {
                    setSubmitState({
                        updating: false,
                        updated: true
                    })
                }
            })
            .catch(error => {
                if(axios.isAxiosError(error)) {
                    setPasswordValidation(prev => ({
                        ...prev,
                        submit: error.response?.data.detail
                    }))
                } else {
                    setPasswordValidation(prev => ({
                        ...prev,
                        submit:  "Something went wrong, please try again"
                    }))
                }
                setSubmitState({
                    updating: false,
                    updated: false
                })
            })
            
        }
    }

    return (
        <div className="flex flex-col items-center m-3">
            {
                submitState.updated &&
                <div>
                    <h3 className="font-bold text-2xl">Update password</h3>
                    <h4 className="font-light">You can now use your new password</h4>
                </div>
            }
            {
                (!token || submitState.updating) &&
                <LoadingComponent />
            }
            {
                !submitState.updated && token &&
                <>
                    <h3 className="font-bold text-2xl">Update password</h3>
                    <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center shadow p-3 m-2"
                    >
                        <div className="flex flex-col">
                            <label className="font-light mx-2" htmlFor="old_password">Old password</label>
                            <input className="m-2 border rounded active:border-blue-600 duration-300" type="password" name="old_password" id="old_password" onChange={handleChange} required/>    
                        </div>
                        <div className="flex flex-col">
                            <label className="font-light mx-2" htmlFor="old_password">New password</label>
                            <input className="m-2 border rounded active:border-blue-600 duration-300" type="password" name="new_password" id="new_password" onChange={handleChange} required/>
                            { passwordValidation.password && <ErrorValidationText error={passwordValidation.password} /> }
                        </div>
                        <div className="flex flex-col">
                            <label className="font-light mx-2" htmlFor="old_password">Confirm new password</label>
                            <input className="m-2 border rounded active:border-blue-600 duration-300" type="password" name="new_password2" id="new_password2" onChange={handleChange} required/>
                            { passwordValidation.same_password && <ErrorValidationText error={passwordValidation.same_password} /> }  
                        </div>
                        <SubmitButton text="Change password" loginError={passwordValidation.submit} />
                    </form>
                </>
            }
        </div>
    )
}
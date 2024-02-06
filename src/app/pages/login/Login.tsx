import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { InputLogin } from "./components/InputLogin";

export const Login = () => {
    const inputPwdRef = useRef<HTMLInputElement>(null);

    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");

    // ele armazena em memoria 
    const emailLength = useMemo(() => {
        return email.length
    }, [email.length])

    //permite que esse codigo dentro seja executado apenas uma vez
    useEffect(() => {
        console.log(email)
    }, [email])

    const handleLogin = useCallback(() => {
        console.log("handler", email, pwd)
        console.log(inputPwdRef.current?.value);
    }, [email,pwd])

    return (
        <div>
            <h1>Login</h1>
            <p>qtd {emailLength}</p>
            <form>
                <InputLogin
                    label="Email"
                    value={email}
                    onChange={newValue => setEmail(newValue)}
                    onPressEnter={ () => inputPwdRef.current?.focus()}
                />
                <InputLogin
                    label="Senha"
                    value={pwd}
                    type="password"
                    ref={inputPwdRef}
                    onChange={newValue => setPwd(newValue)}
                />

                <button type="button" onClick={handleLogin}>Login</button>
            </form>

        </div>
    )
}
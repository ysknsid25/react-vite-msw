import "./App.css";
import { ResultAsync } from "neverthrow";

type User = {
    id: string;
    firstName: string;
    lastName: string;
};

function isUser(t: unknown): t is User {
    const obj = t as User;
    return (
        typeof obj === "object" &&
        obj !== null &&
        typeof obj.id === "string" &&
        typeof obj.firstName === "string" &&
        typeof obj.lastName === "string"
    );
}

type ParseError = { message: string }

const getUser = () => {
    return fetch("/api/user/notfound").then((res) => {
        if (res.ok) {
            return res.json().then((data) => {
                if (isUser(data) && data.firstName == "John") {
                    return data;
                }
            });
        }
        throw { message: "Parse Error" };
    });
};

const getNeverThrowUser = async () => {
    const resultFunc = ResultAsync.fromThrowable(getUser, (): ParseError => ({ message: "Parse Error" }))
    const result = await resultFunc();
    if (result.isOk()) {
        console.log(result);
        console.log(result.value);
    }
    console.log(result);
}

const userNotFound = () => {
    fetch("/api/user/notfound").then((res) => {
        if (res.ok) {
            res.json().then((data) => {
                console.log(data);
            });
        }
    });
};

const userInternalError = () => {
    fetch("/api/user/internalerror").then((res) => {
        if (res.ok) {
            res.json().then((data) => {
                console.log(data);
            });
        }
    });
};

function App() {
    return (
        <>
            <h1>msw + neverthrow</h1>
            <button onClick={() => getUser()}>get user</button>
            <button onClick={() => userNotFound()}>not found</button>
            <button onClick={() => userInternalError()}>internal error</button>
            <button onClick={() => getNeverThrowUser()}>neverthrow user</button>
        </>
    );
}

export default App;

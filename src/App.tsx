import "./App.css";

const getUser = () => {
    fetch("/api/user").then((res) => {
        if (res.ok) {
            res.json().then((data) => {
                console.log(data);
            });
        }
    });
};

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
        </>
    );
}

export default App;

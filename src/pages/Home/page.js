import NavBar from "../../components/Navbar/page";

const HomePage = () => {

    const tokenDetails = localStorage.getItem("customerDetails");

    return (
        <>
            <NavBar></NavBar>
            <div className="login-container flex items-center justify-center h-screen">
                <h1 className="text-3xl font-bold">HomePage</h1>
            </div>
        </>
    );
};

export default HomePage;

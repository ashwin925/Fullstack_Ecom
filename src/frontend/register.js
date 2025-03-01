export default function Register() {
    return (
        <div className="container mt-5 text-center">
            <h2>Register</h2>
            <form>
                <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Full Name" required />
                </div>
                <div className="mb-3">
                    <input type="email" className="form-control" placeholder="Email" required />
                </div>
                <div className="mb-3">
                    <input type="password" className="form-control" placeholder="Password" required />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
}
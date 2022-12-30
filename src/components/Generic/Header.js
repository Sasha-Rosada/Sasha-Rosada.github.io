import { Link } from "react-router-dom"

export function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="ms-3 navbar-brand" to="/">Certify.Generate</Link>
            </div>
        </nav>
    )
}
import { Navbar } from "react-bootstrap"
import "../assets/navbar.css"
import { Nav } from "react-bootstrap"

export const MyNavBar = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mx-auto">
                    <Nav.Link href="/">Dịch văn bản</Nav.Link>
                    <Nav.Link href="/eval">Đánh giá MOS</Nav.Link>

                </Nav>
            </Navbar.Collapse>

        </Navbar>

    )
}
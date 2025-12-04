import Header from "./component/header";
import Moment from "./component/moment";
import Footer from "./component/footer";
import Message from "./component/message";

export default function Home() {
    return (
        <main className="min-h-screen">
            <Header />
            <Moment />
            <Message />
            <Footer />
        </main>
    );
}

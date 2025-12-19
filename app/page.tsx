import Header from "../component/header";
import Moment from "../component/moment";
import MessageWall from "@/component/message-wall";
import Footer from "../component/footer";

export default function Home() {
    return (
        <main className="min-h-screen bg-[#FCFBFA]">
            <Header />
            <Moment />
            <MessageWall />
            <Footer />
        </main>
    );
}

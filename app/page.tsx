import Header from "../component/header";
import Moment from "../component/moment";
import MessageWall from "@/component/message-wall";

export default function Home() {
    return (
        <main className="min-h-screen bg-[#FCFBFA]">
            <Header />
            <Moment />
            <MessageWall />
            
        </main>
    );
}

import Header from "../../components/Header/index";
import Footer from "../../components/Footer/Footer";
import { usePacketCapture } from "./hooks/usePackageCapture";
import CaptureHeader from "./components/CaptureHeader/CaptureHeader";
import CaptureForm from "./components/CaptureForm/CaptureForm";
import CaptureProgress from "./components/CaptureProgress/CaptureProgress";
import PacketsTable from "./components/PacketsTable/PacketsTable";

import './index.css';

function PackageCapture() {
    const {
        protocolSelected,
        setProtocolSelected,
        packets,
        totalPackets,
        isCapturing,
        progressPercentaje,
        startCapture,
        stopCapture,
    } = usePacketCapture();

    return (
        <div className="package-capture">
            <Header />
            <main>
                <CaptureHeader />
                <section className="capture-form">
                    <CaptureForm
                        onSubmit={startCapture}
                        onStop={stopCapture}
                        isCapturing={isCapturing}
                        protocolSelected={protocolSelected}
                        setProtocolSelected={setProtocolSelected}
                    />
                    <CaptureProgress
                        capturedCount={packets.length}
                        totalPackets={totalPackets}
                        percentaje={progressPercentaje}
                    />
                </section>
                <PacketsTable packets={packets}/>
            </main>
            <Footer />
        </div>
    );
}

export default PackageCapture;

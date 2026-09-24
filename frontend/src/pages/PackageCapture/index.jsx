import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { usePacketCapture } from "./hooks/usePackageCapture";
import CaptureHeader from "./components/CaptureHeader";
import CaptureForm from "./components/CaptureForm";
import CaptureProgress from "./components/CaptureProgress";
import PacketsTable from "./components/PacketsTable";

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
                    {console.log(packets.length)}
                    {
                        (isCapturing || packets.length > 0) && (
                            <CaptureProgress
                                capturedCount={packets.length}
                                totalPackets={totalPackets}
                                percentaje={progressPercentaje}
                            />
                        )
                    }
                </section>
                {
                    (isCapturing || packets.length > 0) && <PacketsTable packets={packets}/>
                }
            </main>
            <Footer />
        </div>
    );
}

export default PackageCapture;

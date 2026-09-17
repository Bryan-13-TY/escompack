import Header from "../../components/Header";
import Footer from "../../components/Footer";
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
        <div className='package-capture'>
            <div className='package-capture-wrapper'>
                <Header />
                <main>
                    <CaptureHeader />
                    <section className='package-capture-form'>
                        <div className='form-wrapper'>
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
                        </div>
                    </section>
                    <PacketsTable packets={packets}/>
                </main>
                <Footer />
            </div>
        </div>
    );
}

export default PackageCapture;
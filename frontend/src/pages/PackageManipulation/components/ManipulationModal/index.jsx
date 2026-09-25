import FilterModalHeader from "./components/FilterModalHeader";
import FilterForm from "./components/FilterForm";
import FilterResults from "./components/FilterResults";
import { usePackageManipulation } from "../../hooks/usePackageManipulation";

import './ManipulationModal.css';

function FilterModal({onClick}) {
    const {
        protocolSelected,
        setProtocolSelected,
        resetProtocol,
        getCaptures,
        captures,
    } = usePackageManipulation();

    return (
        <div className="manipulation-blur">
            <div className="manipulation-modal">
                <FilterModalHeader onClick={onClick}/>
                <div className="manipulation-form">
                    <FilterForm
                        protocolSelected={protocolSelected}
                        setProtocolSelected={setProtocolSelected}
                        resetProtocol={resetProtocol}
                        getCaptures={getCaptures}
                    />
                </div>
                <div className="manipulation-results">
                    <FilterResults
                        filename='Capture_Protocols.ICMP_20260910_035010.pcap'
                        filepath='/app/captures/Capture_Protocols.ICMP_20260910_035010.pcap'
                        protocol='ICMP'
                        packet_count='10'
                        captured_at='2026-09-10T03:50:10.657000'
                    />
                    <FilterResults
                        filename='Capture_Protocols.ICMP_20260910_035010.pcap'
                        filepath='/app/captures/Capture_Protocols.ICMP_20260910_035010.pcap'
                        protocol='ICMP'
                        packet_count='10'
                        captured_at='2026-09-10T03:50:10.657000'
                    />
                    {/*
                    {
                        captures.map((capture) => (
                            <PackageCaptureResults
                                key={capture.captured_at}
                                filename={capture.filename}
                                filepath={capture.filepath}
                                protocol={capture.protocol.toUpperCase()}
                                packet_count={capture.packet_count}
                                captured_at={capture.captured_at}

                            />
                        ))
                    }
                    */}
                </div>
            </div>
        </div>
    );
}

export default FilterModal;
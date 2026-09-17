import './PacketsTable.css';

function PacketsTable({ packets }) {
    return (
        <section className='package-capture-table'>
            <div className='table-wrapper'>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Longitud</th>
                            <th>Protocolo</th>
                            <th>Origen</th>
                            <th>Destino</th>
                            <th>Resumen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            packets.map((pkt) => (
                                <tr key={pkt.number}>
                                    <td className='table-bar'>{pkt.number}</td>
                                    <td>{pkt.length}</td>
                                    <td><span className='table-protocol'>{pkt.protocol}</span></td>
                                    <td>{pkt.source}</td>
                                    <td>{pkt.destination}</td>
                                    <td>{pkt.summary}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default PacketsTable;

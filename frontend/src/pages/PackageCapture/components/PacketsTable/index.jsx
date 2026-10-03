import PropTypes from 'prop-types';

import './PacketsTable.css';

/**
 * Componente que renderiza la tabla con la información de los paquetes
 * capturados.
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {array} props.packets - Lista de los paquetes capturados.
 * @returns {React.JSX.Element}
 */
function PacketsTable({ packets }) {
    return (
        <section className='capture-table'>
            <h2>Paquetes capturados</h2>
            <div className='table'>
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
                        {packets.map((pkt) => (
                            <tr key={pkt.number}>
                                <td className='table-bar'>{pkt.number}</td>
                                <td>{pkt.length}</td>
                                <td><span className='table-protocol'>{pkt.protocol}</span></td>
                                <td>{pkt.source}</td>
                                <td>{pkt.destination}</td>
                                <td>{pkt.summary}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

PacketsTable.propTypes = {
    /** Lista de los paquetes capturados */
    packets: PropTypes.array.isRequired,
}

export default PacketsTable;

import PropTypes from "prop-types";

import './ProtocolInput.css';

/**
 * Componente que renderiza un input correspondiente a alguno de los
 * protocolos soportados.
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {string} props.id - Identificador único del protocolo.
 * @param {string} props.icon - Imagen del icono del protocolo por tema.
 * @param {string} props.label - Etiqueta de input.
 * @param {boolean} props.isSelected - Determina si el input fue seleccionado.
 * @param {function} props.onSelect - Función callback que se ejecuta al seleccionar el input.
 * @example 
 * return(
 *  <ProtocolInput
 *      id='arp'
 *      icon='./assets/icons/icon-arp-dark.png'
 *      label='ARP'
 *      isSelected=true
 *      onSelect=setProtocolSelected
 *  />
 * );
 * @returns {React.JSX.Element}
 */
function ProtocolInput({ id, icon, label, isSelected, onSelect }) {
    const className = isSelected ? 'target-protocol selected' : 'target-protocol';

    return (
        <label className={className}>
            <input
                type='radio'
                name='capture-protocol'
                value={id}
                /* establecemos el nuevo protocolo seleccionado
                cada que se selecciona el input */
                onChange={() => onSelect(id)}
                checked = {isSelected} // marcamos el input seleccionado
            />
            <div className='protocol-content'>
                <img src={icon} alt={label} width={50}/>
                <span>{label}</span>
            </div>
        </label>
    );
}

ProtocolInput.propTypes = {
    /** Id del input asociado al protocolo */
    id: PropTypes.string.isRequired,

    /** Icono del protocolo */
    icon: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string,
    ]).isRequired,

    /** Label del ipunt asociado al protocolo */
    label: PropTypes.string.isRequired,

    /** Define si el input se selecciona */
    isSelected: PropTypes.bool.isRequired,

    /** Función callback que se ejecuta al seleccionar el input */
    onSelect: PropTypes.func.isRequired,
};

export default ProtocolInput;

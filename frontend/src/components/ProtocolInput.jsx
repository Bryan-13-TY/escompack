import PropTypes from "prop-types";

import './ProtocolInput.css';

/**
 * Componente que muestra un input de un protocolo a capturar.
 * 
 * Este componente renderiza un input para un protocolo a capturar,
 * el cual incluye el icono y el acrónimo del mismo.
 * 
 * @component
 * @example 
 * 
 * return(
 *  <ProtocolInput
 *      id='arp'
 *      icon='./assets/icons/icon-arp-dark.png'
 *      label='ARP'
 *      isSelected=true
 *      onSelect=setProtocolSelected
 *  />
 * );
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
                <img src={icon} alt={label} width={60}/>
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
    ]),

    /** Label del ipunt asociado al protocolo */
    label: PropTypes.string.isRequired,

    /** Define si el input se selecciona */
    isSelected: PropTypes.bool.isRequired,

    /** Función callback que se ejecuta al seleccionar el input */
    onSelect: PropTypes.func.isRequired,
};

/** @type {React.FC<any>} */
export default ProtocolInput;

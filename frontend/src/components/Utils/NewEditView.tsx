import {useMediaQuery} from 'react-responsive';
import { Modal } from '@components/Utils/Modal';
import { createPortal } from 'react-dom';


interface NewEditViewProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export const NewEditView: React.FC<NewEditViewProps> = ({ open, onClose, title, children }) => {
    const isMobile = useMediaQuery({ query: '(max-width: 640px)' });

    

    if (!open) return null;

    return isMobile ? 
    (
        createPortal(
        <div className="fixed inset-0 flex items-start justify-center z-50 bg-white dark:bg-gray-800 w-full">

            <div className='p-4 w-full'>
                <button onClick={onClose} className='text-blue-500 mb-4'>
                    {"< Back"}
                </button>
                    <h2 className="text-xl font-semibold mb-4">{title}</h2>
                    
                
                {children}
            </div>
        </div>,
        document.body
        )

    ) : (
        <Modal isOpen={open} onClose={onClose} title={title}>
            {children}
        </Modal>
    )
}
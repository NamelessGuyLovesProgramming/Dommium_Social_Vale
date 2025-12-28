import { useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X } from 'lucide-react'
import './Modal.css'

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
}

const modalVariants = {
  hidden: { 
    opacity: 0,
    y: 50,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", duration: 0.5, bounce: 0.3 }
  },
  exit: {
    opacity: 0,
    y: 50,
    scale: 0.95,
    transition: { duration: 0.2 }
  }
}

const Modal = ({ isOpen, onClose, title, children }) => {
  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose} // Close when clicking backdrop
        >
          <motion.div
            className="modal-content"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
          >
            <button className="modal-close-btn" onClick={onClose} aria-label="Schließen">
              <X size={24} />
            </button>
            
            {title && (
              <div className="modal-header">
                <h2 className="modal-title">{title}</h2>
              </div>
            )}
            
            <div className="modal-body">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Modal

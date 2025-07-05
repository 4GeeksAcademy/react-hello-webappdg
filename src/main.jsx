import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom"
import { router } from "./routes"
import { StoreProvider } from './hooks/useGlobalReducer'

// ⬇️ Importamos nuestro nuevo contexto
import { ContactProvider } from './context/ContactContext'

const Main = () => {
    return (
        <React.StrictMode>
            <StoreProvider>
                <ContactProvider> {/* Con ésto envuelvo la app con el contexto de los contactos */}
                    <RouterProvider router={router} />
                </ContactProvider>
            </StoreProvider>
        </React.StrictMode>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(<Main />)

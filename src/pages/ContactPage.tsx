import { ContactForm } from "../components/contact_components/ContactForm";


export function ContactPage() {
    return(
        <div className="flex flex-col items-center">
            <h1 className="text-4xl font-extrabold text-blue-700">Contáctanos</h1>
            <h2>
                <a
                className="underline hover:underline-offset-2 transition duration-300 ease-in-out hover:font-bold"
                href="mailto:alejandro.miranda103@alu.ulpgc.es"
                target='_blank'
                rel="noopener"
                aria-label='Dirección email'>
                    O si lo prefieres, mándanos un email directamente.
                </a>
            </h2>
            <ContactForm />
        </div>
    )
}
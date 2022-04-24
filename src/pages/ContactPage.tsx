import { ContactFormComponent } from "../components/contact_components/ContactFormComponent";


export function ContactPage() {
    return(
        <div className="flex flex-col items-center">
            <h1 className="section-title">Contact us</h1>
            <h2>
                <a
                className="underline hover:underline-offset-2 transition duration-300 ease-in-out hover:font-bold"
                href="mailto:alejandro.miranda103@alu.ulpgc.es"
                target='_blank'
                rel="noreferrer"
                aria-label='Dirección email'>
                    Send us an email directly
                </a>
            </h2>
            <ContactFormComponent />
        </div>
    )
}
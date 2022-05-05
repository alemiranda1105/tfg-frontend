
export function FAQPage() {
    return (
        <div className="flex flex-col items-center w-full">
            <div className="flex flex-col justify-between items-center w-3/4">
                <h1 className="section-title">Frequently asked questions</h1>
                <section className="mx-5 my-4">
                    <h2 className="section-small-title">
                        ¿Cuál es la finalidad de la plataforma?
                    </h2>
                    <div className="p-3 border-b-2 border-black bg-white">
                        <p>
                            La finalidad de esta plataforma es ofrecer a los investigadores un sitio único donde poder comparar los métodos de extracción de datos de facturas eléctricas que han desarrollado con los de otros investigadores
                            gracias al sistema de puntuaciones que posee la plataforma. <br />
                            Además, estos resultados podrán ser incluidos en un artículo, si así lo desea. <br />
                            <i>Desde la plataforma, pedimos a los investigadores que la usen que esta sea citada.</i>
                        </p>
                    </div>
                </section>
                <section className="mx-5 my-4">
                    <h2 className="section-small-title">
                        ¿Es necesario que mis resultados sean públicos?
                    </h2>
                    <div className="p-3 border-b-2 border-black bg-white">
                        <p>
                            No, no lo es, a la hora de subirlos puedes seleccionar que sean privados, es decir, solo tú los puedes ver; anónimo, otros usuarios ven los resultados pero no su autor, y públicos, todos los usuarios pueden ver todos los datos que hayas añadido. <br />
                            En caso de que cambies de idea, puedes editar la privacidad del método desde tu perfil o la página de tus métodos.
                        </p>
                    </div>
                </section>
                <section className="mx-5 my-4">
                    <h2 className="section-small-title">
                        ¿Existe algún límite de subida?
                    </h2>
                    <div className="p-3 border-b-2 border-black bg-white">
                        <p>
                            No, la plataforma no dispone de ningún límite de subida, sin embargo, pedimos por favor a los usuarios que solo suban métodos que estén terminados y no usen la plataforma como un conjunto de tests ya que nuestros recursos son limitados y de esta manera puedes
                            perjudicar a otros usuarios que hagan un correcto uso de esta.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    )
}
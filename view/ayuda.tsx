import React from 'react';
import { ListRender } from '@/components/list-render'
// import { PageUnderConstruction } from '@/components/page-under-construction';
import BannerPage from './banner-page';

const consejosSeguridad = [
  {
    title:"Consejos para su seguridad",
    subItems: [
      {title:"Antes de salir, ajustar asiento del conductor, así como espejos retrovisores, para lograr la posición idónea de manejo."},
      {title:"Utilizar el cinturón de seguridad, todos los ocupantes del vehículo."},
      {title:"Menores de 10 años ubicados en asientos traseros con el cinturón de seguridad colocado."},
      {title:"Niños mayores de 1 año y hasta que su peso y altura lo permitan en sillas adaptables. Siempre en el asiento trasero del vehículo."},
      {title:"Menores de 1 año ubicados en dispositivos adaptables, en asiento trasero y en sentido contrario a la circulación del vehículo."},
      {title:"NO usar el teléfono celular."},
      {title:"Anunciar maniobras con las luces de giro."},
      {title:"Mantener la derecha."},
      {title:"Observar y respetar las señales viales."},
      {title:"No conducir si se ha ingerido alcohol, una copa o una cerveza, es la cantidad suficiente para alterar la capacidad de reacción, deficiencias en la percepción y una falsa sensación de seguridad. Recordamos que Tucumán esta adherida a la ley nº 6.082 de tolerancia 'cero'."},
      {title:"Respetar los límites de velocidad. La velocidad excesiva y la combinación de esta con el consumo de alcohol, está presente en la mayoría de los accidentes con lesionados y muertos, aun con el cinturón de seguridad bien colocado, por lo que es importante moderar nuestra velocidad."},
      {title:"Reducir la velocidad paulatinamente ante reducción de visibilidad por niebla o humo."},
      {title:"Utilizar luces de emergencia del vehículo (balizas) sólo para detenerse ó durante la detención al margen de la ruta. No detenerse bruscamente sobre la ruta o banquina."},
      {title:"Los distractores al conducir son otra causa de accidentes, ya que si se circula a una velocidad de 80 km/hr. Y se distrae 2 segundos, se circula sin poner atención al frente por 44.4 metros, distancia en la cual puede ocurrir cualquier imprevisto."},
    ]
  }
]

export const Ayuda = () => {
  return (
    <div className="min-h-screen fade-in mx-auto mb-7 space-y-2 md:space-y-6 text-gray-900 dark:text-white">
      <BannerPage title="Ayuda" image="/images2/carBanner.webp" />
      {/* <PageUnderConstruction /> */}
      <ListRender items={consejosSeguridad} counterItem={false}/>
    </div>
  )
}

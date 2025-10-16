import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Fone de Ouvido Premium",
    description: "Fone wireless com cancelamento de ruído ativo e bateria de longa duração",
    price: 599.99,
    image: product1,
  },
  {
    id: 2,
    name: "Smartwatch Ultra",
    description: "Relógio inteligente com monitoramento de saúde e GPS integrado",
    price: 899.99,
    image: product2,
  },
  {
    id: 3,
    name: "Mochila Executiva",
    description: "Mochila de couro premium com compartimento para laptop e organização inteligente",
    price: 349.99,
    image: product3,
  },
  {
    id: 4,
    name: "Speaker Bluetooth",
    description: "Caixa de som portátil com som 360° e resistência à água",
    price: 449.99,
    image: product4,
  },
  {
    id: 5,
    name: "Tênis Esportivo Pro",
    description: "Tênis de corrida com tecnologia de amortecimento avançado e design respirável",
    price: 499.99,
    image: product5,
  },
  {
    id: 6,
    name: "Óculos de Sol Designer",
    description: "Óculos de sol com lentes polarizadas e proteção UV400",
    price: 279.99,
    image: product6,
  },
];
